import axios from 'axios';

const api = axios.create({
    baseURL:"https://json-server-config.onrender.com",
})

export default api;