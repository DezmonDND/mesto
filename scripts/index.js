const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-btn');
let popupContent = document.querySelector('.popup__content');
let inputName = popupContent.querySelector('#popupName');
let inputDescription = popupContent.querySelector('#popupDescription');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function openPopup() {
    popup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup();
}

popupContent.addEventListener('submit', handleFormSubmit);

const addNewItemBtn = document.querySelector('.profile__add-button');
const saveNewItemBtn = document.querySelector('.new-item-form__save-btn');
const closeNewItemBtn = document.querySelector('.new-item-form__close-btn');
const newItemForm = document.querySelector('.new-item-form');

function addNewItem() {
    newItemForm.classList.add('new-item-form_opened');
}

addNewItemBtn.addEventListener('click', addNewItem);

function closeNewItem() {
    newItemForm.classList.remove('new-item-form_opened');
}

closeNewItemBtn.addEventListener('click', closeNewItem);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const cardsTemplate = document.getElementById('cards-template');
const elementsContainer = document.querySelector('.elements');
let likeBtnImage = cardsTemplate.querySelector('.element__like');
let newItemContent = document.querySelector('.new-item-form__content');

const createCardElement = (initialCards) => {
    const cardElement = cardsTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementTitle = cardElement.querySelector('.element__title');
    elementImage.src = initialCards.link;
    elementTitle.textContent = initialCards.name;
    return cardElement;
};

initialCards.forEach((cardElement) => {  
    const newCard = createCardElement(cardElement);
    elementsContainer.append(newCard); 
    
});

// likeBtnImage.addEventListener('click', function(evt) {
//     evt.target.classList.toggle('element__like_active');
// })


// function likeBtn() {
//     likeBtnImage.target.classList.toggle('element__like_active');
// }

// likeBtnImage.addEventListener('click', likeBtn);
// function createNewPhoto(newTitle, newLink) {
//     const newTitle = document.getElementById('newItemName');
//     const newLink = document.getElementById('newItemLink');
    
//     initialCards.name = newTitle.textContent;
//     initialCards.link = newLink.value;
//     return NewPhoto;
// }

// initialCards.unshift(NewPhoto);



function createFormSubmit(evt) {
    evt.preventDefault();
    elementTitle.textContent = newItemName.value;
    elementImage.src = newItemLink.value;
    closeNewItem();
}

newItemContent.addEventListener('submit', createFormSubmit);



