const imagePopup = document.querySelector('.popup-image');
const imagePopupPicture = imagePopup.querySelector('.popup__picture');
const imagePopupDescription = imagePopup.querySelector('.popup__image-description');
const closeButton = imagePopup.querySelector('.popup__close-btn');

class Card {
    constructor(name, link, templateSelector) {
        this.name = name,
        this.link = link,
        this.templateSelector = templateSelector;
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
        this.element = this._getTemplate();
        this.element.querySelector('.element__image').src = this.link;
        this.element.querySelector('.element__title').textContent = this.name;
        this.popupPicture = this.element.querySelector('.element__image');
        this.likeBtnImage = this.element.querySelector('.element__like');
        this.trashBtn = this.element.querySelector('.element__trash-btn');
        this.popupPicture.alt = this.name;
        this._setEventListeners();

        return this.element;
    }

    _openPopup() {
        imagePopupPicture.src = this.link;
        imagePopupDescription.textContent = this.name;
        imagePopup.classList.add('popup_opened');
    }

    _closePopup() {
        imagePopup.classList.remove('popup_opened');
    }

    _removeCard() {
        this.element.remove();
    }

    _like() {
        this.likeBtnImage.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this.popupPicture.addEventListener('click', () => {
            this._openPopup();
        });
        closeButton.addEventListener('click', () => {
            this._closePopup();
        });
        this.trashBtn.addEventListener('click', () => {
            this._removeCard();
        });
        this.likeBtnImage.addEventListener('click', () => {
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