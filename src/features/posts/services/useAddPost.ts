/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";

const useAddPost = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const addNewPost = async (data: CreateOrUpdatePostModel) => {
        try {
            setAddError(null);
            setAddLoading(true);

            await PostsProvider.addNewPost(data);
            
            setAddLoading(false);
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
        }
    }
    
    return { addLoading, addError, addNewPost }
}

export default useAddPost;