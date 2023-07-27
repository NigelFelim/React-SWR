import { AxiosResponse } from "axios";
import BaseUrl from "./BaseUrl";
import { GetPostsListModelData, GetPostsListModelPack } from "../model/posts/GetPostsListModel";
import CreateOrUpdatePostModel from "../model/posts/CreateOrUpdatePostModel";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 3000))

const PostsProvider = {
    getList: async () => {
        // Coba pakai pagination dan search setelah berhasil implementasi dan paham dengan SWR
        try {
            const result: AxiosResponse = await BaseUrl.get("/posts");
            
            const postsData: GetPostsListModelPack = new GetPostsListModelPack(result);

            return Promise.resolve(postsData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getListInfinite: async (url: string) => {
        try {
            const result: AxiosResponse = await BaseUrl.get(url);
        
            const postsData: GetPostsListModelPack = new GetPostsListModelPack(result);

            return Promise.resolve(postsData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    getListDropdown: async (searchParam: string) => {
        try {
            const result: AxiosResponse = await BaseUrl.get(`/posts?q=${searchParam}`);
        
            const postsData: GetPostsListModelPack = new GetPostsListModelPack(result);

            return Promise.resolve(postsData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    addNewPost: async (newData: CreateOrUpdatePostModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menambahkan Data")

        try {
            // Returnnya object/JSON yang isinya adalah newData + id baru
            const result: AxiosResponse = await BaseUrl.post("/posts", newData);

            const resultData: GetPostsListModelData = new GetPostsListModelData(result.data);

            console.log(result);
            console.log(resultData);

            return Promise.resolve(resultData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    updatePost: async (id: number, updatedData: CreateOrUpdatePostModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Mengubah Data")

        try {
            // Returnnya object/JSON yang isinya adalah newData
            const result: AxiosResponse = await BaseUrl.put(`/posts/${id}`, updatedData);

            const resultData: GetPostsListModelData = new GetPostsListModelData(result.data);

            console.log(result);
            console.log(resultData);

            return Promise.resolve(resultData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deletePost: async (id: number) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menghapus Data")

        try {
            // Returnnya object/JSON kosong
            await BaseUrl.delete(`/posts/${id}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    }
};

export default PostsProvider;