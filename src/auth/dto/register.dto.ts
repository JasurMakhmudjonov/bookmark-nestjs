import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  fullname: string;

  @ApiProperty({ example: 'jasmax05@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(32)
  @IsString()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'image.png ' })
  @IsString()
  @IsNotEmpty()
  profileImage: string;
}
