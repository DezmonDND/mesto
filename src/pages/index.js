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
    handleFormSubmit: () => {
        // profileData.name = inputName.value;
        // profileData.info = inputDescription.value;
        const name = inputName.value;
        const info = inputDescription.value;
        userInfo.setUserInfo({name, info});
        profileForm.close()
    }
});

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
    // const getUserInfo = userInfo.getUserInfo();
    // inputName.value = getUserInfo.name;
    // inputDescription.value = getUserInfo.info;
    profileForm.setInputValues(userInfo.getUserInfo());
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

