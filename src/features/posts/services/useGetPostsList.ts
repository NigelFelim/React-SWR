/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetPostsListModelData, GetPostsListModelPack } from "../../../model/posts/GetPostsListModel";
import PostsProvider from "../../../dataProvider/PostsProvider";

const useGetPostsList = () => {
    const [data, setPostsData] = useState<GetPostsListModelData[]>([]);
    const [getLoading, setGetLoading] = useState<boolean>(false);
    const [getError, setGetError] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            try {
                setGetError(null);
                setGetLoading(true);

                const result : GetPostsListModelPack | undefined = await PostsProvider.getList();
                const resultData = result as GetPostsListModelPack;

                setPostsData(resultData.data);
                
                setGetLoading(false);
            } catch (error) {
                setGetError(error);
                setGetLoading(false);
            }
        }

        getData();
    }, [])

    return { data, getLoading, getError }
}

export default useGetPostsList;