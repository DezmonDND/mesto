export class Card {
    constructor(data, templateSelector, openPopupImage, openPopupDelete, changeLike) {
        // Данные (название и ссылка)
        this._data = data,
        this._name = data.name,
        this._link = data.link;

        // Коллбэки для index.js
        this._templateSelector = templateSelector,
        this._openPopupImage = openPopupImage;
        this._openPopupDelete = openPopupDelete;
        this._changeLike = changeLike;

        // Данные для присвоения и сравнивания id
        this._cardId = data._id;
        this._ownerId = data.owner._id;
        this._myId = data.myId;

        // Количество лайков у объекта
        this._likes = data.likes;

        // Текущий элемент карточки
        this._element = this._getTemplate();
        this._popupPicture = this._element.querySelector('.element__image');
        this._popupTitle = this._element.querySelector('.element__title');
        this._likeBtnImage = this._element.querySelector('.element__like');
        this._trashBtn = this._element.querySelector('.element__trash-btn');
        this._likeCounter = this._element.querySelector('.element__counter');
    }

    // Скрыть корзину, если id чужой
    _changeDeleteCardButton() {
        if (this._ownerId !== this._myId) {
            this._trashBtn.style.display = 'none';
        }
    }

    // Получить пустой шаблон карточки
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    // Открыть попап удаления. 
    // При клике по корзине сработает _handleDelete и откроет попап удаления _openPopupDelete
    // deleteCardPopup.open - открыть попап методом open из PopupWithSubmit

    _handleDelete = () => {
        this._openPopupDelete({ element: this, cardId: this._cardId });
    };

    // Проверить в объекте, есть ли лайк с моим id и вернуть true или false
    // isLiked(data) {
    //     console.log(data);
    //     return data.likes.some((like) => like._id === this._myId);
    // }

    // Если есть, закрасить сердце и присвоить счетчику новое значение
    // handleLikeButton(data) {
    //     if (this.isLiked(data)) {
    //         console.log(this.isLiked(data));
    //         this._likeBtnImage.classList.add('element__like_active');
    //         this._likeCounter.textContent = data.likes.length;
    //     } else {
    //         console.log(this.isLiked(data));
    //         this._likeBtnImage.classList.remove('element__like_active');
    //         this._likeCounter.textContent = data.likes.length;
    //     }
    // }

    // Проверить в объекте, есть ли лайк с моим id. Если есть, закрасить сердце.
    _isLiked() {
        this._likes.forEach((element) => {
            console.log(element);
            if (element._id === this._myId) {
                this._likeBtnImage.classList.add('element__like_active');
            }
        });
    }

    // Изменить количество лайков при изменении цвета сердца
    setLikes(likes) {
        this._likeBtnImage.classList.toggle('element__like_active');
        this._likeCounter.textContent = likes.length;
    }
    // Метод вызовет функцию changeLike в  index.js в const createCard при создании карточки.
    // changeLike будет принимать кнопку и id карточки.
    _handleLikeClick = () => {
        this._changeLike(this._likeBtnImage, this._cardId);
    };

    // Удалить карточку в открывшемся попапе //
    removeCard = () => {
        this._element.remove();
        this._element = null;
    }

    // Присвоение карточке данных и создание элемента
    generateCard() {
        this._popupTitle.textContent = this._name;
        this._popupPicture.alt = this._name;
        this._popupPicture.src = this._link;
        this._likeCounter.textContent = this._likes.length;
        // this.handleLikeButton(this._data);
        this._isLiked();
        this._changeDeleteCardButton();
        this._setEventListeners();
        return this._element;
    }

    _handleOpenPopupImage = () => {
        this._openPopupImage(this._data);
    };

    _setEventListeners() {
        this._popupPicture.addEventListener('click', this._handleOpenPopupImage)
        this._trashBtn.addEventListener('click', this._handleDelete);
        // this._likeBtnImage.addEventListener('click', () => {
        //     this._changeLike();
        // });
        this._likeBtnImage.addEventListener("click", this._handleLikeClick);
    }
}