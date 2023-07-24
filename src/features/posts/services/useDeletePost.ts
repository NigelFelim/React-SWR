/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PostsProvider from "../../../dataProvider/PostsProvider";

const useDeletePost = () => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<any>(null);

    const deletePost = async (id: number) => {
        try {
            setDeleteError(null);
            setDeleteLoading(true);

            await PostsProvider.deletePost(id);
            
            setDeleteLoading(false);
        } catch (error) {
            setDeleteError(error);
            setDeleteLoading(false);
        }
    }
    
    return { deleteLoading, deleteError, deletePost }
}

export default useDeletePost;