import { Body, Controller, Get, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(){
    return this.taskService.getAll()
  }

  @Post()
  createTask(@Body() newTask:CreateTaskDto ){
    const taskAdd=this.taskService.createTask(newTask)
    return "Se creo correctamente la tarea."
  }

}
