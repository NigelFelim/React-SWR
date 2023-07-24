/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import { MdCheckCircle, MdCancel } from "react-icons/md";

interface Props {
    key: any;
    data: GetTodosListModelData;
}

const TodoCard: React.FC<Props> = (props) => {
    return (
        <div className="w-full border border-solid border-black rounded-md my-4 p-4 grid grid-cols-12">
            <div className="flex items-center gap-4 col-span-6">
                {
                    props.data.isCompleted ?
                    <MdCheckCircle size={30} color="green" /> :
                    <MdCancel size={30} color="red" />
                }
                <p className="font-bold text-xl">{props.data.title}</p>
            </div>
            <div className="w-full flex flex-row-reverse items-center gap-5 col-span-6">
                <button className="bg-red-300">Delete</button>
                <button className="bg-blue-300">Edit</button>
            </div>
        </div>
    );
}

export default TodoCard;