import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Titulo 1',
      description: 'Este es el primer titulo de todos',
    },
  ];

  getAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(task: CreateTaskDto) {
    const newTask = {
      id: this.tasks.length + 1,
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return 'Task deleted successfully';
  }

  updateTask(id: number, task: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...task,
    };
    return 'Task updated successfully';
  }
}
