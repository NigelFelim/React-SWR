/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from "react";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import Alert from "../../../components/Alert";
import SuccessAlert from "../../../components/SuccessAlert";
import TodoForm from "./TodoForm";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import useGetTodosList from "../services/useGetTodosList";
import useSWR from "swr";
import useUpdateTodo, { updateTodoOptions } from "../services/useUpdateTodo";
import useDeleteTodo, { deleteTodoOptions } from "../services/useDeleteTodo";
import ToDoContext from "../context/ToDoContext";

interface Props {
    key: any;
    data: GetTodosListModelData;
}

const TodoCard: React.FC<Props> = (props) => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);
    const [openFailedDeleteAlert, setOpenFailedDeleteAlert] = useState<boolean>(false);
    const [openSuccessDeleteAlert, setOpenSuccessDeleteAlert] = useState<boolean>(false);

    const { getTodosDataList } = useGetTodosList();
    const { updateTodo } = useUpdateTodo();
    const { deleteTodo } = useDeleteTodo();

    const { page, setPage } = useContext(ToDoContext);

    const { data: todos, mutate } = useSWR(`/todos?_limit=5&_page=${page}`, () => getTodosDataList(page));

    const handleSubmit = async (formData: CreateOrUpdateTodoModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                updateTodo(props.data.id, formData, todos),
                updateTodoOptions(props.data.id, formData, todos)
            );

            setOpenSuccessAlert(true);
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedAlert(true);
        }
    }

    const handleDeleteData = async () => {
        try {
            setOpenDialog(false);

            await mutate(
                deleteTodo(props.data.id, todos),
                deleteTodoOptions(props.data.id, todos),
            );

            setOpenSuccessDeleteAlert(true);
            setTimeout(() => setPage(1), 5000)
        } catch (error) {
            setOpenDialog(false);
            setOpenFailedDeleteAlert(true);
        }
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
                <button className="bg-red-300" onClick={() => handleDeleteData()}>Delete</button>
                <button className="bg-blue-300" onClick={() => setOpenDialog(true)}>Edit</button>
            </div>
        </div>

        <TodoForm open={openDialog} data={props.data} dialogTitle="Update To Do" onClose={() => setOpenDialog(false)} onSubmit={handleSubmit} />

        <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Mengubah Data" />

        <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Sukses" content="Berhasil Mengubah Data" />

        <Alert open={openFailedDeleteAlert} handleClose={() => setOpenFailedDeleteAlert(false)} title="Gagal" content="Gagal Menghapus Data" />

        <SuccessAlert open={openSuccessDeleteAlert} handleClose={() => setOpenSuccessDeleteAlert(false)} title="Sukses" content={`Berhasil Menghapus Data. Anda akan dialihkan ke halaman 1 dalam 5 detik`} />
        </>
    );
}

export default TodoCard;