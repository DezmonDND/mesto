const imagePopup = document.querySelector('.popup-image');
const imagePopupPicture = imagePopup.querySelector('.popup__picture');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const closeButton = imagePopup.querySelector('.popup__close-btn');

class Card {
    constructor(name, link, templateSelector) {
        this._name = name,
        this._link = link,
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('#cards-template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;
        this._popupPicture = this._element.querySelector('.element__image');
        this._likeBtnImage = this._element.querySelector('.element__like');
        this._trashBtn = this._element.querySelector('.element__trash-btn');
        this._popupPicture.alt = this._name;
        this._setEventListeners();

        return this._element;
    }

    _openPopup() {
        imagePopupPicture.src = this._link;
        imagePopupDescription.textContent = this._name;
        imagePopup.classList.add('popup_opened');
    }

    _closePopup() {
        imagePopup.classList.remove('popup_opened');
    }

    _removeCard() {
        this._element.remove();
    }

    _like() {
        this._likeBtnImage.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._popupPicture.addEventListener('click', () => {
            this._openPopup();
        });
        closeButton.addEventListener('click', () => {
            this._closePopup();
        });
        this._trashBtn.addEventListener('click', () => {
            this._removeCard();
        });
        this._likeBtnImage.addEventListener('click', () => {
            this._like();
        });
    }
}

// initialCards.forEach(element => {
//     const newCard = new Card(element.name, element.link);
//     const cardElement = newCard.generateCard();
//     document.querySelector('.elements').append(cardElement);
// });

export {imagePopup, imagePopupPicture, imagePopupDescription, closeButton};
export {Card};