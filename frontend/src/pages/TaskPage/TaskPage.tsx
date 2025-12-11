import './TaskPage.css'
import { useMemo, useState } from 'react';
import { Task, TaskFilterType } from '../../types/task.type';
import { useTaskContext } from '../../context/TaskContext';
import { SearchBar } from '../../components/SearchBar';
import { useAuth } from '../../hooks/useAuth';
import { CiLogout } from "react-icons/ci";
import { IoCreateOutline } from "react-icons/io5";

import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList';
import EditTaskModal from '../../components/EditTaskModal';
import FilterTasks from '../../components/FilterTasks';


export default function TaskPage() {
    const [filter, setFilter] = useState<TaskFilterType>('all')
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const { logout } = useAuth();
    const { 
        filteredTasks,
        tasks, 
        loading,
        searchTerm,
        searchTasks,
        clearSearch, 
    } = useTaskContext()


    const filteredByStatus = useMemo(() => {
        return filteredTasks.filter(task => {
            if (filter === "completed") return task.completed
            if (filter === "pending") return !task.completed
            return true
        })
    }, [filteredTasks, filter])

    const handleLogout = async() => {
        await logout()
    }

    if (loading) return <p>Cargando...</p>

    return(
        <section className="task-page">
                <header className="header-content">
                    <div className="header-content__text">
                    <h1 className="task-page__title">Tu Panel de Productividad</h1>
                    <p className="task-page__subtitle">
                        Una herramienta inteligente para <strong>nunca olvidar nada</strong>. 
                        Registra tus ideas, realiza <strong>búsquedas rápidas</strong> y filtra fácilmente tus pendientes de lo ya realizado.
                    </p>
                    </div>

                    <button className='btn-create-task' onClick={() => setShowCreateModal(true)}>
                        <IoCreateOutline/>
                    </button>
                </header>

                {tasks.length === 0 ? (
                    <div className="empty-state">
                        <span className="empty-state__icon">📝</span>
                            <h3 className="empty-state__title">
                                {searchTerm ? 'No hay tareas que coincidan con tu búsqueda' : 'No hay tareas aún'}
                            </h3>
                            <p className="empty-state__text">
                                Comienza agregando tu primera tarea arriba
                            </p>
                        </div>
                ) : (
                    <div className="task-list-container">
                        <SearchBar
                            onSearch={searchTasks}
                            onClear={clearSearch}
                            currentSearch={searchTerm}
                        />

                        <FilterTasks 
                            tasks={filteredTasks} 
                            filter={filter} 
                            setFilter={setFilter}
                        />

                        {filteredByStatus.length === 0 ? (
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
                                filteredTasks={filteredByStatus}
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
                 
                {showCreateModal && (
                    <TaskForm 
                        isLoading={loading}
                        onClose={() => setShowCreateModal(false)}
                    />
                )}

                <button className='btn-logout' onClick={handleLogout}>
                    <CiLogout/>
                    Cerrar sesión
                </button>
        </section>
    );
}