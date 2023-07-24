/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import TodosProvider from "../../../dataProvider/TodosProvider";

const useUpdateTodo = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const updateTodo = async (id: number, data: CreateOrUpdateTodoModel) => {
        try {
            setAddError(null);
            setAddLoading(true);

            await TodosProvider.updateTodo(id, data);
            
            setAddLoading(false);
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
        }
    }
    
    return { addLoading, addError, updateTodo }
}

export default useUpdateTodo;