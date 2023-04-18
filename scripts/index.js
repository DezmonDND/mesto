const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-btn');
const popupContent = document.querySelector('.popup__content');
const inputName = popupContent.querySelector('#popupName');
const inputDescription = popupContent.querySelector('#popupDescription');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

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

const newItemContent = document.querySelector('.new-item-form__content');

const createCardElement = (imgName, imgLink) => {
    const cardElement = cardsTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementTitle = cardElement.querySelector('.element__title');
    const likeBtnImage = cardElement.querySelector('.element__like');
    const trashBtn = cardElement.querySelector('.element__trash-btn');

    elementImage.src = imgLink;
    elementTitle.textContent = imgName;
    likeBtnImage.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    const imagePopup = document.querySelector('.increase-image-form');
    const imageCloseBtn = imagePopup.querySelector('.increase-image-form__close-btn');
    const imagePopupPicture = imagePopup.querySelector('.increase-image-form__picture');
    const imagePopupDescription = imagePopup.querySelector('.increase-image-form__description');

    function openImagePopup() {
        imagePopup.classList.add('increase-image-form_opened');
        imagePopupDescription.textContent = elementTitle.textContent;
        imagePopupPicture.src = elementImage.src;
    }

    elementImage.addEventListener('click', openImagePopup);

    function closeImagePopup() {
        imagePopup.classList.remove('increase-image-form_opened');
    }

    imageCloseBtn.addEventListener('click', closeImagePopup)

    function removeCard() {
        cardElement.remove();
    }

    trashBtn.addEventListener('click', removeCard);

    return cardElement;
};

initialCards.forEach((item) => {
    const newCard = createCardElement(item.name, item.link);
    elementsContainer.append(newCard);
});

const newItemName = document.getElementById('newItemName');
const newItemLink = document.getElementById('newItemLink');

function createFormSubmit(evt) {
    evt.preventDefault();
    imgName = newItemName.value;
    imgLink = newItemLink.value;
    elementsContainer.prepend(createCardElement(imgName, imgLink));
    closeNewItem();
}

newItemContent.addEventListener('submit', createFormSubmit);



