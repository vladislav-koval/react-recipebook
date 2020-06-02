import axios from 'axios';
import {UPLOAD_AVATAR_URL, USER_NAME_SESSION_ATTRIBUTE_AVATAR} from "./apiConstants";


class ImagesService {
    uploadAvatar(file, login, imageName) {

        const fd = new FormData();
        fd.append("avatar", file);
        fd.append("login", login);
        fd.append("imageName", imageName);
        return axios.post(UPLOAD_AVATAR_URL, fd, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                return response.data;
            })
            .then(data => {
                this.setProfileAvatarToLocalStorage(data);
                window.location.reload();
                return data;
            })
            .catch(error => {
                throw new Error(error.response.data.error);
            });
    }

    setProfileAvatarToLocalStorage(imageName) {
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_AVATAR, imageName);
    }
}

export default new ImagesService();
