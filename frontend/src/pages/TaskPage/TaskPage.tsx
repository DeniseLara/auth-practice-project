import './TaskPage.css'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Task } from '../../types/task.type';

import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import EditTaskModal from '../../components/EditTaskModal';
import { useTaskContext } from '../../context/TaskContext';


export default function TaskPage() {
    const [filter, setFilter] = useState('all')
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const { tasks, loading } = useTaskContext()
    /*const { 
        tasks, 
        loading, 
        createTask, 
        toggleCompletion,
        handleDelete,
        handleEdit
    } = useTasks()*/

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
                <header className="header-content">
                    <h1 className="task-page__title">Tus Tareas</h1>
                    <p className="task-page__subtitle">
                        Organiza y completa tus tareas diarias con Steve
                    </p>
                </header>

                <TaskForm isLoading={loading}/>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-state__icon">📝</span>
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
                                <span className="empty-state__icon">🔍</span>
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
                            <TaskList 
                                filteredTasks={filteredTasks}
                                onEditClick={(task) => setEditingTask(task)}
                            />
                        )}
                    </div>
                )}

                {editingTask && (
                    <EditTaskModal
                        task={editingTask}
                        onClose={() => setEditingTask(null)}
                    />
                )}
        </section>
    );
}