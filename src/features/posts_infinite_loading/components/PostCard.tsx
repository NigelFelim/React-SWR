/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GetPostsListModelData } from "../../../model/posts/GetPostsListModel"

interface Props {
    key: any;
    data: GetPostsListModelData;
}

const PostCard: React.FC<Props> = (props) => {
    return (
        <>
        <div className="w-full border border-solid border-black rounded-md my-4 p-4 grid grid-cols-12">
            <div className="w-full col-span-6">
                <p className="font-bold text-xl">{props.data.title}</p>
                <p>{props.data.body}</p>
            </div>
        </div>
        </>
    );
}

export default PostCard;