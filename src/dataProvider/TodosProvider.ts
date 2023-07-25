import { AxiosResponse } from "axios";
import { GetTodosListModelData, GetTodosListModelPack } from "../model/todos/GetTodosListModel";
import BaseUrl from "./BaseUrl";
import CreateOrUpdateTodoModel from "../model/todos/CreateOrUpdateTodoModel";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 5000))

const TodosProvider = {
    getList: async () => {
        // Coba pakai pagination dan search setelah berhasil implementasi dan paham dengan SWR
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
            // Returnnya object/JSON yang isinya adalah newData + id baru
            const result: AxiosResponse = await BaseUrl.post("/todos", newData);

            const resultData: GetTodosListModelData = new GetTodosListModelData(result.data);

            console.log(result);
            console.log(resultData);

            return Promise.resolve(resultData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    updateTodo: async (id: number, updatedData: CreateOrUpdateTodoModel) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Mengubah Data")

        try {
            // Returnnya object/JSON yang isinya adalah newData + id baru
            const result: AxiosResponse = await BaseUrl.put(`/todos/${id}`, updatedData);

            const resultData: GetTodosListModelData = new GetTodosListModelData(result.data);

            console.log(result);
            console.log(resultData);

            return Promise.resolve(resultData);
        } catch (error) {
            return Promise.reject(error)
        }
    },
    deleteTodo: async (id: number) => {
        await delay();

        if (Math.random() < 0.5) return Promise.reject("Gagal Menghapus Data")

        try {
            // Returnnya object/JSON kosong
            await BaseUrl.delete(`/todos/${id}`);

            return Promise.resolve();
        } catch (error) {
            return Promise.reject(error)
        }
    }
};

export default TodosProvider;