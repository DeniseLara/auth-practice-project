import './Form.css'
import { useState, type FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const { register, loading, error } = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const success = await register(formData);
    
        if (success) {
            setFormData({ name: "", email: "", password: ""})
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
                    <div className="auth-icon">👤</div>
                    <h1 className="auth-title">Crear Cuenta</h1>
                    <p className="auth-subtitle">Comienza tu experiencia con nosotros</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nombre Completo</label>
                        <input 
                            id="name" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder="Tu nombre completo" 
                            type="text"
                            className="form-input"
                            disabled={loading}
                        />
                    </div>

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
                        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                    </button>

                    <div className="auth-footer">
                        <span className="auth-link-text">
                            ¿Ya tienes una cuenta? 
                            <Link to="/" className="auth-link">Inicia sesión aquí</Link>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}