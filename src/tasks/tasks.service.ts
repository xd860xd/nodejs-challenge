import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(userId): Promise<Task[]> {

    return this.tasksRepository.find({
      where : {
        user : {
          id : userId
        }
      }
    });
  }

  async findOne(id: number, userId : number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where : {
        id
      },
      relations : {
        user : true
      }
    });
    if(task === null || (task.user.id != userId)){
      throw new NotFoundException(`The user doesn't have a task with id ${id}`)
    }
    return task

  }

  async create(createTaskDto: CreateTaskDto, user:  User): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.status = createTaskDto.status;
    task.dueDate = createTaskDto.dueDate;
    task.comments = createTaskDto.comments;
    task.tags = createTaskDto.tags;
    task.user = user;
    return this.tasksRepository.save(task);
  }

  async update(id: number, task: UpdateTaskDto): Promise<Task> {
    const taskToUpdate = await this.tasksRepository.findOneBy({ id });    

    const taskUpdated = {...taskToUpdate, ...task}

    return this.tasksRepository.save(taskUpdated);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
