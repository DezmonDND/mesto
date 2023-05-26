import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { config } from './config.js';

const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupContent = document.querySelector('.popup__content');
const newCardForm = document.querySelector('.popup-edit-card');
const profileForm = document.forms['profileForm'];
const placeForm = document.forms['placeForm'];

const editBtn = document.querySelector('.profile__edit-button');
const addNewCardBtn = document.querySelector('.profile__add-button');

const inputName = popupContent.querySelector('#popupName');
const inputDescription = popupContent.querySelector('#popupDescription');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const newCardName = document.getElementById('newItemName');
const newCardLink = document.getElementById('newItemLink');

const cardsTemplate = document.getElementById('cards-template');
const elementsContainer = document.querySelector('.elements');

const imagePopup = document.querySelector('.popup-image');
const imagePopupPicture = imagePopup.querySelector('.popup__picture');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');

// Попапы
function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    document.addEventListener('keydown', hidePopupByEsc)
}

// Функция открывает попап с картинкой для импорта в класс Card
function handleOpenPopup(name, link) {
    imagePopupPicture.src = link;
    imagePopupDescription.textContent = name;
    imagePopupPicture.alt = name;
    openPopup(imagePopup);
}

function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened')
    document.removeEventListener('keydown', hidePopupByEsc)
};

// Закрытие модального окна по клику на оверлей и нажатию на Esc
function hidePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

popups.forEach((element) => {
    element.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(element);
        }
        if (evt.target.classList.contains('popup__close-btn')) {
            closePopup(element);
        }
    })
})

// Функция заполняет ипуты из разметки
const editProfileInputs = function () {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

// и отрывает окно редактирования профиля
editBtn.addEventListener('click', editProfileInputs);

// Функция закрывает окно редактирования профиля
function editProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
}

// И сохраняет данные после нажатия на кнопку
popupContent.addEventListener('submit', editProfileFormSubmit);

// Открытие попапа для добавление карточки
addNewCardBtn.addEventListener('click', () => openPopup(newCardForm));

// Функция создает карточку с помощью метода Card
function createCard(obj) {
    const card = new Card(obj, cardsTemplate, handleOpenPopup);
    return card.generateCard();
}

// Функция добавляет новую карты в разметку
function createCardFormSubmit(evt) {
    evt.preventDefault();
    const imgName = newCardName.value;
    const imgLink = newCardLink.value;
    const cardElement = createCard({ name: imgName, link: imgLink });
    elementsContainer.prepend(cardElement);
    placeForm.reset();
    closePopup(newCardForm);
}

// после нажатия на кнопку создать
newCardForm.addEventListener('submit', createCardFormSubmit);

// Создание карточек из первоначального массива
initialCards.forEach((element) => {
    const cardElement = createCard(element);
    elementsContainer.append(cardElement);
});

// Создание экземпляра класса с формой для валидации
// document.querySelectorAll('.popup__content').forEach((form) => {
//     const formValidator = new FormValidator(config, form);
//     formValidator.enableValidation();
// });

const profileValidation = new FormValidator(config, profileForm);
const placeValidation = new FormValidator(config, placeForm);

profileValidation.enableValidation();
placeValidation.enableValidation();

