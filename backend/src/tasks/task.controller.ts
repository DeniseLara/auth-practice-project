import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AuthGuard } from "src/auth/auth.guard";
import type { RequestWithUser } from "./request-with-user.interface";

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    getAll(@Request() req: RequestWithUser) {
        return this.taskService.getAllTasks(req.user.userId);
    }

    @Post()
    create(
        @Body() body: CreateTaskDto,
        @Request() req: RequestWithUser
    ) {
        return this.taskService.createTask(body, req.user.userId)
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() body: { completed: boolean }, 
        @Request() req: RequestWithUser
    ) {
        return this.taskService.updateTask(id, body.completed, req.user.userId)
    }

    @Delete(':id')
    remove(
        @Param('id') id: string,
        @Request() req: RequestWithUser
    ) {
        return this.taskService.removeTask(id, req.user.userId)
    }
}