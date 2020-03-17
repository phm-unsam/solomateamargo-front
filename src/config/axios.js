import Axios from "axios";

const cartAxios = Axios.create({
    baseURL: 'http://localhost:4000/'
})

export default cartAxios