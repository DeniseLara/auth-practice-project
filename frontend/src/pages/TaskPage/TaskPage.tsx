import './TaskPage.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { formatDate } from "../../utils/formatDate";
import { useTasks } from '../../hooks/useTasks';
import TaskForm from '../../components/TaskForm';


export default function TaskPage() {
    const [filter, setFilter] = useState('all')
    const { 
        handleDelete, 
        tasks, 
        loading, 
        createTask, 
        handleUpdate 
    } = useTasks()

    if (loading) return <p>Cargando...</p>

    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;
    const totalTasks = tasks.length;

    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed
        if (filter === "pending") return !task.completed
        return true
    }
    )

    return(
        <section className="task-page">
            <Link className='back-to-home' to="/home">Ir al inicio</Link>
            <div className="task-page__header">
                <div className="header-content">
                    <h1 className="task-page__title">Tus Tareas</h1>
                    <p className="task-page__subtitle">
                        Organiza y completa tus tareas diarias con Steve
                    </p>
                </div>
            </div>

            <TaskForm createTask={createTask} isLoading={loading}/>

            {tasks.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-state__icon">📝</div>
                    <h3 className="empty-state__title">No hay tareas aún</h3>
                    <p className="empty-state__text">
                        Comienza agregando tu primera tarea arriba
                    </p>
                </div>
            ) : (
                <div className="task-list-container">
                    <ul className="filter-tabs">
                        <li>
                            <button 
                                className={`filter-tab ${filter === 'all' ? 'filter-tab--active' : ''}`}
                                onClick={() => setFilter('all')}
                            >
                                Todas
                                <span className="filter-tab__count">{totalTasks}</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`filter-tab ${filter === 'completed' ? 'filter-tab--active' : ''}`}
                                onClick={() => setFilter('completed')}
                            >
                                Completadas
                                <span className="filter-tab__count">{completedTasks}</span>
                            </button>
                        </li>
                        <li>
                            <button 
                                className={`filter-tab ${filter === 'pending' ? 'filter-tab--active' : ''}`}
                                onClick={() => setFilter('pending')}
                            >
                                Pendientes
                                <span className="filter-tab__count">{pendingTasks}</span>
                            </button>
                        </li>
                    </ul>

                    {filteredTasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-state__icon">🔍</div>
                            <h3 className="empty-state__title">
                                No hay tareas {filter === 'completed' ? 'completadas' : 'pendientes'}
                            </h3>
                            <p className="empty-state__text">
                                {filter === 'completed' 
                                    ? 'Completa algunas tareas para verlas aquí' 
                                    : 'Todas tus tareas están completadas'}
                            </p>
                        </div>
                    ) : ( 
                    <ul className="task-list">
                        {filteredTasks.map(task => (
                            <li className={`task-card ${task.completed ? 'task-card--completed' : ''}`} key={task.id}>
                                <div className="task-card__checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={task.completed}
                                        onChange={() => handleUpdate(task.id, task.completed)}
                                        id={`task-${task.id}`}
                                    />
                                    <label htmlFor={`task-${task.id}`}></label>
                                </div>
                                
                                <div className='task-card__content'>
                                    <h3 className="task-card__title">{task.title}</h3>
                                    {task.description && (
                                        <p className="task-card__description">{task.description}</p>
                                    )}
                                    <span className="task-card__date">{formatDate(task.createdAt)}</span>
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
                                </div>
                            </li>
                        ))}
                    </ul>
                    )}
                </div>
            )}
        </section>
    );
}