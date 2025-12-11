import './EditTaskModal.css'
import { FormEvent, useState } from "react";
import { Task } from "../types/task.type";
import { useTaskContext } from '../context/TaskContext';
import { IoClose, IoSaveOutline, IoPencil } from 'react-icons/io5';

type EditTaskModalProps = {
    task: Task
    onClose: () => void
}

export default function EditTaskModal({ task, onClose }: EditTaskModalProps) {
    const { handleEdit } = useTaskContext()
    const [formData, setFormData] = useState({
        title: task.title,
        description: task.description || ""
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            setError("el título es requerido")
            return
        }

        setError(null);
        setLoading(true)

        const result = await handleEdit(task.id, formData);

        setLoading(false)
        
        if (result) {
            onClose();
        } else {
            setError("error al acctualizar tarea")
        }
    }
    
    return(
        <div className="edit-modal-overlay" onClick={onClose}>
            <div className="edit-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="edit-modal-header">
                    <div className="edit-modal-header-content">
                        <div>
                            <h2 className="edit-modal-title">Editar Tarea</h2>
                            <p className="edit-modal-subtitle">
                                Modifica los detalles de tu tarea
                            </p>
                        </div>
                    </div>
                    <button 
                        className="edit-modal-close" 
                        onClick={onClose} 
                        aria-label="Cerrar editor"
                        type="button"
                    >
                        <IoClose />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-task-form">
                    <div className="edit-form-body">
                        <div className="edit-form-group">
                            <label htmlFor="edit-title" className="edit-form-label">
                                Título de la tarea
                                <span className="edit-form-label__required">*</span>
                            </label>
                            <input
                                id="edit-title"
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="¿Qué necesitas hacer?"
                                className="edit-form-input"
                                maxLength={100}
                                autoFocus
                                disabled={loading}
                            />
                            <div className="edit-form-char-count">
                                {formData.title.length}/100
                            </div>
                        </div>

                        <div className="edit-form-group">
                            <div className="edit-form-label-row">
                                <label htmlFor="edit-description" className="edit-form-label">
                                    Descripción
                                </label>
                                <span className="edit-form-hint">
                                    Opcional
                                </span>
                            </div>
                            <textarea
                                id="edit-description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detalles adicionales, notas o instrucciones..."
                                className="edit-form-textarea"
                                rows={4}
                                maxLength={300}
                                disabled={loading}
                            />
                            <div className="edit-form-char-count">
                                {formData.description.length}/300
                            </div>
                        </div>

                        {error && (
                            <div className="edit-form-error">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="edit-modal-footer">
                        <button
                            type="button"
                            onClick={onClose}
                            className="edit-btn-cancel"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="edit-btn-save"
                            disabled={loading || !formData.title.trim()}
                        >
                            {loading ? (
                                <>
                                    <span className="edit-btn-spinner"></span>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <IoSaveOutline />
                                    Guardar Cambios
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}