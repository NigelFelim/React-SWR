import Dexie, { Table } from "dexie";
import ToDoModel from "../models/ToDoModel";
import ToDoAddModel from "../models/ToDoAddModel";

// export const db = new Dexie("MY_DEXIE_DATABASE")

interface TestDataBaru {
    nama: string;
}

export class MyDexieDatabase extends Dexie {
    todos!: Table<ToDoModel>
    test123!: Table<TestDataBaru>

    constructor() {
        super("MY_DEXIE_DB")
        // console.log("MASUK SINI")
        this.version(1).stores({
            todos: '++id, title, content, [title+id]', // Primary key and indexed props,
            test123: "++id"
        })
    }
}

export const db = new MyDexieDatabase()

export const dexieDbService = {
    async addTodo(todo: ToDoAddModel) {
        db.todos.add(todo);

        const newData: TestDataBaru = {
            nama: "HALO"
        }
        db.test123.add(newData)
    },
    async addBulkTodo(todo: ToDoAddModel) {
        db.todos.bulkAdd([todo, todo, todo]);
    },
    async getAllTodo(): Promise<ToDoModel[]> {
        const data = await db.todos.orderBy("id").reverse().toArray()
    
        // if (!db.isOpen()) {
        //     db.open();
        //     return [];
        // }

        // const data = await db.todos.toArray()

        return data;
    },
    async getSpecificTodo(): Promise<ToDoModel[] | undefined> {
        const data = await db.todos.where(["title", "id"]).between(["Genshin Impact", 5], ["Genshin Impact", 7]).toArray()

        // const data = await db.todos.get(3)

        console.log("TEST GET 1 ", data)

        return data;
    },
    async deleteTodo(id: number) {
        db.todos.delete(id);
    },
    async bulkDelete() {
        const test = [0, 2, 4]
        const data = await db.todos.orderBy("id").reverse().toArray()
        const res = [];

        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < test.length; j++) {
                if (data[i].id === j) {
                    res.push(data[i].id)
                }
            }
        }
        db.todos.bulkDelete(res);
    },
    async updateTodo(id: number, todo: ToDoModel) {
        db.todos.update(id, todo)

        // Pakai dibawah ini kalau mau cuma ubah title aja
        // db.todos.update(id, {
        //     ...todo, //...todo bisa di comment
        //     title: "",
        // })
    },
    async clearTable() {
        // Buat clear table, tapi ID tidak akan mengulang dari awal jika add data baru
        // db.todos.clear();

        // Buat delete DB
        await db.delete()
    }
}