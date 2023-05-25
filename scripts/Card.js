class Card {
    constructor(data, templateSelector, handleOpenPopup, openPopup) {
        this._name = data.name,
        this._link = data.link,
        this._templateSelector = templateSelector,
        this._handleOpenPopup = handleOpenPopup,
        this._openPopup = openPopup;
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
        this._popupTitle = this._element.querySelector('.element__title');
        this._popupPicture = this._element.querySelector('.element__image');
        this._likeBtnImage = this._element.querySelector('.element__like');
        this._trashBtn = this._element.querySelector('.element__trash-btn');
        this._popupTitle.textContent = this._name;
        this._popupPicture.alt = this._name;
        this._popupPicture.src = this._link;
        this._setEventListeners();

        return this._element;
    }

    _removeCard() {
        this._element.remove();
        this._element = null;
    }

    _like() {
        this._likeBtnImage.classList.toggle('element__like_active');
    }

    _setEventListeners() {
        this._popupPicture.addEventListener('click', () => {
            this._handleOpenPopup(); 
        });
        this._trashBtn.addEventListener('click', () => {
            this._removeCard();
        });
        this._likeBtnImage.addEventListener('click', () => {
            this._like();
        });
    }
}

export { Card };