import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    
    const user = await this.userRepository.findOneBy({email});

    return user
  }

  async createUser(email: string, password: string): Promise<User> {

    const userExisting = await this.userRepository.findOne({ where :{
      email
    } });

    if (userExisting !== null){
      throw new BadRequestException("User with this email already exists")
    }

    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    return this.userRepository.save(newUser);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

}
