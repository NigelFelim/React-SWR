/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";
import { MutatorOptions } from "swr";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

const useDeletePost = () => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<any>(null);

    const deletePost = async (id: number, oldPosts: GetPostsListModelData[] | undefined) => {
        try {
            setDeleteError(null);
            setDeleteLoading(true);

            await PostsProvider.deletePost(id);
            
            setDeleteLoading(false);

            if (!oldPosts) {
                return Promise.resolve([] as GetPostsListModelData[]);
            } else {
                return Promise.resolve(
                    oldPosts.filter(item => item.id !== id)
                )
            }
        } catch (error) {
            setDeleteError(error);
            setDeleteLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { deleteLoading, deleteError, deletePost }
}

export const deletePostOptions = (id: number, oldPosts: GetPostsListModelData[] | undefined): MutatorOptions => {
    if (!oldPosts) {
        return {
            optimisticData: [] as GetPostsListModelData[],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        };
    } else {
        return {
            optimisticData: oldPosts.filter(item => item.id !== id),
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        };
    }
}

export default useDeletePost;