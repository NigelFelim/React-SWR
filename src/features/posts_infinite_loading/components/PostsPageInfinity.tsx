import React, { useState, useEffect } from "react";
import PostCard from "./PostCard";
import CreateOrUpdatePostModel from "../../../model/posts/CreateOrUpdatePostModel";
import PostForm from "./PostForm";
import Alert from "../../../components/Alert";
// import useSWR from "swr";
import SuccessAlert from "../../../components/SuccessAlert";
import useGetPostsListInfinite from "../services/useGetPostsListInfinite";
import useAddPostInfinite, { addNewPostinfiniteOptions } from "../services/useAddPostInfinite";
import useSWRInfinite from "swr/infinite";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel";

const PostsPageInfinity: React.FC = () => {
    const { addNewPostInfinite } = useAddPostInfinite();

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

    const { getPostsListDataInfinite } = useGetPostsListInfinite();

    const {
        size,
        setSize,
        data: posts,
        mutate
    } = useSWRInfinite(
        (index) => `/posts?_limit=1&_page=${index + 1}`,
        (url) => getPostsListDataInfinite(url)
    );

    const [page, setPage] = useState<number>(size);

    const allData: GetPostsListModelData[] = posts ? [].concat(...posts) : [];

    const onSubmit = async (formData: CreateOrUpdatePostModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                addNewPostInfinite(formData, allData),
                addNewPostInfiniteOptions(formData, allData),
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedAlert(true);
        }
    }

    const handleClickLoadMore = () => {
        setSize(size + 1);
        setPage(size + 1);
    }

    useEffect(() => {
        console.log(posts)
        // console.log(allData)
    }, [posts])

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">Posts Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button type="button" className="bg-blue-800 text-white" onClick={() => setOpenDialog(true)}>Add New To Do</button>
            </div>
            <div className="overflow-auto h-[62vh]">
                {
                    allData && allData.length > 0 && allData.map((item, index) => 
                        <PostCard key={index} data={item} />
                    )
                }
            </div>
            <div className="w-full">
                <button type="button" disabled={page === 15} className="bg-blue-500 w-full text-white" onClick={handleClickLoadMore}>Load More</button>
            </div>
        </div>

        <PostForm dialogTitle="Tambah Post Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={onSubmit} />

        <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />

        <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Berhasil" content="Berhasil Menambahkan Data" />
        </>
    );
}

export default PostsPageInfinity;