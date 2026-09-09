import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTaskQueryDto } from './dto/get-task-query.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async findAll(@Query() query:GetTaskQueryDto) {
    return this.taskService.getAll(query);
  }
  @Get(':id')
  async findById(@Param('id') id:number){
    return this.taskService.findOneTask(id)
  }
  @Post()
  createTask(@Body() newTask: CreateTaskDto) {
    return this.taskService.createTask(newTask);
  }
  @Patch(':id')
  updateTask(@Param('id') id:number,@Body() taskUpdated : UpdateTaskDto){
    return this.taskService.updateTask(id,taskUpdated)
  }
  @Delete(':id')
  deleteTask(@Param('id') id:number){
    return  this.taskService.removeTask(id)
  }
}
  
