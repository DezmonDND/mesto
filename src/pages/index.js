import {
    profileEditBtn,
    addNewCardBtn,
    popupAvatarBtn,
    inputName,
    inputDescription,
    profileFormVal,
    placeForm,
    avatarForm,
    cardTemplateSelector,
    profilePopupSelector,
    imagePopupSelector,
    cardPopupSelector,
    deletePopupSelector,
    avatarPopupSelector,
    gridBlockSelector,
    formInfoConfig
} from '../scripts/constants.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { config } from '../scripts/config.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';
import { PopupWithSubmit } from '../components/PopupWithSubmit.js';

import '../pages/index.css';

// Создание карточек из массива InitialCards
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
    headers: {
        authorization: 'c42608e5-1ffc-4e2d-ae34-a3c104aa731f',
        'Content-Type': 'application/json'
    }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialArray]) => {
        console.log(initialArray);
        // Присвоить каждому элеиенту массива ключ myId со значением userData._id
        // Далее в классе Card методом  _changeDeleteCardButton() скрыть или показать мусорку
        initialArray.forEach(initialArray => initialArray.myId = userData._id);
        userInfo.setUserInfo({ profileName: userData.name, profileAbout: userData.about });
        userInfo.setUserAvatar({ avatarLink: userData.avatar })
        userInfo.setId(userData._id);
        section.renderItems(initialArray);
    })
    .catch((err) => console.log(err));

const popupWithImage = new PopupWithImage(imagePopupSelector);

// Попап удаления карточки
const deleteCardPopup = new PopupWithSubmit(
    deletePopupSelector,
    ({ element, cardId }) => {
        api
            .deleteCard(cardId)
            .then(() => {
                element.removeCard();
                deleteCardPopup.close();
            })
            .catch((err) => console.log(err));
    }
);

// Функция создания карточки
const createCard = (data) => {
    const card = new Card(
        data,
        cardTemplateSelector,
        popupWithImage.open,
        deleteCardPopup.open,
        // function changeLike() {
        //     if (this.isLiked(data)) {
        //         console.log(this);
        //         api.deleteLike(data._id)
        //             .then((res) => {
        //                 this.handleLikeButton(res);
        //                 this._data.likes.length = res.likes.length;
        //             })
        //     } else {
        //         api.addLike(data._id)
        //             .then((res) => {
        //                 this.handleLikeButton(res);
        //                 this._data.likes.length = res.likes.length;
        //             })
        //     }
        // }
        function changeLike(likeItem, cardId) {
            if (likeItem.classList.contains('element__like_active')) {
                api.deleteLike(cardId)
                    .then((res) => {
                        console.log(res.likes);
                        card.setLikes(res.likes);
                    })
                    .catch((err) => console.log(err));
            } else {
                api.addLike(cardId)
                    .then((res) => {
                        card.setLikes(res.likes);
                    })
                    .catch((err) => console.log(err));
            }
        }
    )
    return card.generateCard();
};

// Создание карточек из маccива
const section = new Section({
    renderer: (data) => {
        const newCard = createCard(data);
        section.addItem(newCard);
    }
},
    gridBlockSelector
);

// Форма редактирования профиля и добавления инфо из инпутов
const userInfo = new UserInfo(formInfoConfig);

// Попап редактирования профиля
const profileForm = new PopupWithForm(profilePopupSelector, (data) => {
    profileForm.renderLoading(true); // индикатор загрузки
    api.setUserInfo(data)
        .then((res) => {
            userInfo.setUserInfo({ profileName: res.name, profileAbout: res.about });
            profileForm.close()
        })
        .catch((err) => console.log(err)) // вывод ошибки в консоль
        .finally(() => {
            profileForm.renderLoading(false); // индикатор загрузки
        })
});

// Добавление карточки из формы в разметку
const newCardForm = new PopupWithForm(
    cardPopupSelector, (data) => {
        newCardForm.renderLoading(true);
        api.sentNewCard(data)
            .then((dataCard) => {
                dataCard.myId = userInfo.getId();
                const cardElement = createCard(dataCard);
                section.addNewItem(cardElement);
                newCardForm.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                newCardForm.renderLoading(false);
            })
    });

// Попап аватара
const popupAvatar = new PopupWithForm(
    avatarPopupSelector, (data) => {
        popupAvatar.renderLoading(true);
        api.updateAvatar(data)
            .then((res) => {
                userInfo.setUserAvatar({ avatarLink: res.avatar })
                popupAvatar.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
                popupAvatar.renderLoading(false);
            })
    }
)

// Кнопки
// Добавить новую карточку
popupAvatarBtn.addEventListener('click', () => {
    popupAvatar.open();
});
// Редактировать аватар
addNewCardBtn.addEventListener('click', () => {
    newCardForm.open();
});
// Редактировать профиль
profileEditBtn.addEventListener('click', () => {
    const { profileName, profileAbout } = userInfo.getUserInfo();
    inputName.value = profileName;
    inputDescription.value = profileAbout;
    profileForm.open();
});

// Добавление слушателей
popupAvatar.setEventListeners();
deleteCardPopup.setEventListeners();
popupWithImage.setEventListeners();
newCardForm.setEventListeners();
profileForm.setEventListeners();

// Добавление валидации форм
// Создание форм
const profileValidation = new FormValidator(config, profileFormVal);
const placeValidation = new FormValidator(config, placeForm);
const avatarValidation = new FormValidator(config, avatarForm);

// Включение валидации
profileValidation.enableValidation();
placeValidation.enableValidation();
avatarValidation.enableValidation();

