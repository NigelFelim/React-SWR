/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { GetTodosListModelData, GetTodosListModelPack } from "../../../model/todos/GetTodosListModel";
import TodosProvider from "../../../dataProvider/TodosProvider";

const useGetTodosList = () => {
    const [data, setTodosData] = useState<GetTodosListModelData[]>([]);
    const [getLoading, setGetLoading] = useState<boolean>(false);
    const [getError, setGetError] = useState<any>(null);

    const getTodosDataList = async () => {
        try {
            setGetError(null);
            setGetLoading(true);

            const result : GetTodosListModelPack | undefined = await TodosProvider.getList();
            const resultData = result as GetTodosListModelPack;

            setTodosData(resultData.data);
            
            setGetLoading(false);

            return Promise.resolve(resultData.data);
        } catch (error) {
            setTodosData([]);
            setGetError(error);
            setGetLoading(false);
            return Promise.reject(error);
        }
    }

    return { getTodosDataList, data, getLoading, getError }
}

export default useGetTodosList;