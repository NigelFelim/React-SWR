import React, { useState, useEffect } from "react";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import useGetTodosList from "../services/useGetTodosList";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";

const TodosPage: React.FC = () => {
    const [todosData, setTodosData] = useState<GetTodosListModelData[]>([]);
    const [open, setOpen] = useState<boolean>(false);

    const { data } = useGetTodosList();

    const onSubmit = (formData: CreateOrUpdateTodoModel) => {
        console.log(formData);
        setOpen(false);
    }

    useEffect(() => {
        if (data) setTodosData(data);
    }, [data])

    return (
        <>
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">To Do Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button className="bg-blue-800 text-white" onClick={() => setOpen(true)}>Add New To Do</button>
            </div>
            {
                todosData.length > 0 && todosData.map((item, index) => 
                    <TodoCard key={index} data={item} />
                )
            }
        </div>

        <TodoForm dialogTitle="Tambah To Do Baru" open={open} onClose={() => setOpen(false)} onSubmit={onSubmit} />
        </>
    );
}

export default TodosPage;