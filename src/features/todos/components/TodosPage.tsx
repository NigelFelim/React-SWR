import React, { useState } from "react";
import useGetTodosList from "../services/useGetTodosList";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import Alert from "../../../components/Alert";
import SuccessAlert from "../../../components/SuccessAlert";
import useSWR from "swr";
import useAddTodo, { addNewTodoOptions } from "../services/useAddTodo";

const TodosPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);

    const { getTodosDataList } = useGetTodosList();
    const { addNewTodo } = useAddTodo();

    const { data: todos, mutate } = useSWR("/todos", getTodosDataList);

    const onSubmit = async (formData: CreateOrUpdateTodoModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                addNewTodo(formData, todos),
                addNewTodoOptions(formData, todos),
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedAlert(true);
        }
    }

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">To Do Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button className="bg-blue-800 text-white" onClick={() => setOpenDialog(true)}>Add New To Do</button>
            </div>
            <div className="overflow-auto h-[62vh]">
                {
                    todos && todos.length > 0 && todos.map((item, index) => 
                        <TodoCard key={index} data={item} />
                    )
                }
            </div>
        </div>

        <TodoForm dialogTitle="Tambah To Do Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={onSubmit} />

        <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />

        <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Berhasil" content="Berhasil Menambahkan Data" />
        </>
    );
}

export default TodosPage;