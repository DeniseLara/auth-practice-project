import { Route, Routes } from "react-router-dom";
import { useAuthContext } from './context/AuthContext';

import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegisterForm";
import HomePage from './pages/HomePage';

function App() {
  const { user, loading } = useAuthContext()

  if (loading) return <p>Cargando...</p>

  return (
    <main>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/home" element={user ? <HomePage/>: <LoginForm/>}/>
      </Routes>
    </main>
  );
}

export default App;