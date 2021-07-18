import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { comparePasswords } from '../shared/utils';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const { password, email, firstName, lastName } = createUserDto;

    const userInDb = await this.userRepo.findOne({
      where: { email },
    });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.userRepo.create({
      firstName,
      lastName,
      password,
      email,
    });

    await this.userRepo.save(user);

    return this.toUserDto(user);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(options?: Record<string, unknown>): Promise<UserDto> {
    const user = await this.userRepo.findOne(options);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    return this.toUserDto(user);
  }

  async findByLogin({ email, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await comparePasswords(user.password, password);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return this.toUserDto(user);
  }

  async findByPayload({ email }: any): Promise<UserDto> {
    return await this.findOne({
      where: { email },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private toUserDto(data: User): UserDto {
    const { id, email, firstName, lastName } = data;
    const userDto: UserDto = { id, email, firstName, lastName };
    return userDto;
  }
}
