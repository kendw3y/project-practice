import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task, TaskStatus } from './entities/task.entity';
import { GetTaskQueryDto } from './dto/get-task-query.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAll(query: GetTaskQueryDto) {
    let result = [...this.tasks]
    if(query.status){
      result = this.tasks.filter((v) => v.status === query.status);
    }
    if(query.search){
      const searchMatch = query.search.toLowerCase()
      result = result.filter((task)=>{

        const titleMatch = task.title.toLowerCase().includes(searchMatch)
        const descriptionMatch = task.description.toLowerCase().includes(searchMatch)

        return titleMatch || descriptionMatch
      })
    }
    return result
  }

  findOne(id: string) {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(task: CreateTaskDto) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: task.title,
      description: task.description,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    this.tasks.splice(taskIndex, 1);
    return 'Task deleted successfully';
  }

  updateTask(id: string, task: UpdateTaskDto) {
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
