import './FilterTasks.css'
import { Task, TaskFilterType } from "../types/task.type";

interface FilterTasksProps {
    tasks: Task[]
    filter: TaskFilterType
    setFilter: (filter: TaskFilterType) => void
}

export default function FilterTasks({ tasks, filter, setFilter }: FilterTasksProps) {
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;
    const totalTasks = tasks.length;

    return(
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
    );
}