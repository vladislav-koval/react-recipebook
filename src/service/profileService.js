import axios from 'axios';
import {API_URL} from "./apiConstants";
const PROFILE_URL = `${API_URL}/profile`;

// TODO: DEAL WITH CONSTANTS

const USER_NAME_SESSION_ATTRIBUTE_TOKEN = 'token';
const USER_NAME_SESSION_ATTRIBUTE_PROFILE = 'profile';
const USER_NAME_SESSION_ATTRIBUTE_LOGIN = 'userLogin';
const USER_NAME_SESSION_ATTRIBUTE_NAME = 'userName';
const USER_NAME_SESSION_ATTRIBUTE_SURNAME = 'userSurname';

class ProfileService {

    setProfileData() {
        axios.post(PROFILE_URL, {
            token: localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN)
        })
            .then(response => this.setProfileDataToLocalStorage(response.data))
            .catch(error => console.log(error));
    }

    setProfileDataToLocalStorage(data) {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_LOGIN, data.username);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, data.name);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_SURNAME, data.surname);
    }

    profileIsExists = () => {
        const profile = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_PROFILE);
        return profile !== null;
    };

    getUserLogin = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_LOGIN);
    getUserName = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    getUserSurname = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_SURNAME);
}

export default new ProfileService();
