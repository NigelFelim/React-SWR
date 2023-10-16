import Dexie, { Table } from "dexie";
import ToDoModel from "../models/ToDoModel";

// export const db = new Dexie("MY_DEXIE_DATABASE")

export class MyDexieDatabase extends Dexie {
    todos!: Table<ToDoModel>

    constructor() {
        super("MY_DEXIE_DB")
        console.log("MASUK SINI")
        this.version(1).stores({
            todos: '++ids, title, content, isFinished, id' // Primary key and indexed props
        })
    }
}

export const db = new MyDexieDatabase()

export const dexieDbService = {
    async addTodo(todo: ToDoModel) {
        await db.todos.add(todo);
    },
    async getAllTodo(): Promise<ToDoModel[]> {
        const data = await db.todos.orderBy("title").toArray()

        console.log("WKWKWKWKKW")
        console.log(data)

        return data;
    },
    async getOneTodo(id: number): Promise<ToDoModel[] | undefined> {
        const data = await db.todos.where("ids").equals(id).toArray();

        return data;
    },
    async deleteTodo(id: number) {
        await db.todos.delete(id);
    },
    // async updateTodo(todo: ToDoModel) {
    //     await db.todos.update(todo)
    // },
}