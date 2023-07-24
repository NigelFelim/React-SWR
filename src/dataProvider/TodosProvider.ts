import { AxiosResponse } from "axios";
import { GetTodosListModelPack } from "../model/todos/GetTodosListModel";
import BaseUrl from "./BaseUrl";
import CreateOrUpdateTodoModel from "../model/todos/CreateOrUpdateTodoModel";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 1000))

const TodosProvider = {
    getList: async () => {
        // Coba pakai pagination dan search setelah berhasil implementasi dan paham dengan SWR
        await delay();

        try {
            const result: AxiosResponse = await BaseUrl.get("/todos");

            const todosData: GetTodosListModelPack = new GetTodosListModelPack(result);

            return Promise.resolve(todosData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    addNewTodo: async (newData: CreateOrUpdateTodoModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menambahkan Data")

        try {
            await BaseUrl.post("/todos", newData);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    },
    updateTodo: async (id: number, updatedData: CreateOrUpdateTodoModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Mengubah Data")

        try {
            await BaseUrl.put(`/todos/${id}`, updatedData);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteTodo: async (id: number) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menghapus Data")

        try {
            await BaseUrl.delete(`/todos/${id}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    }
};

export default TodosProvider;