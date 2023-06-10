class Card {
    constructor({data, templateSelector, handleCardClick}) {
        this._data = data,
        this._name = data.name,
        this._link = data.link;
        this._templateSelector = templateSelector,
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    generateCard = () => {
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

    _removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    _like = () => {
        this._likeBtnImage.classList.toggle('element__like_active');
    }

    _setEventListeners = () => {
        this._popupPicture.addEventListener('click', () => {
            this._handleCardClick(this._data);
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