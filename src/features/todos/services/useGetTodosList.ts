/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { GetTodosListModelData, GetTodosListModelPack } from "../../../model/todos/GetTodosListModel";
import TodosProvider from "../../../dataProvider/TodosProvider";

const useGetTodosList = () => {
    const [data, setTodosData] = useState<GetTodosListModelData[]>([]);
    const [getLoading, setGetLoading] = useState<boolean>(false);
    const [getError, setGetError] = useState<any>(null);

    useEffect(() => {
        async function getData() {
            try {
                setGetError(null);
                setGetLoading(true);

                const result : GetTodosListModelPack | undefined = await TodosProvider.getList();
                const resultData = result as GetTodosListModelPack;

                setTodosData(resultData.data);
                
                setGetLoading(false);
            } catch (error) {
                setGetError(error);
                setGetLoading(false);
            }
        }

        getData();
    }, [])

    return { data, getLoading, getError }
}

export default useGetTodosList;