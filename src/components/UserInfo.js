export class UserInfo {
    constructor(config) {
        this._profileName = document.querySelector(config.nameUserInfo);
        this._profileInfo = document.querySelector(config.informationUserInfo);
        this._profileAvatar = document.querySelector(config.avatar);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileAbout: this._profileInfo.textContent,
        };
    }

    setUserInfo({ profileName, profileAbout }) {
        this._profileName.textContent = profileName;
        this._profileInfo.textContent = profileAbout;
    }

    setUserAvatar({avatarLink}) {
        this._profileAvatar.src = avatarLink;
    }

    setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }
}