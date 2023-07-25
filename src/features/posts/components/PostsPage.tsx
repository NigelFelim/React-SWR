import React, { useState, useEffect } from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";
import useGetPostsList from "../services/useGetPostsList";
import PostCard from "./PostCard";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import PostForm from "./PostForm";

const PostsPage: React.FC = () => {
    const [postsData, setPostsData] = useState<GetPostsListModelData[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const { data } = useGetPostsList();

    const onSubmit = (formData: CreateOrUpdatePostModel) => {
        console.log(formData);
        setOpen(false);
    }

    useEffect(() => {
        if (data) setPostsData(data);
    }, [data])

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">Posts Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button type="button" className="bg-blue-800 text-white" onClick={() => setOpen(true)}>Add New To Do</button>
            </div>
            {
                postsData.length > 0 && postsData.map((item, index) => 
                    <PostCard key={index} data={item} />
                )
            }
        </div>

        <PostForm dialogTitle="Tambah Post Baru" open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} />
        </>
    );
}

export default PostsPage;