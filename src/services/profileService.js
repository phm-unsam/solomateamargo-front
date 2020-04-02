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

    addFriend(id, friendId){
        try{
            return apiCall(`user/${id}/addfriend/${friendId}`, null, null, 'PUT')
        }catch(error){
            return error
        }
    }

    deleteFriend(id, friendId){
        try{
            return apiCall(`user/${id}/deletefriend/${friendId}`, null, null, 'DELETE')
        }catch(error){
            return error
        }
    }

    updateProfile(user){
        try{
            return apiCall(`user/update`, user, null, 'POST')
        }catch(error){
            return error
        }
    }

   

    possibleFriends(id){
        try{
            return apiCall(`user/${id}/possiblefriends`, null, null, 'GET')
        }catch(error){
            return error
        }
    }
}