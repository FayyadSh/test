const { default: axios } = require("axios");
const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api`;

const axiosClient = axios.create({
    baseURL: baseUrl
});

export default axiosClient;