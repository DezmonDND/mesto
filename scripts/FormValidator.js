class FormValidator {
    // Принимает объект с селекторами и форму, которую нужно валидировать
    constructor(config, form) {
        this._inputSelector = config.inputSelector,
        this._submitButtonSelector = config.submitButtonSelector,
        this._inactiveButtonClass = config.inactiveButtonClass,
        this._inputErrorClass = config.inputErrorClass,
        this._errorClass = config.errorClass,
        this._form = form;
    }
    // Переключение кнопки, если фнукция hasInvalidInput возвращает true
    // значит блочим кнопку
    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._inactiveButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._inactiveButtonClass)
            this._buttonElement.disabled = false;
        }
    }
    // Функция показывает ошибку (принимает инпут и сообщение)
    _showError(inputElement, errorMessage) {
        // Ищем span элемент ошибки в HTML
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`)

        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }

    _hideError(inputElement) {
        // Ищем span элемент ошибки в HTML
        const errorElement = this._form.querySelector(`.${inputElement.id}-error`)

        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }
    // Функция проверяет инпут на валидность и вызывает функцию
    // показа или скрытия ошибки
    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement)
        }
    }
    // Создание функции, которая ищет в списке всех полей формы хотя бы 
    // один невалидный input (Принимает массив полей InputList)
    _hasInvalidInput() {
        // Метод .some возращает первое значение, подходящее под правило
        return this._inputList.some((inputElement) => {
            // Возврат невалидного элемента
            return !inputElement.validity.valid;
        })
    }
    // Функция добавляет слушатели всям полям формы 
    _setEventListeners() {
        //Блокировка кнопки не дожидаясь ввода данных
        this._toggleButtonState();
        // на событие "input", при этом происходит проверка валидности
        // в каждом из полей
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement)
                // Вызов кнопки при изменении состояния полей
                this._toggleButtonState();
            })
        })
    }
    // Запуск валидации. Для этого накладываем ранее написанные слушатели
    // каждому элементу формы
    enableValidation() {
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        //Поиск кнопки в текущей форме
        this._buttonElement = this._form.querySelector(this._submitButtonSelector)
        this._setEventListeners();
    }
}

export {FormValidator};