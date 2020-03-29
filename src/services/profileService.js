import { apiCall } from '../redux/api/';


export default class ProfileService {

    getProfile(id){
        try{
            return apiCall(`user/${id}/profile`, null, null, 'GET')
        }catch(error){
            return error
        }
    }

    getFriends(id){
        try{
            return apiCall(`user/${id}/friends`, null, null, 'GET')
        }catch(error){
            return error
        }
    }

    getPurchases(id){
        try{
            return apiCall(`user/${id}/purchases`, null, null, 'GET')
        }catch(error){
            return error
        }
    }

    addCash(id, amount){
        try{
            return apiCall(`user/${id}/addcash`, amount, null, 'PUT')
        }catch(error){
            return error
        }
    }
}