import React, { useState } from "react";
import useGetPostsList from "../services/useGetPostsList";
import PostCard from "./PostCard";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import PostForm from "./PostForm";
import useAddPost, { addNewPostOptions } from "../services/useAddPost";
import Alert from "../../../components/Alert";
import useSWR from "swr";
import SuccessAlert from "../../../components/SuccessAlert";

const PostsPage: React.FC = () => {
    const { addNewPost } = useAddPost();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

    const { getPostsListData } = useGetPostsList();

    // Umumnya ini adalah function Get List karena setelah sukses Add/Update/Delete akan meng-update si List
    // Intinya ini hooks untuk handle Data Fetching
    const { data: posts, mutate } = useSWR("/posts", getPostsListData)
    // mutate gunanya untuk revalidate data. mutate pada hook useSWR berarti akan melakukan revalidate pada SWR ini.
    // Pada hook useSWRConfig, itu ada juga mutate. Bedanya, mutate pada hook tersebut bisa kita passing key.
    // Gunanya key yang dipassing untuk memfilter SWR (cache) mana yang perlu di revalidate

    // Ada pula hook useSWRMutation. Bedanya dengan useSWR dan useSWRConfig adalah hook ini di trigger manual dengan fungsi trigger
    // yang disediakan useSWRMutation dan bisa diakses dengan melakukan destructured

    const onSubmit = async (formData: CreateOrUpdatePostModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                addNewPost(formData, posts),
                addNewPostOptions(formData, posts),
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedAlert(true);
        }

        setOpenDialog(false);
    }

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">Posts Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button type="button" className="bg-blue-800 text-white" onClick={() => setOpenDialog(true)}>Add New To Do</button>
            </div>
            <div className="overflow-auto h-[62vh]">
                {
                    posts && posts.length > 0 && posts.map((item, index) => 
                        <PostCard key={index} data={item} />
                    )
                }
            </div>
        </div>

        <PostForm dialogTitle="Tambah Post Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={onSubmit} />

        <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />

        <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Berhasil" content="Berhasil Menambahkan Data" />
        </>
    );
}

export default PostsPage;