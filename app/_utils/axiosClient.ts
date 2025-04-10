const { default: axios } = require("axios");
const baseUrl = `https://test-ob0t2ctxv-fayyad-shhadehs-projects.vercel.app/api`;

const axiosClient = axios.create({
    baseURL: baseUrl
});

export default axiosClient;