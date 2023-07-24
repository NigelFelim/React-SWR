/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel"

interface Props {
    key: any;
    data: GetPostsListModelData;
}

const PostCard: React.FC<Props> = (props) => {
    return (
        <div className="w-full border border-solid border-black rounded-md my-4 p-4 grid grid-cols-12">
            <div className="w-full col-span-6">
                <p className="font-bold text-xl">{props.data.title}</p>
                <p>{props.data.body}</p>
            </div>
            <div className="w-full flex flex-row-reverse items-center gap-5 col-span-6">
                <button className="bg-red-300">Delete</button>
                <button className="bg-blue-300">Edit</button>
            </div>
        </div>
    );
}

export default PostCard;