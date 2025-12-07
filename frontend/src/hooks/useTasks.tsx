import { useCallback, useEffect, useState } from "react";
import type { Task, UpdateTaskData } from "../types/task.type";
import { TaskFormData } from "../types/task.type";

const API = import.meta.env.VITE_TASKS_API

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async() => {
        setError(null);
        setLoading(true)

        try {
            const res = await fetch(API, {
                headers: { "Content-type": "application/json" },
                credentials: "include"
            })

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const data = await res.json()
            setTasks(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al cargar tareas');
            console.error('Error al obtener tareas:', err);
        } finally {
            setLoading(false)
        }

    }, []);


    const createTask = useCallback(async (taskData: TaskFormData) => {
        setError(null);

        try {
            const res = await fetch(API, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(taskData)
            });

            if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

            const newTask = await res.json();
            setTasks(prev => [...prev, newTask]);
            return { success: true, data: newTask };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al crear tarea';
            setError(message);
            return { success: false, error: message };
        }

    }, []);


    const handleDelete = useCallback(async(id: string) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
                credentials: "include"
            })
            setTasks(prev => prev.filter(habit => habit.id !== id))
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al eliminar tarea');
            console.error('Error al eliminar tarea:', err); 
        }
    }, [])


    const toggleCompletion = useCallback(async(id: string, completedSatus: boolean) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ completed: !completedSatus })
            })

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            const updatedTask = await res.json()
            setTasks(prev => prev.map(habit => 
                habit.id === id ? { ...habit, ...updatedTask }: habit))
            return { 
                success: true, 
                data: updatedTask,
                message: 'Tarea actualizada correctamente' 
            };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al actualizar tarea';
            setError(message);
            console.error('Error al actualizar tarea:', err);
            return { success: false, error: message };
        }
    }, [])


    const handleEdit = useCallback(async (id: string, updateData: UpdateTaskData) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updateData)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            const updatedTask = await res.json();
            setTasks(prev => prev.map(task => 
                task.id === id ? { ...task, ...updatedTask} : task
            ))
             return { 
                success: true, 
                data: updatedTask,
                message: 'Tarea actualizada correctamente' 
            };
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Error al actualizar tarea';
            setError(message);
            console.error('Error al actualizar tarea:', err);
            return { success: false, error: message };
        }
    }, [])


    useEffect(() =>  {
        fetchTasks()
    }, [fetchTasks]);
    

    return {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        toggleCompletion,
        handleEdit,
        handleDelete
    }
}