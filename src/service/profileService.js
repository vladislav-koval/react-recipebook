import axios from 'axios';
import {
    EDIT_PROFILE_URL,
    PATH_TO_AVATAR_URL,
    PROFILE_URL,
    USER_NAME_SESSION_ATTRIBUTE_AVATAR,
    USER_NAME_SESSION_ATTRIBUTE_LOGIN,
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PROFILE,
    USER_NAME_SESSION_ATTRIBUTE_RATING,
    USER_NAME_SESSION_ATTRIBUTE_SURNAME,
    USER_NAME_SESSION_ATTRIBUTE_TOKEN
} from "./apiConstants";

class ProfileService {

    setProfileDataFromServer() {
        return axios.post(PROFILE_URL, {
            token: localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN)
        })
            .then(response => this.setProfileDataToLocalStorage(response.data))
            .catch(error => console.log(error));
    }

    setProfileDataToLocalStorage(data) {
        console.log("DAATA", data);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_LOGIN, data.username);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_PROFILE, data.username);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, data.name);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_SURNAME, data.surname);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_AVATAR, data.file_name);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_RATING, data.rating);
    }

    executeEditProfileService(data) {
        return axios.post(EDIT_PROFILE_URL, data).then(response => {
            return response.data
        })
            .then(data => {
                this.setProfileDataToLocalStorage(data);
                // eslint-disable-next-line no-restricted-globals
                location.reload();
            })
            .catch(error => {
                throw new Error(error.response.data.error)
            });
    }

    profileIsExists = () => {
        const profile = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PROFILE);
        return profile != null;
    };

    getUserLogin = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_LOGIN);
    getUserName = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    getUserSurname = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_SURNAME);
    getUserAvatar = () => {
        return `${PATH_TO_AVATAR_URL}/${localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_AVATAR)}`;
    };
    getUserRating = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_RATING);
}

export default new ProfileService();
