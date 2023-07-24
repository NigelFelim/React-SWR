/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TodosProvider from "../../../dataProvider/TodosProvider";

const useDeleteTodo = () => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<any>(null);

    const deleteTodo = async (id: number) => {
        try {
            setDeleteError(null);
            setDeleteLoading(true);

            await TodosProvider.deleteTodo(id);
            
            setDeleteLoading(false);
        } catch (error) {
            setDeleteError(error);
            setDeleteLoading(false);
        }
    }
    
    return { deleteLoading, deleteError, deleteTodo }
}

export default useDeleteTodo;