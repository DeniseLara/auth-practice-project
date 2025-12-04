import './TaskForm.css'
import { useState, type FormEvent } from 'react';
import type { TaskFormData } from '../types/task.type';

const API = import.meta.env.VITE_HABITS_API

interface TaskFormProps {
  initialData?: TaskFormData;
  createTask: (data: TaskFormData) => void
  isLoading: boolean
}

export default function TaskForm({ 
  initialData, 
  createTask,
  isLoading 
}: TaskFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "")

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('El título de la tarea no puede estar vacío.'); 
      return; 
    }

    await createTask({
      title,
      description
    });
    setTitle("")
    setDescription("")
  };

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              <span className="form-label__required">*</span>
            </label>
            <textarea
              id="task-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe los detalles de tu tarea..."
              className="form-textarea"
              disabled={isLoading}
              maxLength={300}
              rows={3}
            />
            <span className="form-hint">
              {description.length}/300 caracteres
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