import axios, { AxiosResponse, CreateAxiosDefaults } from "axios";

const clientConfig : CreateAxiosDefaults = {
    baseURL: "https://develop-api.pharos.co.id/auth/",
    withCredentials: true,
}

const AuthClient = axios.create(clientConfig);

export const AuthenticationProvider = {
    login: async () => {
        try {
            const response : AxiosResponse = await AuthClient.post("/v1/authentication/login", {
                email: "admin@gmail.com",
                password: "admin",
                remember_me: true,
            });
    
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    generateNewToken: async () => {
        try {
            const response : AxiosResponse = await AuthClient.post("/v1/authentication/generate_token");
    
            return Promise.resolve(response);
        } catch (error) {
            return Promise.reject(error);
        }
    },
}