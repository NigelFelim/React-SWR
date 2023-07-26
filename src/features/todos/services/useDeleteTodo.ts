/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import TodosProvider from "../../../dataProvider/TodosProvider";
import { GetTodosListModelData } from "../../../model/todos/GetTodosListModel";
import { MutatorOptions } from "swr";

const useDeleteTodo = () => {
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
    const [deleteError, setDeleteError] = useState<any>(null);

    const deleteTodo = async (id: number, oldTodos: GetTodosListModelData[] | undefined) => {
        try {
            setDeleteError(null);
            setDeleteLoading(true);

            await TodosProvider.deleteTodo(id);
            
            setDeleteLoading(false);

            if (!oldTodos) {
                return Promise.resolve([] as GetTodosListModelData[]);
            } else {
                return Promise.resolve(
                    oldTodos.filter(item => item.id !== id)
                );
            }
        } catch (error) {
            setDeleteError(error);
            setDeleteLoading(false);
            return Promise.reject(error);
        }
    }
    
    return { deleteLoading, deleteError, deleteTodo }
}

export const deleteTodoOptions = (id: number, oldTodos: GetTodosListModelData[] | undefined): MutatorOptions => {
    if (!oldTodos) {
        return {
            optimisticData: [] as GetTodosListModelData[],
            rollbackOnError: true,
            populateCache: true,
            revalidate: true,
        }
        // "revalidate" di set true jika halaman menggunakan pagination dan function yang dipanggil mengubah data dalam page yang
        // sedang dibuka sekarang. Misal pada function delete, jika pada page 5 ada 10 data lalu dihapus 1, jika tidak di revalidate
        // maka data pada page 5 sisa 9 (data pada page 6 tidak ada yang naik padahal seharusnya 1 data pada page 6 naik ke page 5).
        // Untuk revalidate dan merefresh ulang cache inilah revalidate di set dengan true
    } else {
        return {
            optimisticData: oldTodos.filter(item => item.id !== id),
            rollbackOnError: true,
            populateCache: true,
            revalidate: true,
        }
        // "revalidate" di set true jika halaman menggunakan pagination dan function yang dipanggil mengubah data dalam page yang
        // sedang dibuka sekarang. Misal pada function delete, jika pada page 5 ada 10 data lalu dihapus 1, jika tidak di revalidate
        // maka data pada page 5 sisa 9 (data pada page 6 tidak ada yang naik padahal seharusnya 1 data pada page 6 naik ke page 5).
        // Untuk revalidate dan merefresh ulang cache inilah revalidate di set dengan true
    }
}

export default useDeleteTodo;