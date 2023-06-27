import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = this._popup.querySelector('.popup__picture');
        this._popupDescription = this._popup.querySelector('.popup__image-description');
    }

    open = (data) => {
        this._popupPicture.src = data.link;
        this._popupPicture.alt = data.name;
        this._popupDescription.textContent = data.name;      
        super.open();
    }
}