import './Form.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { RegisterData } from '../../types/user.type';

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterData>()
    const { register: registerUser, loading, error: authError } = useAuth();
    const navigate = useNavigate()

    const onSubmit = async(data: RegisterData) => {    
        const success = await registerUser(data);
    
        if (success) {
            reset()
            navigate("/tasks")
        }
    }
    
    return(
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <div className="auth-icon">👤</div>
                    <h1 className="auth-title">Crear Cuenta</h1>
                    <p className="auth-subtitle">Comienza tu experiencia con nosotros</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    {authError && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {authError}
                        </div>
                    )}
                    
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nombre Completo</label>
                        <input 
                            id="name" 
                            {...register("name", {
                                required: "El nombre es obligatorio",
                                minLength: {
                                    value: 2,
                                    message: "Mínimo 2 caracteres"
                                }
                            })}  
                            placeholder="Tu nombre completo" 
                            type="text"
                            className={`form-input ${errors.name ? 'input-error' : ''}`}
                            disabled={loading}
                        />
                        {errors.name && (
                            <p className="error-text">{errors.name.message}</p>
                        )}
                    </div>

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
                                },
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                    message: "Debe contener al menos una mayúscula, una minúscula y un número"
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