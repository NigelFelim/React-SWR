import { Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import DashboardPage from "./features/dashboard/components/DashboardPage"
import TodosPage from "./features/todos/components/TodosPage"
import PostsPage from "./features/posts/components/PostsPage"
import { useEffect } from "react"
import { AuthenticationProvider } from "./dataProvider/AuthProvider"
import PostsPageInfinity from "./features/posts_infinite_loading/components/PostsPageInfinity"

function App() {
  const login = () => {
    AuthenticationProvider.login()
      .then(() => generateToken())
      .catch((error) => console.log(error));
  }

  const generateToken = () => {
    AuthenticationProvider.generateNewToken()
      .then(() => console.log("SUKSES GENERATE TOKEN"))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    login()
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="todos" element={<TodosPage />} />
        <Route path="posts" element={<PostsPage />} />
        <Route path="posts-infinity" element={<PostsPageInfinity />} />
      </Route>
    </Routes>
  )
}

export default App
