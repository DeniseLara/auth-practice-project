import { createContext, ReactNode, useContext } from "react";
import { useTasks } from "../hooks/useTasks";

type TaskContextType = ReturnType<typeof useTasks>

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
    const taskData = useTasks();

    return (
        <TaskContext value={taskData}>
            {children}
        </TaskContext>
    );
}

export function useTaskContext() {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error('useTaskContext debe usarse dentro de un TaskProvider');
    }
    return context
}