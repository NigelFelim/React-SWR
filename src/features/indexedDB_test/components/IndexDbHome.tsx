import React, { useEffect, useState } from "react";
import ToDoModel from "../models/ToDoModel";
import { dbService } from "../services/dbServices";
import { db, dexieDbService } from "../services/dexieDbService";
import { useLiveQuery } from "dexie-react-hooks";

const IndexDbHome: React.FC = () => {
    const [todoData, setToDoData] = useState<ToDoModel[]>([]);

    useEffect(() => {
        getToDoData();
        getSpecficTodo();
    }, [])

    const getToDoData = async () => {
        // dbService.getAllTodo()
        //     .then((data) => {
        //         console.log(data)
        //         setToDoData(data)
        //     })
        //     .catch((error) => console.log(error))

        const data = await dexieDbService.getAllTodo()

        console.log("OKE ", data)

        setToDoData(data)
    }

    const addNewTodo = () => {
        db.todos.add({ id: todoData.length, isFinished: false, title: `ABCD Title ${todoData.length}`, content: `EDFG Content ${todoData.length}`})
            .then(() => getToDoData())
            .catch((error) => console.log(error))
        // dbService.addTodo({ id: todoData.length, isFinished: false, title: `ToDo Title ${todoData.length}`, content: `ToDo Content ${todoData.length}`})
        //     .then(() => getToDoData())
        //     .catch((error) => console.log(error));
    }

    const getSpecficTodo = async () => {
        // dbService.getOneTodo(1)
        //     .then((data) => console.log(data))
        //     .catch((error) => console.log(error))

        const datas = await db.todos.where("title").equals("ToDo Title 4").toArray()
        console.log("MANTAP ", datas)
    }

    const deleteSpecificTodo = (id: number) => {
        // dbService.deleteTodo(id)
        //     .then(() => getToDoData())
        //     .catch((error) => console.log(error));

        db.todos.delete(id)
            .then(() => getToDoData())
            .catch((error) => console.log(error));
    }

    const updateSpecificTodo = (id: number, data: ToDoModel) => {
        const newData: ToDoModel = {
            id: data.id,
            ids: data.ids,
            title: data.title,
            content: data.content,
            isFinished: !data.isFinished
        }

        db.todos.update(id, newData)
            .then(() => getToDoData())
            .catch((error) => console.log(error));

        // dbService.updateTodo(newData)
        //     .then(() => getToDoData())
        //     .catch((error) => console.log(error));
    }

    return (
        <div>
            <p>TEST INDEX DB</p>
            <button onClick={() => addNewTodo()}>Add New ToDo</button>
            {
                todoData.map((data: ToDoModel) => 
                    <div key={data.ids} className="flex justify-between">
                        <p>{data.title}</p>
                        <p>{data.content}</p>
                        <button onClick={() => updateSpecificTodo(data.ids!, data)}>Update</button>
                        <button onClick={() => deleteSpecificTodo(data.ids!)}>Delete</button>
                    </div>
                )
            }
        </div>
    );
}

export default IndexDbHome;