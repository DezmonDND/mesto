const popups = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const imagePopup = document.querySelector('.popup-image');
const popupContent = document.querySelector('.popup__content');
const newCardForm = document.querySelector('.popup-edit-card');
const newCardFormContent = document.querySelector('.popup-edit-card__content');

const editBtn = document.querySelector('.profile__edit-button');
const closeButtons = document.querySelectorAll('.popup__close-btn');
const addNewCardBtn = document.querySelector('.profile__add-button');

const inputName = popupContent.querySelector('#popupName');
const inputDescription = popupContent.querySelector('#popupDescription');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const newCardName = document.getElementById('newItemName');
const newCardLink = document.getElementById('newItemLink');
const popupPicture = document.querySelector('.popup__picture');

const cardsTemplate = document.getElementById('cards-template');
const elementsContainer = document.querySelector('.elements');

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

// Popups
function openPopup(modalWindow) {
    modalWindow.classList.add('popup_opened');
}

function closePopup(modalWindow) {
    modalWindow.classList.remove('popup_opened');
};

function hideClosestPopup(evt) {
    closePopup(evt.target.closest('.popup'));
};

const editProfileInputs = function () {
    inputName.value = profileName.textContent;
    inputDescription.value = profileDescription.textContent;
    openPopup(popupEditProfile);
};

// Buttons
editBtn.addEventListener('click', editProfileInputs);

closeButtons.forEach((element) => {
    element.addEventListener('click', hideClosestPopup);
});

addNewCardBtn.addEventListener('click', () => openPopup(newCardForm));

// Create Cards
const createCardElement = (imgName, imgLink) => {
    const cardElement = cardsTemplate.content.querySelector('.element').cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementTitle = cardElement.querySelector('.element__title');
    const likeBtnImage = cardElement.querySelector('.element__like');
    const trashBtn = cardElement.querySelector('.element__trash-btn');

    elementImage.src = imgLink;
    elementTitle.textContent = imgName;
    elementImage.alt = imgName;
    likeBtnImage.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    const imagePopupPicture = imagePopup.querySelector('.popup__picture');
    const imagePopupDescription = imagePopup.querySelector('.popup__image-description');

    elementImage.addEventListener('click', function () {
        openPopup(imagePopup);
        imagePopupDescription.textContent = elementTitle.textContent;
        imagePopupPicture.src = elementImage.src;
        imagePopupPicture.alt = elementTitle.textContent;
    });

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

// Save Forms

function editProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    closePopup(popupEditProfile);
}

popupContent.addEventListener('submit', editProfileFormSubmit);

function createCardFormSubmit(evt) {
    evt.preventDefault();
    imgName = newCardName.value;
    imgLink = newCardLink.value;
    elementsContainer.prepend(createCardElement(imgName, imgLink));
    newCardFormContent.reset();
    closePopup(newCardForm);
}

newCardForm.addEventListener('submit', createCardFormSubmit);



