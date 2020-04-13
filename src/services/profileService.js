import axios from 'axios';
import {REST_SERVER_URL} from './server'

export default class ProfileService {

    async getProfile(id){
        const result = await axios.get(`${REST_SERVER_URL}user/${id}/profile`);
        return result.data
    }

    async getFriends(id){
        const result = await axios.get(`${REST_SERVER_URL}user/${id}/friends`);
        return result.data
    }

    async getPurchases(id){
        const result = await axios.get(`${REST_SERVER_URL}user/${id}/purchases`);
        return result.data
    }

    async addCash(id, amount){
        const response = await axios.put(`${REST_SERVER_URL}user/${id}/addcash`, amount);
        return response
    }

    async addFriend(id, friendId){
        const response = await axios.post(`${REST_SERVER_URL}user/${id}/friend/${friendId}`);
        return response
    }

    async deleteFriend(id, friendId){
        const response = await axios.delete(`${REST_SERVER_URL}user/${id}/friend/${friendId}`);
        return response
    }

    async updateProfile(user){
        const response = await axios.put(`${REST_SERVER_URL}user/profile`, user);
        return response.data
    }   

    async possibleFriends(id){
        const result = await axios.get(`${REST_SERVER_URL}user/${id}/possiblefriends`);
        return result.data
    }
}