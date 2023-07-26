/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { GetPostsListModelData, GetPostsListModelPack } from "../../../model/posts/GetPostsListModel";
import PostsProvider from "../../../dataProvider/PostsProvider";

const useGetPostsListInfinite = () => {
    const [data, setPostsData] = useState<GetPostsListModelData[]>([]);
    const [getLoading, setGetLoading] = useState<boolean>(false);
    const [getError, setGetError] = useState<any>(null);

    const getPostsListDataInfinite = async (url: string) => {
        try {
            setGetError(null);
            setGetLoading(true);

            const result : GetPostsListModelPack | undefined = await PostsProvider.getListInfinite(url);
            const resultData = result as GetPostsListModelPack;

            setPostsData(resultData.data);
            
            setGetLoading(false);

            return Promise.resolve(resultData.data)
        } catch (error) {
            setPostsData([]);
            setGetError(error);
            setGetLoading(false);
            return Promise.reject(error);
        }
    }

    return { getPostsListDataInfinite, data, getLoading, getError }
}

export default useGetPostsListInfinite;