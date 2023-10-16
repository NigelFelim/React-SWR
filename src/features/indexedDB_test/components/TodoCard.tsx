/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import TodoForm from "./TodoForm";
import ToDoModel from "../models/ToDoModel";
import ToDoAddModel from "../models/ToDoAddModel";

interface Props {
    key: any;
    data: ToDoModel;
    onDelete: (id: number) => void;
    onSubmitUpdate: (id: number, formData: ToDoAddModel) => void;
}

const TodoCard: React.FC<Props> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const onSubmitUpdate = (formData: ToDoAddModel) => {
        props.onSubmitUpdate(props.data.id, formData)
        setOpenDialog(false);
    }

    return (
        <>
        <div className="w-full border border-solid border-black rounded-md my-4 p-4 flex justify-between">
            <div className="w-full">
                <p className="font-bold text-xl">{props.data.id} {props.data.title}</p>
                <p className="font-bold text-xl">{props.data.content}</p>
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