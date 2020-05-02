import axios from 'axios';
import {
    EDIT_PROFILE_URL,
    PROFILE_URL,
    USER_NAME_SESSION_ATTRIBUTE_LOGIN,
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_PROFILE,
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
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_LOGIN, data.username);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_PROFILE, data.username);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, data.name);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_SURNAME, data.surname);
    }

    executeEditProfileService(data) {
        return axios.post(EDIT_PROFILE_URL, data).then(response => {
            return response.data
        })
            .then(data => console.log("editData", data))
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
}

export default new ProfileService();
