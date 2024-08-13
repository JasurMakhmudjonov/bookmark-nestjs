import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly users: UsersService,
    private readonly prisma: PrismaService,
  ) {}
  async login({ email, password }: LoginDto) {
    const user = await this.users.findByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException();

    const token = await this.jwt.signAsync({ id: user.id });

    return { token: token };
  }

  async register({ fullname, email, password, profileImage }: RegisterDto) {
    const existingUser = await this.prisma.users.findUnique({where: {email}});
    if (existingUser) throw new UnauthorizedException('Email already taken');

    const hashedPassword = await hash(password, 10);
    const newUser = await this.prisma.users.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        profileImage,
      },
    });

    const token = this.jwt.sign({id: newUser.id})

    return { message: 'User registered successfully', data: newUser, token };
  }
}
