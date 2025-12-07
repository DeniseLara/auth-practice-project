import { useTaskContext } from "../context/TaskContext";
import { Task } from "../types/task.type"
import { formatDate } from "../utils/formatDate"
import { CiCalendarDate } from "react-icons/ci";


type TaskListProps = {
    filteredTasks: Task[]
    onEditClick: (task: Task) => void
}

export default function TaskList({ 
    filteredTasks, 
    onEditClick 
}: TaskListProps) {
    const { toggleCompletion, handleDelete } = useTaskContext()

    return(
        <section>
        <ul className="task-list">
            {filteredTasks.map(task => (
                <li className={`task-card ${task.completed ? 'task-card--completed' : ''}`} key={task.id}>
                    <div className="task-card__checkbox">
                        <input 
                            type="checkbox" 
                            checked={task.completed}
                            onChange={() => toggleCompletion(task.id, task.completed)}
                            id={`task-${task.id}`}
                        />
                        <label htmlFor={`task-${task.id}`}></label>
                    </div>
                                        
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
        
                    <div className='task-card__actions'>
                        <span className={`task-badge ${task.completed ? 'task-badge--completed' : 'task-badge--pending'}`}>
                            {task.completed ? "Completada" : "Pendiente"}
                        </span>
                        <button 
                            className="btn-delete" 
                            onClick={() => handleDelete(task.id)}
                            aria-label="Eliminar tarea"
                        >
                            🗑️
                        </button>

                        <button 
                            className="btn-edit" 
                            onClick={() => onEditClick(task)}
                            aria-label="Editar tarea"
                            disabled={task.completed}
                        >
                            Editar
                        </button>
                    </div>
                </li>
            ))}
        </ul>
        </section>  
    );
}