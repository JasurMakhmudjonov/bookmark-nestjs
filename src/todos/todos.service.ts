import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ title, description, userId }: CreateTodoDto) {
    const existsUser = await this.prisma.users.findUnique({
      where: { id: userId },
    });
    if (!existsUser) {
      throw new BadRequestException('User not found');
    }
    const todo = await this.prisma.todos.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return todo;
  }

  async findAll() {
    const todos = await this.prisma.todos.findMany();
    if (todos.length > 0) {
      return todos;
    } else {
      throw new NotFoundException('No todos found');
    }
  }

  async findOne(id: string) {
    const todo = await this.prisma.todos.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: string, { title, description, userId }: UpdateTodoDto) {
    const existsUser = await this.prisma.users.findUnique({ where: { id: userId } });
    if (!existsUser) {
      throw new BadRequestException('User not found');
    }
    const updatedTodo = await this.prisma.todos.update({
      where: { id },
      data: {
        title,
        description,
        userId,
      },
    });
    return updatedTodo;
  }

  async remove(id: string) {
    await this.findOne(id); 
    await this.prisma.todos.delete({ where: { id } });
    return `Todo successfully removed`;
  }
}
