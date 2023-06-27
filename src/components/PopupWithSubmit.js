import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector(".popup__content");
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
            // Чтобы удалить карточку через api,
            // функция сабмита получает объект с двумя свойствами - карточка и её id
            this._submitFunction({ element: this._element, cardId: this._cardId });
        });
    }

    // При открытии попапа будет создан element с полученным id карточки
    open = ({ element, cardId }) => {
        super.open();
        this._element = element; // Карточка
        this._cardId = cardId; // Её id
    };
}