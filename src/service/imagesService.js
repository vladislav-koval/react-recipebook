import axios from 'axios';
import {UPLOAD_AVATAR_URL} from "./apiConstants";


class ImagesService {
    uploadAvatar(image, login, imageName) {
        let data = {
            filedata: image,
            login,
            imageName,
        };
        return axios.post(UPLOAD_AVATAR_URL, data)
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
