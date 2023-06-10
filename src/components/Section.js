export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._initialCards = items;
        this.renderer = renderer;
        this._containerSelector = document.querySelector(containerSelector);
    }

    // перебирает массив данных _initialCards. Вызывает для каждого элемента 
    // массива метод addItem.
    renderItems() {
        this._initialCards.forEach(element => {
            this.renderer(element);
        });
    }

    // Метод принимает element и вставляет его в контейнер.
    addItem(cardElement) {
        this._containerSelector.append(cardElement);
    }

    addNewItem(cardElement) {
        this._containerSelector.prepend(cardElement);
    }

}