const { default: axios } = require("axios");
const baseUrl = 'http://localhost:3000/api';

const axiosClient = axios.create({
    baseURL: baseUrl
});

export default axiosClient;