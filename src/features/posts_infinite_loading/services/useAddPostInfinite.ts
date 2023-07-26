/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import { MutatorOptions } from "swr";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

const useAddPostInfinite = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const addNewPostInfinite = async (newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined) => {
        try {
            setAddError(null);
            setAddLoading(true);

            const result = await PostsProvider.addNewPost(newPost);
            console.log(result);
            
            setAddLoading(false);

            if (!oldPosts) {
                return Promise.resolve([result])
            } else {
                return Promise.resolve([result, ...oldPosts]);
            }
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { addLoading, addError, addNewPostInfinite }
}

export const addNewPostinfiniteOptions = (newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined): MutatorOptions => {
    if (!oldPosts) {
        return {
            optimisticData: [newPost],
            rollbackOnError: true,
            populateCache: true,
            revalidate: true
        };
    }
    
    return {
        optimisticData: [newPost, ...oldPosts],
        rollbackOnError: true,
        populateCache: true,
        revalidate: true
    };
}

export default useAddPostInfinite;