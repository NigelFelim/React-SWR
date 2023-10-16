import { DBSchema, openDB } from "idb";
import ToDoModel from "../models/ToDoModel";

const dbPromise = openDB<ToDoDB>("my_database", 1, {
    upgrade(db) {
        db.createObjectStore("todos", { keyPath: "ids", autoIncrement: true })
    },
})

interface ToDoDB extends DBSchema {
    todos: {
        key: number;
        value: ToDoModel;
    }
}

export const dbService = {
    async addTodo(todo: ToDoModel) {
        const db = await dbPromise;
        const tx = db.transaction("todos", "readwrite");
        const store = tx.objectStore('todos');
        await store.add(todo);
        await tx.done;
    },
    async getAllTodo(): Promise<ToDoModel[]> {
        const db = await dbPromise;
        const tx = db.transaction("todos", "readonly");
        const store = tx.objectStore("todos");
        return store.getAll()
    },
    async getOneTodo(id: number): Promise<ToDoModel | undefined> {
        const db = await dbPromise;
        const tx = db.transaction("todos", "readonly");
        const store = tx.objectStore("todos");
        return store.get(id)
    },
    async deleteTodo(id: number) {
        const db = await dbPromise;
        const tx = db.transaction('todos', 'readwrite');
        const store = tx.objectStore('todos');
        await store.delete(id);
        await tx.done;
    },
    async updateTodo(todo: ToDoModel) {
        const db = await dbPromise;
        const tx = db.transaction('todos', 'readwrite');
        const store = tx.objectStore('todos');
        await store.put(todo);
        await tx.done;
    },
}