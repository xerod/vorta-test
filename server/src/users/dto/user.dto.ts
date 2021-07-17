import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty() id: number;
  @IsNotEmpty() lastName: string;
  @IsNotEmpty() firstName: string;
  @IsNotEmpty() @IsEmail() email: string;
}
