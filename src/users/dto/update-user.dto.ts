import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe' })
  @IsOptional()
  @MaxLength(32)
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'jasmax05@gmail.com' })
  @IsEmail()
  @IsOptional()
  @MaxLength(32)
  @IsString()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ example: 'image.png ' })
  @IsString()
  @IsOptional()
  profileImage: string;
}
