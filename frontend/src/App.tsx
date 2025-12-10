import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthContext } from './context/AuthContext';
import { TaskProvider } from "./context/TaskContext";
import LoginForm from "./pages/AuthPage/LoginForm";
import RegisterForm from "./pages/AuthPage/RegisterForm";
import TaskPage from "./pages/TaskPage/TaskPage";

function App() {
  const { user, loading } = useAuthContext()

  if (loading) return <p>Cargando...</p>

  return (
    <main>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/tasks" element={
          user 
          ? <TaskProvider><TaskPage/></TaskProvider> 
          : <Navigate to="/" />}/>
      </Routes>
    </main>
  );
}

export default App;