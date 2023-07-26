/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import TodoForm from "./TodoForm";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";

interface Props {
    key: any;
    data: GetTodosListModelData;
    onDelete: (id: number) => void;
    onSubmitUpdate: (id: number, formData: CreateOrUpdateTodoModel) => void;
}

const TodoCard: React.FC<Props> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const onSubmitUpdate = (formData: CreateOrUpdateTodoModel) => {
        props.onSubmitUpdate(props.data.id, formData)
        setOpenDialog(false);
    }

    return (
        <>
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
                <button className="bg-red-300" onClick={() => props.onDelete(props.data.id)}>Delete</button>
                <button className="bg-blue-300" onClick={() => setOpenDialog(true)}>Edit</button>
            </div>
        </div>

        <TodoForm
            open={openDialog}
            data={props.data}
            dialogTitle="Update To Do"
            onClose={() => setOpenDialog(false)}
            onSubmit={onSubmitUpdate} 
        />
        </>
    );
}

export default TodoCard;