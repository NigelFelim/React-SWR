import { createContext } from "react";

interface ContextParams {
    page: number;
    setPage: (data: number) => void
}

const initialValue: ContextParams = {
    page: 1,
    setPage: () => {}
}

const ToDoContext = createContext(initialValue);

export default ToDoContext;