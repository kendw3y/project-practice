import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskQueryDto } from './dto/get-task-query.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll() {
    return this.taskService.getAll();
  }
  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask);
  }
}
  
