import React, { useState, useEffect } from "react";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import useGetTodosList from "../services/useGetTodosList";
import TodoCard from "./TodoCard";

const TodosPage: React.FC = () => {
    const [todosData, setTodosData] = useState<GetTodosListModelData[]>([]);

    const { data } = useGetTodosList();

    useEffect(() => {
        if (data) setTodosData(data);
    }, [data])

    return (
        <div className="p-10">
            <p className="text-4xl font-bold mb-9">To Do Page</p>
            <div className="flex flex-row-reverse w-full mb-7">
                <button className="bg-blue-800 text-white">Add New To Do</button>
            </div>
            {
                todosData.length > 0 && todosData.map((item, index) => 
                    <TodoCard key={index} data={item} />
                )
            }
        </div>
    );
}

export default TodosPage;