import {
    profileEditBtn,
    addNewCardBtn,
    inputName,
    inputDescription,
    newCardName,
    newCardLink,
    profileFormVal,
    placeForm
} from '../scripts/constants.js';

import { initialCards } from '../scripts/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from '../scripts/config.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Создание карточек из массива InitialCards

const popupWithImage = new PopupWithImage('.popup-image');

const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const card = new Card({
            data,
            handleCardClick: (card) => {
                popupWithImage.open(card)
            }
        });
        const newCard = card.generateCard();
        cardList.addItem(newCard);
    }
},
    '.elements'
);

cardList.renderItems();

// Форма редактирования профиля и добавления инфо из инпутов
const userInfo = new UserInfo('.profile__name', '.profile__description');

const profileForm = new PopupWithForm({
    popupSelector: '.popup-edit-profile',
    handleFormSubmit: (profileData) => {
        profileData.name = inputName.value;
        profileData.info = inputDescription.value;
        userInfo.setUserInfo(profileData);
        profileForm.close()
    }
});

// Функция создания карточки
const createCard = (data) => {
    const card = new Card({
        data,
        handleCardClick: (card) => {
            popupWithImage.open(card)
        }
    });
    return card.generateCard();
};

// Добавление карточки из формы в разметку
const newCardForm = new PopupWithForm({
    popupSelector: '.popup-edit-card',
    handleFormSubmit: () => {
        const cardData = {
            name: newCardName.value,
            link: newCardLink.value
        }
        const cardElement = createCard(cardData);
        cardList.addNewItem(cardElement);
        newCardForm.close();
    }
})

// Кнонпки

// Добавить новую карточку
addNewCardBtn.addEventListener('click', () => {
    newCardForm.open();
});

// Редактировать профиль
profileEditBtn.addEventListener('click', () => {
    const getUserInfo = userInfo.getUserInfo();
    inputName.value = getUserInfo.name;
    inputDescription.value = getUserInfo.info;
    profileForm.open()
});

// Добавление слушателей
popupWithImage.setEventListeners();
newCardForm.setEventListeners();
profileForm.setEventListeners();

// Добавление валидации форм
// Создание форм
const profileValidation = new FormValidator(config, profileFormVal);
const placeValidation = new FormValidator(config, placeForm);

// Включение валидации
profileValidation.enableValidation();
placeValidation.enableValidation();

