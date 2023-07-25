import React, { useState, useEffect } from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";
import useGetPostsList from "../services/useGetPostsList";
import PostCard from "./PostCard";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import PostForm from "./PostForm";
import useAddPost from "../services/useAddPost";
import Alert from "../../../components/Alert";

const PostsPage: React.FC = () => {
    const { addNewPost } = useAddPost();

    const [postsData, setPostsData] = useState<GetPostsListModelData[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const { data } = useGetPostsList();

    const onSubmit = async (formData: CreateOrUpdatePostModel) => {
        try {
            addNewPost(formData)
        } catch (error) {
            setOpenDialog(false);
            setOpenAlert(true);
        }

        setOpenDialog(false);
    }

    useEffect(() => {
        if (data) setPostsData(data);
    }, [data])

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">Posts Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button type="button" className="bg-blue-800 text-white" onClick={() => setOpenDialog(true)}>Add New To Do</button>
            </div>
            {
                postsData.length > 0 && postsData.map((item, index) => 
                    <PostCard key={index} data={item} />
                )
            }
        </div>

        <PostForm dialogTitle="Tambah Post Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={onSubmit} />

        <Alert open={openAlert} handleClose={() => setOpenAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />
        </>
    );
}

export default PostsPage;