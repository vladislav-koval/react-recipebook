import axios from 'axios';
import {UPLOAD_AVATAR_URL} from "./apiConstants";


class ImagesService {
    uploadAvatar(file, login, imageName) {

        const fd = new FormData();
        fd.append("file", file);
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
            .then(data => data)
            .catch(error => {
                throw new Error(error.response.data.error);
            });
    }
}

export default new ImagesService();
