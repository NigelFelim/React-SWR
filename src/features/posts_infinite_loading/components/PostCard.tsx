/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel"
import useSWR from "swr";
import Alert from "../../../components/Alert";
import SuccessAlert from "../../../components/SuccessAlert";
import PostForm from "./PostForm";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import useDeletePost, { deletePostOptions } from "../../posts/services/useDeletePost";
import useUpdatePost, { updatePostOptions } from "../../posts/services/useUpdatePost";
import useGetPostsListInfinite from "../services/useGetPostsListInfinite";

interface Props {
    key: any;
    data: GetPostsListModelData;
}

const PostCard: React.FC<Props> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

    const { getPostsListDataInfinite } = useGetPostsListInfinite();
    const { deletePost } = useDeletePost();
    const { updatePost } = useUpdatePost();

    // Selain pakai yang sekarang, bisa juga pakai useSWRConfig. Ambil "mutate" nya aja
    const { data: posts, mutate } = useSWR("/posts", getPostsListDataInfinite)

    const handleDeleteData = async () => {
        try {
            // Cara pakai "mutate" kalau dari useSWRConfig sama seperti yang diapaki sekarang, bedanya adalah sebelum data (function)
            // perlu dikasih key dari cache mana yang bersangkutan
            await mutate(
                deletePost(props.data.id, posts),
                deletePostOptions(props.data.id, posts),
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenFailedAlert(true);
        }
    }

    const handleUpdateData = async (formData: CreateOrUpdatePostModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                updatePost(props.data.id, formData, posts),
                updatePostOptions(props.data.id, formData, posts),
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedAlert(true);
        }
    }

    return (
        <>
        <div className="w-full border border-solid border-black rounded-md my-4 p-4 grid grid-cols-12">
            <div className="w-full col-span-6">
                <p className="font-bold text-xl">{props.data.title}</p>
                <p>{props.data.body}</p>
            </div>
            <div className="w-full flex flex-row-reverse items-center gap-5 col-span-6">
                <button className="bg-red-300" onClick={() => handleDeleteData()}>Delete</button>
                <button className="bg-blue-300" onClick={() => setOpenDialog(true)}>Edit</button>
            </div>
        </div>

        <PostForm open={openDialog} data={props.data} dialogTitle="Update Post" onClose={() => setOpenDialog(false)} onSubmit={handleUpdateData} />

        <Alert open={openFailedAlert} title="Gagal" content="Gagal Mengubah/Menghapus Data" handleClose={() => setOpenFailedAlert(false)} />

        <SuccessAlert open={openSuccessAlert} title="Berhasil" content="Berhasil Mengubah/Menghapus Data" handleClose={() => setOpenSuccessAlert(false)} />
        </>
    );
}

export default PostCard;