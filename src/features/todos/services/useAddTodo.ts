/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import TodosProvider from "../../../dataProvider/TodosProvider";

const useAddTodo = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const addNewTodo = async (data: CreateOrUpdateTodoModel) => {
        try {
            setAddError(null);
            setAddLoading(true);

            await TodosProvider.addNewTodo(data);
            
            setAddLoading(false);
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
        }
    }
    
    return { addLoading, addError, addNewTodo }
}

export default useAddTodo;