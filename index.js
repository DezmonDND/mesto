const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-btn');
const saveBtn = document.querySelector('.popup__save-btn');
let popupContent = document.querySelector('.popup__content');
let inputName = popupContent.querySelector('.popup__name');
let inputDescription = popupContent.querySelector('.popup__description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup__opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function closePopup() {
    popup.classList.remove('popup__opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    saveBtn.addEventListener('click', closePopup);
}

popupContent.addEventListener('submit', handleFormSubmit);



