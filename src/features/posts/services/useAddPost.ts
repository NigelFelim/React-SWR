/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import { MutatorOptions } from "swr";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

const useAddPost = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const addNewPost = async (newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined) => {
        try {
            setAddError(null);
            setAddLoading(true);

            const result = await PostsProvider.addNewPost(newPost);
            console.log(result);
            
            setAddLoading(false);

            // Tipe data yang di return disamakan dengan data yang di return dari fungsi get list (jika list, maka data dari sini harus
            // balikin list). Perlu seperti itu karena function ini masuk ke dalam mutate() nya Get List sehingga perlu disesuaikan.
            //  Data yang di return (isinya), disamakan dengan data yang di bagian "otimisticData" pada "options".
            // Jika tidak disamakan pada dua hal yang disebut diatas, maka saat revalidate akan error
            if (!oldPosts) {
                return Promise.resolve([result])
            } else {
                return Promise.resolve([...oldPosts, result]);

                // Bisa juga pake bentuk yang kayak dicomment ini
                // return Promise.resolve([...oldPosts, {title: newPost.title, body: newPost.body}]);
            }
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { addLoading, addError, addNewPost }
}

export const addNewPostOptions = (newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined): MutatorOptions => {
    if (!oldPosts) {
        return {
            optimisticData: [newPost],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false
            // "revalidate" di set false karena pada ekspektasi jika berhasil menambahkan data adalah hasilnya sama dengan optimistic
            // data yang kita set, jadi data tidak perlu di revalidate lagi. Untuk add, data yang baru ditambah pasti sudah ada id).
            // Untuk update, misal ada form dalam dialog untuk update, setelah diupdate maka kalau buka dialog lagi akan otomatis
            // terupdate default valuenya dengan default value data yang terbaru
        };
    }
    
    return {
        optimisticData: [...oldPosts, newPost],
        rollbackOnError: true,
        populateCache: true,
        revalidate: false
        // "revalidate" di set false karena pada ekspektasi jika berhasil menambahkan data adalah hasilnya sama dengan optimistic
        // data yang kita set, jadi data tidak perlu di revalidate lagi. Untuk add, data yang baru ditambah pasti sudah ada id).
        // Untuk update, misal ada form dalam dialog untuk update, setelah diupdate maka kalau buka dialog lagi akan otomatis
        // terupdate default valuenya dengan default value data yang terbaru
    };
}

export default useAddPost;