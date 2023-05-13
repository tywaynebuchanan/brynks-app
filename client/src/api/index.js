import axios from "axios";

const token = localStorage.getItem("token");
const axiosInstance = axios.create({
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});

export default axiosInstance;