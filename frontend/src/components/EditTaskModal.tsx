import './EditTaskModal.css'
import { FormEvent, useState } from "react";
import { Task } from "../types/task.type";
import { useTaskContext } from '../context/TaskContext';

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
        <div className="modal-overlay">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Tarea</h2>
                    <button className="modal-close" onClick={onClose} aria-label="Cerrar">
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Título *</label>
                        <input
                            id="title"
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Título de la tarea"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Descripción de la tarea (opcional)"
                            rows={4}
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div className="modal-actions">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="btn-secondary"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="btn-primary"
                            disabled={loading || !formData.title.trim()}
                        >
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}