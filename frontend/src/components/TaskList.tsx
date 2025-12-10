import './TaskList.css'
import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/task.type"
import { formatDate } from "../utils/formatDate"
import { CiCalendarDate } from "react-icons/ci";
import { CiMenuKebab } from "react-icons/ci";
import { useRef, useState } from 'react';

type TaskListProps = {
    filteredTasks: Task[]
    onEditClick: (task: Task) => void
}

export default function TaskList({ 
    filteredTasks, 
    onEditClick 
}: TaskListProps) {
    const [isMenuOpen, setIsMenuOpen] = useState<string | null>(null);
    const { toggleCompletion, handleDelete } = useTaskContext()
    const menuRef = useRef<HTMLDivElement>(null);

    const handleMenuClick = (e: React.MouseEvent, taskId: string) => {
        e.stopPropagation();
        setIsMenuOpen(isMenuOpen === taskId ? null : taskId);
    };
    
    return(
        <section>
            <ul className="task-list">
            {filteredTasks.map(task => (
                <li className={`task-card ${task.completed ? 'task-card--completed' : ''}`} key={task.id}>
                    <div className="task-card__container">
                        <div className="task-card__checkbox">
                            <input 
                                type="checkbox" 
                                checked={task.completed}
                                onChange={() => toggleCompletion(task.id, task.completed)}
                                id={`task-${task.id}`}
                            />
                            <label htmlFor={`task-${task.id}`}></label>
                        </div>
                    
                        <div className="task-card__principal">         
                            <div className='task-card__content'>
                                <h3 className="task-card__title">{task.title}</h3>
                                {task.description && (
                                    <p className="task-card__description">{task.description}</p>
                                )}
                                <span className="task-card__date">
                                    <CiCalendarDate/>
                                    {formatDate(task.createdAt)}
                                </span>
                            </div>

                            <span className={`task-badge ${task.completed ? 'task-badge--completed' : 'task-badge--pending'}`}>
                                {task.completed ? "Completada" : "Pendiente"}
                            </span>
                        </div>
                    </div>
                    
                    <div className="task-menu-container" ref={menuRef}>
                        <button 
                            className={`task-menu-button ${isMenuOpen ? 'task-menu-button--active' : ''}`}
                            onClick={(e) => handleMenuClick(e, task.id)}
                            aria-label="Abrir menú de opciones"
                            aria-expanded={isMenuOpen === task.id}
                        >
                            <CiMenuKebab />
                        </button>
                        
                        {isMenuOpen === task.id && (
                        <div className="task-dropdown-menu">
                            <ul className="dropdown-menu-list">
                                <li className="dropdown-menu-item">
                                    <button 
                                        className="dropdown-menu-button" 
                                        onClick={() => handleDelete(task.id)}
                                        aria-label="Eliminar tarea"
                                    >
                                        Eliminar
                                    </button>
                                </li>

                                <li>
                                    <button 
                                        className="dropdown-menu-button" 
                                        onClick={() => onEditClick(task)}
                                        aria-label="Editar tarea"
                                        disabled={task.completed}
                                    >
                                        Editar
                                    </button>
                                </li>
                            </ul>
                        </div>
                        )}
                    </div>
                </li>
            ))}
            </ul>
        </section>  
    );
}