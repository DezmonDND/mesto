const config = {
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-btn',
    inactiveButtonClass: 'button__inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

// Поиск формы
// const formElement = Array.from(document.querySelectorAll(config.formSelector));

// Показывать ошибку (принимает форму, инпут и сообщение)
const showError = (formElement, inputElement, errorMessage) => {
    // Ищем span элемент ошибки в HTML
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideError = (formElement, inputElement) => {
    // Ищем span элемент ошибки в HTML  
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`)

    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

// Функция валидации, принимает нужную форму и элемент формы
const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        // Получает форму, поле и ошибку
        showError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideError(formElement, inputElement)
    }
}

// Создание функции на проверку всех полей (Принимает массив полей InputList)
const hasInvalidInput = (inputList) => {

    // Метод .some возращает первое значение, подходящее под правило
    return inputList.some((inputElement) => {
        // Возврат невалидного элемента
        return !inputElement.validity.valid;
    })
}

// Переключение кнопки, если фнукция hasInvalidInput возвращает true
// значит блочим кнопку

// toggleButtonState принимает массив полей и кнопку
const toggleButtonState = (inputList, buttonElement) => {
    // Если возвращает true, деактивируем кнопку
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass)
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    //Поиск кнопки в текущей форме
    const buttonElement = formElement.querySelector(config.submitButtonSelector)
    //Блокировка кнопки не дожидаясь ввода данных
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)

            // Вызов кнопки при изменении состояния полей
            toggleButtonState(inputList, buttonElement)
        })
    })
}

// Фунция перебирает все формы и добавляет обработчик каждой
const enableValidation = (config) => {
    // Массив форм
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    // Добавить обработчки каждому элементы массива
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement)
    })
}

enableValidation(config);



