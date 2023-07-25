/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CreateOrUpdateTodoModel from "../../../model/todos/CreateOrUpdateTodoModel";
import TodosProvider from "../../../dataProvider/TodosProvider";
import { MutatorOptions } from "swr";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";

const useUpdateTodo = () => {
    const [addLoading, setAddLoading] = useState<boolean>(false);
    const [addError, setAddError] = useState<any>(null);

    const updateTodo = async (id: number, newTodo: CreateOrUpdateTodoModel, oldTodos: GetTodosListModelData[] | undefined) => {
        try {
            setAddError(null);
            setAddLoading(true);

            const result = await TodosProvider.updateTodo(id, newTodo);
            console.log(result);

            setAddLoading(false);

            if (!oldTodos) {
                return Promise.resolve([result]);
            } else {
                return Promise.resolve(
                    oldTodos.map(item => {
                        if (item.id === id) {
                            return { id: result.id, title: result.title, isCompleted: result.isCompleted } as GetTodosListModelData
                        }

                        return item as GetTodosListModelData;
                    })
                );
            }
        } catch (error) {
            setAddError(error);
            setAddLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { addLoading, addError, updateTodo }
}

export const updateTodoOptions = (id: number, newTodo: CreateOrUpdateTodoModel, oldTodos: GetTodosListModelData[] | undefined): MutatorOptions => {
    if (!oldTodos) {
        return {
            optimisticData: [newTodo],
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        }
    } else {
        return {
            optimisticData: oldTodos.map(item => {
                if (item.id === id) {
                    return { id: id, title: newTodo.title, isCompleted: newTodo.completed } as GetTodosListModelData
                }

                return item as GetTodosListModelData;
            }),
            rollbackOnError: true,
            populateCache: true,
            revalidate: false,
        }
    }
}

export default useUpdateTodo;