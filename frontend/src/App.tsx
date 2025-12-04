import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './context/AuthContext';
import LoginForm from "./pages/AuthPage/LoginForm";
import RegisterForm from "./pages/AuthPage/RegisterForm";
import HomePage from './pages/HomePage/HomePage';
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  const { user, loading } = useAuthContext()

  if (loading) return <p>Cargando...</p>

  return (
    <main>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/home" element={user ? <HomePage/>: <Navigate to="/" />}/>
        <Route path="/tasks" element={user ? <TaskPage/>: <Navigate to="/" />}/>
      </Routes>
    </main>
  );
}

export default App;