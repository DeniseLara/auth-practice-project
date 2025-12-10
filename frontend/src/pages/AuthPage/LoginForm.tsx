import './Form.css'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LoginData } from '../../types/user.type';

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<LoginData>()
    const { login, loading, error: authError } = useAuth();
    const navigate = useNavigate()

    const onSubmit = async(data: LoginData) => {
        const success = await login(data);

        if (success) {
            reset()
            navigate("/tasks")
        }
    }
    
    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">🔐</div>
                    <h1 className="auth-title">Iniciar Sesión</h1>
                    <p className="auth-subtitle">Accede a tu cuenta para continuar</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    {authError && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {authError}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input 
                            id="email" 
                            {...register("email", {
                                required: "El email es obligatorio",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Email inválido"
                                }
                            })}  
                            placeholder="tu@email.com" 
                            type="email"
                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="error-text">{errors.email.message}</p>
                        )}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input 
                            id="password" 
                            {...register("password", {
                                required: "La contraseña es obligatoria",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo 6 caracteres"
                                }
                            })}  
                            placeholder="••••••••" 
                            type="password"
                            className={`form-input ${errors.password ? 'input-error' : ''}`}
                            disabled={loading}
                        />
                        {errors.password && (
                            <p className="error-text">{errors.password.message}</p>
                        )}
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