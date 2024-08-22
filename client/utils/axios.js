import axios from "axios";

const instance = axios.create(
    {
        // baseURL: "http://localhost:3001"
        baseURL: "https://gc1.lifexdreams.com"
    }
)

export default instance;