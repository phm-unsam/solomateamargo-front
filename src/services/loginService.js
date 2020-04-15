import axios from 'axios';
import { ROOT_SERVER_URL} from './server'

class LoginService {
    async login(user) {
        const result = await axios.post(`${ROOT_SERVER_URL}user/login`, user);
        return result.data;
    }
}

export default new LoginService()