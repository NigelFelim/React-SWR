/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { GetPostsListModelData, GetPostsListModelPack } from "../../../model/posts/GetPostsListModel";
import PostsProvider from "../../../dataProvider/PostsProvider";

const useGetPostsList = () => {
    const [data, setPostsData] = useState<GetPostsListModelData[]>([]);
    const [getLoading, setGetLoading] = useState<boolean>(false);
    const [getError, setGetError] = useState<any>(null);

    const getPostsListData = async () => {
        try {
            setGetError(null);
            setGetLoading(true);

            const result : GetPostsListModelPack | undefined = await PostsProvider.getList();
            const resultData = result as GetPostsListModelPack;

            setPostsData(resultData.data);
            
            setGetLoading(false);

            return Promise.resolve(resultData.data.sort((a, b) => b.id - a.id))

            // Pakai kode dibawah jka tidak sort
            // return Promise.resolve(resultData.data)
        } catch (error) {
            setPostsData([]);
            setGetError(error);
            setGetLoading(false);
            return Promise.reject(error);
        }
    }

    // useEffect(() => {
    //     async function getData() {
    //         try {
    //             setGetError(null);
    //             setGetLoading(true);

    //             const result : GetPostsListModelPack | undefined = await PostsProvider.getList();
    //             const resultData = result as GetPostsListModelPack;

    //             setPostsData(resultData.data);
                
    //             setGetLoading(false);
    //         } catch (error) {
    //             setGetError(error);
    //             setGetLoading(false);
    //         }
    //     }

    //     getData();
    // }, [])

    return { getPostsListData, data, getLoading, getError }
}

export default useGetPostsList;