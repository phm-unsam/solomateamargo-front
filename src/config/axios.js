import Axios from "axios";

const compraAxios = Axios.create({
    baseURL: 'http://localhost:4000/'
})

export default compraAxios