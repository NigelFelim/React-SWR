/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import TodosProvider from "../../../dataProvider/TodosProvider";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import { MutatorOptions } from "swr";

const useAddTodo = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const addNewTodo = async (newTodo: CreateOrUpdateTodoModel, oldTodos: GetTodosListModelData[] | undefined) => {
        try {
            setAddError(null);
            setAddLoading(true);

            const result = await TodosProvider.addNewTodo(newTodo);
            console.log(result);
            
            setAddLoading(false);

            if (!oldTodos) {
                return Promise.resolve([result]);
            } else {
                return Promise.resolve([...oldTodos, result]);
            }
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { addLoading, addError, addNewTodo }
}

export const addNewTodoOptions = (newTodo: CreateOrUpdateTodoModel, oldTodos: GetTodosListModelData[] | undefined) : MutatorOptions => {
    if (!oldTodos) {
        return {
            optimisticData: [newTodo],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        }
    } else {
        return {
            optimisticData: [...oldTodos, newTodo],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        }
    }
}

export default useAddTodo;