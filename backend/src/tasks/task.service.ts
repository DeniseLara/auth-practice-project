import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "./entities/task.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>
    ) {}

    async getAllTasks(userId: string): Promise<Task[]>{
        const habits = await this.taskRepository.find({
            where: { userId: userId }
        })
        return habits.map(habit => this.formatTask(habit))
    }

    async createTask(body: CreateTaskDto, userId: string): Promise<Task> {
        const newTask = await this.taskRepository.create({
            title: body.title,
            description: body.description,
            completed: body.completed || false,
            userId: userId
        })

        const savedTask = await this.taskRepository.save(newTask)
        return this.formatTask(savedTask)
    }

    async updateTask(id: string, completed: boolean, userId: string): Promise<Task> {
        const task = await this.taskRepository.findOne({
            where: { id, userId }
        });

        if (!task) {
            throw new NotFoundException('tarea no encontrada')
        }

        task.completed = completed


        const updatedTask = await this.taskRepository.save(task)

        return this.formatTask(updatedTask)
    }

    async removeTask(id: string, userId: string) {
        await this.taskRepository.delete({
            id: id,
            userId: userId
        })

    }

    // Formatea el hábito para el frontend
    private formatTask(task: Task): any {
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            userId: task.userId,
            // Fecha en formato ISO 
            createdAt: task.createdAt.toISOString(),
            // Fecha formateada para mostrar 
            createdAtFormatted: this.formatDate(task.createdAt)
        };
    }

    // Formatea la fecha asi: dd/mm/aaaa
    private formatDate(date: Date): string {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
}