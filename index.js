const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close-btn');


function openPopup() {
    popup.classList.add('popup__opened');
}

function closePopup() {
    popup.classList.remove('popup__opened');
}

editBtn.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
