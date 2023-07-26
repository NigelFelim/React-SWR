import axios, { AxiosResponse, CreateAxiosDefaults } from "axios";
import { UserListModelPack } from "../model/user/UserListModel";

const clientConfig: CreateAxiosDefaults = {
    baseURL: "https://develop-api.pharos.co.id/ethical/",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
};
  
const HttpClient = axios.create(clientConfig);

export const AssignUserZonaProvider = {
    getUserList: async (page: number) => {
        const url = "/v1/user/sales";
        try {
            const queryParams = {
                page: page,
                limit: 20,
            };

            const response : AxiosResponse = await HttpClient.get(url, {
                params: queryParams,
            });

            const data = new UserListModelPack(response.data);

            return Promise.resolve(data);
                
        } catch (error) {
            return Promise.reject(error);
        }
    }
}