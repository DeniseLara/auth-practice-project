import './Form.css'
import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { login, loading, error } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const success = await login(formData);

        if (success) {
            setFormData({ email: "", password: ""})
            navigate("/home")
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}))
    }
    
    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Iniciar Sesión</h1>
                    <p className="auth-subtitle">Accede a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="tu@email.com" 
                            type="email"
                            className="form-input"
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input 
                            id="password" 
                            name="password" 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="••••••••" 
                            type="password"
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`submit-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                    <div className="auth-footer">
                        <span className="auth-link-text">
                            ¿No tienes una cuenta? 
                            <Link to="/register" className="auth-link">Regístrate aquí</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
}