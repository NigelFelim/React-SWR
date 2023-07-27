import { AxiosResponse } from "axios";
import { GetTodosListModelData, GetTodosListModelPack } from "../model/todos/GetTodosListModel";
import BaseUrl from "./BaseUrl";
import CreateOrUpdateTodoModel from "../model/todos/CreateOrUpdateTodoModel";

const delay = () => new Promise<void>(res => setTimeout(() => res(), 3000))

const TodosProvider = {
    getList: async (page: number) => {
        // Coba pakai pagination dan search setelah berhasil implementasi dan paham dengan SWR
        // await delay();

        console.log("TEST MASUK")
        console.log(page)
        console.log(typeof(page))

        try {
            if (typeof(page) === "number" && page > 0) {
                const result: AxiosResponse = await BaseUrl.get(`/todos?_limit=2&_page=${page}`);

                const todosData: GetTodosListModelPack = new GetTodosListModelPack(result);

                return Promise.resolve(todosData);
            } else {
                console.log("ERROR")
                return Promise.reject("Page kurang dari 1")
            }
        } catch (error) {
            return Promise.reject("Page kurang dari 1")
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