import axios from 'axios';
import {API_URL} from "./apiConstants";

const AUTH_URL = `${API_URL}/login`;

const USER_NAME_SESSION_ATTRIBUTE_TOKEN = 'token';
const API_AUTHORITY_ADMIN = 'ADMIN';

class AuthService {

    authWithLoginAndPassword(login, password) {
        return axios.post(AUTH_URL,{
            username: login, password, remember: "yes"
        })
            .then(response => console.log(response.data))
            .catch(error => console.log(error));
    }
}

export default new AuthService();
