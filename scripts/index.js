// import { imagePopup, imagePopupPicture, imagePopupDescription, closeButton } from './Card.js';
import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

const config = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'button__inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

const popups = document.querySelectorAll('.popup');
const popupList = Array.from(popups);
const popupEditProfile = document.querySelector('.popup-edit-profile');
// const imagePopup = document.querySelector('.popup-image');
const popupContent = document.querySelector('.popup__content');
const newCardForm = document.querySelector('.popup-edit-card');
const newCardFormContent = document.querySelector('.popup-edit-card__content');

const editBtn = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const addNewCardBtn = document.querySelector('.profile__add-button');

const inputName = popupContent.querySelector('#popupName');
const inputDescription = popupContent.querySelector('#popupDescription');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const newCardName = document.getElementById('newItemName');
const newCardLink = document.getElementById('newItemLink');
// const popupPicture = document.querySelector('.popup__picture');

const cardsTemplate = document.getElementById('cards-template');
const elementsContainer = document.querySelector('.elements');

// Popups
function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
    modalWindow.addEventListener('click', closePopupByClick)
    document.addEventListener('keydown', hidePopupByEsc)
}

function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened')
    document.removeEventListener('keydown', hidePopupByEsc)
};

function hideClosestPopup(evt) {
    closePopup(evt.target.closest('.popup'));
};

const editProfileInputs = function () {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

// Закрытие модального окна по клику на оверлей и нажатию на Esc
function hidePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        popups.forEach((element) => {
            closePopup(element)
        })
    }
}

// Закрытие модального окна по нажатию Esc 
function closePopupByClick(evt) {
    if (evt.currentTarget === evt.target) {
        popupList.forEach((element) => {
            closePopup(element)
        })
    }
}

// Buttons
editBtn.addEventListener('click', editProfileInputs);

closeButtons.forEach((element) => {
    element.addEventListener('click', hideClosestPopup);
});

addNewCardBtn.addEventListener('click', () => openPopup(newCardForm));

// Save Forms
function editProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
}

popupContent.addEventListener('submit', editProfileFormSubmit);

function createCardElement(Object) {
    const newCard = new Card(Object, cardsTemplate)
    return newCard.generateCard();
} 

function createCardFormSubmit(evt) {
    // const inputList = Array.from(document.querySelectorAll(config.inputSelector));
    // const buttonElement = document.querySelector('.popup__create-card-btn');
    const imgName = newCardName.value;
    const imgLink = newCardLink.value;

    evt.preventDefault();
    elementsContainer.prepend(createCardElement(imgName, imgLink));
    newCardFormContent.reset();
    // toggleButtonState(inputList, buttonElement);
    closePopup(newCardForm);
}

newCardForm.addEventListener('submit', createCardFormSubmit);

// Создание карточки по нажатию Enter
function keyHandler(evt) {
    if (evt.key === 'Enter' && isValid === true) {
        imgName = newCardName.value;
        imgLink = newCardLink.value;
        elementsContainer.prepend(createCardElement(imgName, imgLink));
        closePopup(newCardForm);
    }
}

// Создание карточки с помощью метода Card и добавлеие ее в разметку
initialCards.forEach(element => {
    const newCard = new Card(element.name, element.link);
    const cardElement = newCard.generateCard();
    document.querySelector('.elements').append(cardElement);
});

// Создание экземпляра класса с формой для валидации
document.querySelectorAll('.popup__content').forEach((form) => {
    const formValidator = new FormValidator(config, form);
    formValidator.enableValidation();
})
