/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import { MutatorOptions } from "swr";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

const useUpdatePost = () => {
    const [editLoading, setEditLoading] = useState<boolean>(false);
    const [editError, setEditError] = useState<any>(null);

    const updatePost = async (id: number, newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined) => {
        try {
            setEditError(null);
            setEditLoading(true);

            const result = await PostsProvider.updatePost(id, newPost);
            console.log(result);
            
            setEditLoading(false);

            if (!oldPosts) {
                return Promise.resolve([result]);
            } else {
                return Promise.resolve(
                    oldPosts.map(item => {
                        if (item.id === id) {
                            return { id: result.id, title: result.title, body: result.body } as GetPostsListModelData
                        }

                        return item as GetPostsListModelData;
                    })
                );
            }
        } catch (error) {
            setEditError(error);
            setEditLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { editLoading, editError, updatePost }
}

export const updatePostOptions = (id: number, newPost: CreateOrUpdatePostModel, oldPosts: GetPostsListModelData[] | undefined): MutatorOptions => {
    if (!oldPosts) {
        return {
            optimisticData: [newPost],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        };
    } else {
        return {
            optimisticData: oldPosts.map(item => {
                if (item.id === id) {
                    return { id: id, title: newPost.title, body: newPost.body } as GetPostsListModelData
                }

                return item as GetPostsListModelData;
            }),
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        };
    }
}

export default useUpdatePost;