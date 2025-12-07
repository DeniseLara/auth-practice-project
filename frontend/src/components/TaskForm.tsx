import './TaskForm.css'
import { ChangeEvent, useState, type FormEvent } from 'react';
import type { TaskFormData } from '../types/task.type';
import { useTaskContext } from '../context/TaskContext';

const API = import.meta.env.VITE_HABITS_API

const DEFAULT_VALUES: TaskFormData = {
  title: "",
  description: ""
} 

interface TaskFormProps {
  initialData?: TaskFormData;
  isLoading: boolean
}

export default function TaskForm({ 
  initialData, 
  isLoading 
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
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form" noValidate>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="task-title" className="form-label">
              Título
              <span className="form-label__required">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              name='title'
              value={formData.title}
              onChange={handleChange}
              placeholder="Ej: Completar informe mensual"
              className="form-input"
              disabled={isLoading}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Descripción
            </label>
            <textarea
              id="task-description"
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe los detalles de tu tarea..."
              className="form-textarea"
              disabled={isLoading}
              maxLength={300}
              rows={3}
            />
            <span className="form-hint">
              {formData.description.length}/300 caracteres
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading && <span className="btn-spinner"></span>}
          <span>Crear tarea</span>
        </button>
      </form>
    </div>
  );
}