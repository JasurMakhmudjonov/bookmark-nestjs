import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Javascript Basics' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  title: string;

  @ApiProperty({ example: 'Its a great way to show sample data' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: '3cebe267-b62c-4dea-b9ba-cbfd4f481e43' })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  userId: string;
}
