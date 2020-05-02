import axios from 'axios';
import {
    AUTH_URL,
    REGISTRATION_URL,
    USER_NAME_SESSION_ATTRIBUTE_ADMIN_MARKER,
    USER_NAME_SESSION_ATTRIBUTE_NAME,
    USER_NAME_SESSION_ATTRIBUTE_TOKEN
} from "./apiConstants";

class AuthService {

    constructor() {
        this.setAuthInterceptor();
    }

    executeBasicAuthenticationService(login, password) {
        return axios.post(AUTH_URL, {
            login, password
        })
            .then(response => {
                return response.data;
            })
            .then(data => {
                this.authWithLoginAndPassword(data);
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
                this.authWithLoginAndPassword(data);
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
        this.setAuthInterceptor();
    }

    logout() {
        this.clearLocalStorage();
        this.setAuthInterceptor();
    }

    setAuthInterceptor() {
        const setAuthCb = this.createSetAuthInterceptor();
        axios.interceptors.request.use(setAuthCb);
    };


    isAuthorized = () => {
        const user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    };

    createSetAuthInterceptor = () => config => {
        if (this.isAuthorized()) {
            config.headers.Authorization = this.getToken();
        } else {
            delete config.headers.Authorization;
        }
        return config;
    };

    isAdmin = () => {
        const isAdmin = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_ADMIN_MARKER);
        return isAdmin && isAdmin !== '';
    };

    getToken = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_TOKEN);

    getUserName = () => localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);

    clearLocalStorage = () => {
        localStorage.clear();
    };
}

export default new AuthService();
