import {
    profileEditBtn,
    addNewCardBtn,
    inputName,
    inputDescription,
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

import '../pages/index.css';

// Создание карточек из массива InitialCards

const popupWithImage = new PopupWithImage('.popup-image');

// Функция создания карточки
const createCard = (data) => {
    const card = new Card({
        data,
        templateSelector: '.cards-template',
        handleCardClick: (card) => {
            popupWithImage.open(card)
        }
    });
    return card.generateCard();
};

// Создание краточек из маccива
const cardList = new Section({
    items: initialCards,
    renderer: (data) => {
        const newCard = createCard(data);
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
        userInfo.setUserInfo(profileData);
        profileForm.close()
    }
});

// Добавление карточки из формы в разметку
const newCardForm = new PopupWithForm({
    popupSelector: '.popup-edit-card',
    handleFormSubmit: (profileData) => {
        console.log(profileData);
        const cardData = {
            name: profileData.profileName,
            link: profileData.profileAbout
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
    const { name, info } = userInfo.getUserInfo();
    inputName.value = name;
    inputDescription.value = info;
    profileForm.open();
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

