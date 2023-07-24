import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import DashboardPage from "./features/dashboard/components/DashboardPage"
import TodosPage from "./features/todos/components/TodosPage"
import PostsPage from "./features/posts/components/PostsPage"

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="posts" element={<PostsPage />} />
      </Route>
    </Routes>
  )
}

export default App
