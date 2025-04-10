const { default: axios } = require("axios");
const baseUrl = `http://test-three-rosy-57.vercel.app/api`;

const axiosClient = axios.create({
    baseURL: baseUrl
});

export default axiosClient;