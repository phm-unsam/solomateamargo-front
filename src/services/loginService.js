import axios from 'axios';
import { URL } from './url';

export default class LoginService {

    async login(user){
        const result = await axios.post(`${URL}user/login`, user);
        return result.data;
    }
}