import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskQueryDto } from './dto/get-task-query.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  private tasks: Task[] = [];

  async getAll(query: GetTaskQueryDto) {
    const qb = this.taskRepository.createQueryBuilder('task');
    if (query.status) {
      qb.andWhere('task.status = :status', { status: query.status });
    }
    if (query.search) {
      const searchTerm = query.search.trim();
      qb.andWhere('task.title LIKE :search OR task.description LIKE :search', {
        search: `%${searchTerm}%`,
      });
    }
    const [result, total] = await qb.getManyAndCount();
    return {
      result,
      total,
    };
  }
  async findOneTask(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Not found task by id ${id}`);
    }
    return task;
  }
  async createTask(createTaskDto: CreateTaskDto) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      status: TaskStatus.PENDING,
    });
    return this.taskRepository.save(newTask);
  }
  async updateTask(id: number, taskUpdated: UpdateTaskDto): Promise<Task> {
    const task = await this.findOneTask(id);
    const updatedTask = Object.assign(task, taskUpdated);

    return await this.taskRepository.save(updatedTask);
  }
  async removeTask(id: number) {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Not found task by id ${id}`);
    return 'Task successfully removed. ';
  }
}
