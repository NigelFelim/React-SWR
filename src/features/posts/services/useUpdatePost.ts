/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";

const useUpdatePost = () => {
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [editError, setEditError] = useState<any>(null);

    const updatePost = async (id: number, data: CreateOrUpdatePostModel) => {
        try {
            setEditError(null);
            setEditLoading(true);

            await PostsProvider.updatePost(id, data);
            
            setEditLoading(false);
        } catch (error) {
            setEditError(error);
            setEditLoading(false);
        }
    }
    
    return { editLoading, editError, updatePost }
}

export default useUpdatePost;