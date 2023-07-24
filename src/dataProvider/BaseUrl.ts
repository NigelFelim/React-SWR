import axios, { CreateAxiosDefaults } from "axios";

const clientConfig : CreateAxiosDefaults = {
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
    },
}

const BaseUrl = axios.create(clientConfig);

export default BaseUrl;