export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._handleClickClose = this._handleClickClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleClickClose(evt) {
        if ((evt.target.classList.contains('popup_opened')) || (evt.target.classList.contains('popup__close-btn'))) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.addEventListener('click', this._handleClickClose);
    }
}
