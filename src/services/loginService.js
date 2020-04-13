import axios from 'axios';
import {REST_SERVER_URL} from './server'

export default class LoginService {
    async login(user){
        const result = await axios.post(`${REST_SERVER_URL}user/login`, user);
        return result.data;
    }
}