import axios from 'axios';
import {API_URL} from "./apiConstants";

const AUTH_URL = `${API_URL}/login`;
const REGISTRATION_URL = `${API_URL}/join`;

const USER_NAME_SESSION_ATTRIBUTE_TOKEN = 'token';
const API_AUTHORITY_ADMIN = 'ADMIN';

class AuthService {

    authWithLoginAndPassword(login, password) {
        return axios.post(AUTH_URL,{
            login, password
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    registerNewUser(login, password, name, surname) {
        return axios.post(REGISTRATION_URL, {
            login, password, name, surname
        })
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    isAuthorized = () => {
        return false;
    }
}

export default new AuthService();
