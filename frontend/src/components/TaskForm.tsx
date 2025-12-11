import './TaskForm.css'
import { ChangeEvent, useState, type FormEvent } from 'react';
import type { TaskFormData } from '../types/task.type';
import { useTaskContext } from '../context/TaskContext';
import { IoClose, IoAddCircleOutline } from 'react-icons/io5';

const DEFAULT_VALUES: TaskFormData = {
  title: "",
  description: ""
} 

interface TaskFormProps {
  initialData?: TaskFormData;
  isLoading: boolean
  onClose: () => void
}

export default function TaskForm({ 
  initialData, 
  isLoading,
  onClose 
}: TaskFormProps) {
  const { createTask } = useTaskContext()
  const [formData, setFormData] = useState<TaskFormData>(initialData || DEFAULT_VALUES)

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('El título de la tarea no puede estar vacío.'); 
      return; 
    }

    await createTask(formData);

    setFormData(DEFAULT_VALUES)
    onClose()
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="create-modal-overlay" onClick={onClose}>
      <div className="create-modal-content" onClick={(e) => e.stopPropagation()}>
        
        <div className="create-modal-header">
          <div className="create-modal-header-content">
            <div>
              <h2 className="create-modal-title">Nueva Tarea</h2>
              <p className="create-modal-subtitle">Crea una nueva tarea para organizar tu día</p>
            </div>
          </div>
          <button 
            className="create-modal-close" 
            onClick={onClose} 
            aria-label="Cerrar"
            type="button"
          >
            <IoClose />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="create-task-form">
          <div className="create-form-body">
            
            <div className="create-form-group">
              <label htmlFor="create-title" className="create-form-label">
                Título
                <span className="create-form-label__required">*</span>
              </label>
              <input
                id="create-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ej: Completar proyecto de React"
                className="create-form-input"
                maxLength={100}
                autoFocus
              />
            </div>

            <div className="create-form-group">
              <div className="create-form-label-row">
                <label htmlFor="create-description" className="create-form-label">
                  Descripción
                </label>
                <span className="create-form-hint">
                  {formData.description.length}/300
                </span>
              </div>
              <textarea
                id="create-description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe los detalles de tu tarea (opcional)"
                className="create-form-textarea"
                rows={4}
                maxLength={300}
              />
            </div>

          </div>

          <div className="create-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="create-btn-cancel"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="create-btn-submit"
              disabled={isLoading || !formData.title.trim()}
            >
              {isLoading ? (
                <>
                  <span className="create-btn-spinner"></span>
                  Creando...
                </>
              ) : (
                <>
                  <IoAddCircleOutline />
                  Crear Tarea
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}