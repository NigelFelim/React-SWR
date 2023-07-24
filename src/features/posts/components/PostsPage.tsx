import React, { useState, useEffect } from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";
import useGetPostsList from "../services/useGetPostsList";
import PostCard from "./PostCard";

const PostsPage: React.FC = () => {
    const [postsData, setPostsData] = useState<GetPostsListModelData[]>([]);

    const { data } = useGetPostsList();

    useEffect(() => {
        if (data) setPostsData(data);
    }, [data])

    return (
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">Posts Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button className="bg-blue-800 text-white">Add New To Do</button>
            </div>
            {
                postsData.length > 0 && postsData.map((item, index) => 
                    <PostCard key={index} data={item} />
                )
            }
        </div>
    );
}

export default PostsPage;