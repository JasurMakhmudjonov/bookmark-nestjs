import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { todo } from 'node:test';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.users.findMany({
      select: {
        id: true,
        fullname: true,
        email: true,
        profileImage: true,
        todos: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
    if (users.length > 0) {
      return users;
    } else {
      throw new UnauthorizedException('No users found');
    }
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({ where: { email } });
    if (!user) throw new BadRequestException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });

    return updatedUser;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.users.delete({ where: { id } });
    return `User successfully removed`;
  }
}
