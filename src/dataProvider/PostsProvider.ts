import { AxiosResponse } from "axios";
import BaseUrl from "./BaseUrl";
import { GetPostsListModelPack } from "../model/posts/GetPostsListModel";
import CreateOrUpdatePostModel from "../model/posts/CreateOrUpdatePostModel";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 5000))

const PostsProvider = {
    getList: async () => {
        // Coba pakai pagination dan search setelah berhasil implementasi dan paham dengan SWR
        await delay();

        try {
            const result: AxiosResponse = await BaseUrl.get("/posts");
            
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
            await BaseUrl.post("/posts", newData);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    },
    updatePost: async (id: number, updatedData: CreateOrUpdatePostModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Mengubah Data")

        try {
            await BaseUrl.put(`/posts/${id}`, updatedData);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deletePost: async (id: number) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menghapus Data")

        try {
            await BaseUrl.delete(`/posts/${id}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    }
};

export default PostsProvider;