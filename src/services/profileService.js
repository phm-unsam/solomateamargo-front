import axios from 'axios';
import { URL } from './url';

export default class ProfileService {

    async getProfile(id){
        const result = await axios.get(`${URL}user/${id}/profile`);
        return result.data
    }

    async getFriends(id){
        const result = await axios.get(`${URL}user/${id}/friends`);
        return result.data
    }

    async getPurchases(id){
        const result = await axios.get(`${URL}user/${id}/purchases`);
        return result.data
    }

    async addCash(id, amount){
        const response = await axios.put(`${URL}user/${id}/addcash`, amount);
        return response
    }

    async addFriend(id, friendId){
        const response = await axios.put(`${URL}user/${id}/friend/${friendId}`);
        return response
    }

    async deleteFriend(id, friendId){
        const response = await axios.delete(`${URL}user/${id}/friend/${friendId}`);
        return response
    }

    async updateProfile(user){
        const response = await axios.post(`${URL}user/profile`, user);
        return response.data
    }   

    async possibleFriends(id){
        const result = await axios.get(`${URL}user/${id}/possiblefriends`);
        return result.data
    }
}