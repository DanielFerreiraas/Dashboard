import axios from 'axios';

const api = axios.create({
    baseURL:"https://json-server-hnzt.onrender.com",
})

export default api;