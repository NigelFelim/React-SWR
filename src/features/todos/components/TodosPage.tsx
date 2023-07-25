import React, { useState } from "react";
import useGetTodosList from "../services/useGetTodosList";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import Alert from "../../../components/Alert";
import SuccessAlert from "../../../components/SuccessAlert";
import useSWR from "swr";
import useAddTodo, { addNewTodoOptions } from "../services/useAddTodo";
import BaseUrl from "../../../dataProvider/BaseUrl";

const TodosPage: React.FC = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [openFailedAlert, setOpenFailedAlert] = useState<boolean>(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    const { getTodosDataList } = useGetTodosList();
    const { addNewTodo } = useAddTodo();

    // Contoh dibawah ini adalah kalau mau dipakai buat pagination. Kalau ada argument lain dibagian key,
    // maka keynya jadi list dan di functionnya juga list
    // Contoh: const { data: todos, mutate, isLoading, error } = useSWR([a, b], ([a, b]) => fetcher);
    // Catatan: Key yang paling depan kalo itu url, bisa dipake untuk API call.
    // Contoh: useSWR("https://google.com", (url) => axios.get(url).then((res) => res.data).catch((error) => console.log(error)))
    const { data: todos, mutate, isLoading, error } = useSWR([null, page], ([url, page]) => getTodosDataList(page));

    const onSubmit = async (formData: CreateOrUpdateTodoModel) => {
        try {
            setOpenDialog(false);

            await mutate(
                addNewTodo(formData, todos),
                addNewTodoOptions(formData, todos),
            );

            setOpenSuccessAlert(true);

            setTimeout(() => setPage(1), 5000)
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
            {
                isLoading ? <p className="text-center font-bold text-lg">LOADING...</p> :
                error ? <p className="text-center text-red-700 font-bold text-lg">{error.toString()}</p> :
                <div className="overflow-auto h-[62vh]">
                {
                    todos && todos.length > 0 && todos.map((item, index) => 
                        <TodoCard key={index} data={item} />
                    )
                }
            </div>
            }
            <div className="w-full flex items-center justify-content gap-5">
                <button className="w-full outline outline-1" onClick={() => setPage(page - 1)}>Previous</button>
                <button className="w-full outline outline-1" onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>

        <TodoForm dialogTitle="Tambah To Do Baru" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={onSubmit} />

        <Alert open={openFailedAlert} handleClose={() => setOpenFailedAlert(false)} title="Gagal" content="Gagal Menambahkan Data" />

        <SuccessAlert open={openSuccessAlert} handleClose={() => setOpenSuccessAlert(false)} title="Berhasil" content="Berhasil Menambahkan Data" />
        </>
    );
}

export default TodosPage;