import axios from 'axios';
import {API_URL} from "./apiConstants";

const AUTH_URL = `${API_URL}/login`;
const REGISTRATION_URL = `${API_URL}/signup`;

const USER_NAME_SESSION_ATTRIBUTE_TOKEN = 'token';
const USER_NAME_SESSION_ATTRIBUTE_ADMIN_MARKER = 'isAdmin';
const USER_NAME_SESSION_ATTRIBUTE_NAME = 'userName';

class AuthService {

    executeBasicAuthenticationService(login, password) {
        return axios.post(AUTH_URL, {
            login, password
        })
            .then(response => {
                return response.data;
            })
            .then(data => {
                this.authWithLoginAndPassword(data)
            })
            .catch(error => {
                throw new Error(error.response.data.error);
            });
    }

    executeBasicRegistryService(login, password, name, surname) {
        return axios.post(REGISTRATION_URL, {
            login, password, name, surname
        })
            .then(response => {
                return response.data
            })
            .then(data => {
                this.authWithLoginAndPassword(data)
            })
            .catch(error => {
                throw new Error(error.response.data.error);
            });

    }

    authWithLoginAndPassword(data) {
        this.clearLocalStorage();
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN, data.token);
        if (+data.is_user === 0) //if is_user === 0 then user is admin
            localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_ADMIN_MARKER, '.');
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, data.name);
    }

    logout() {
        this.clearLocalStorage();
    }

    isAuthorized = () => {
        const user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    };

    isAdmin = () => {
        const isAdmin = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ADMIN_MARKER);
        return isAdmin && isAdmin !== '';
    };

    getToken = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);

    // TODO: deal with getusername
    getUserName = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    clearLocalStorage = () => {
        localStorage.clear();
    };
}

export default new AuthService();
