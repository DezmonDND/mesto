import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__content');
        this._popupSaveBtn = this._form.querySelector('.popup__save-btn');
        this._defaultText = this._popupSaveBtn.textContent;
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._form.reset();
    }

    // Индикатор загрузки
    renderLoading(isLoading) {
        if (isLoading) {
            this._popupSaveBtn.textContent = 'Сохранение...'
        } else {
            this._popupSaveBtn.textContent = this._defaultText;
        }
    }
}