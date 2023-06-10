export class UserInfo {
    constructor(profileNameSelector, profileInfoSelector) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileInfo = document.querySelector(profileInfoSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            info: this._profileInfo.textContent
        };
    }

    setUserInfo(profileData) {
        this._profileName.textContent = profileData.profileName;
        this._profileInfo.textContent = profileData.profileAbout;
        console.log(profileData);
    }
}