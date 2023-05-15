import axios from 'axios';

const api = axios.create({
    baseURL:"https://json-server-ex-epu8.onrender.com/",
})

export default api;