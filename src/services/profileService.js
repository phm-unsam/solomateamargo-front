import axios from 'axios';
import {getUrlWithUser} from './server'


export default class ProfileService {

    async getProfile(id){
        const result = await axios.get(`${getUrlWithUser()}/profile`);
        return result.data
    }

    async getFriends(id){
        const result = await axios.get(`${getUrlWithUser()}/friends`);
        return result.data
    }

    async getPurchases(id){
        const result = await axios.get(`${getUrlWithUser()}/purchases`);
        return result.data
    }

    async addCash(id, amount){
        const response = await axios.put(`${getUrlWithUser()}/addcash`, amount);
        return response
    }

    async addFriend(id, friendId){
        const response = await axios.post(`${getUrlWithUser()}/friend/${friendId}`);
        return response
    }

    async deleteFriend(id, friendId){
        const response = await axios.delete(`${getUrlWithUser()}/friend/${friendId}`);
        return response
    }

    async updateProfile(user){
        const response = await axios.put(`${getUrlWithUser()}/profile`, user);
        return response.data
    }   

    async possibleFriends(id){
        const result = await axios.get(`${getUrlWithUser()}/possiblefriends`);
        return result.data
    }
}