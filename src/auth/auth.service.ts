import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService
    ) {}

  async login(loginDto: LoginDto): Promise<string> {
    // check user credentials
    const user = await this.userService.findOneByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.generateToken(user);

    return token
  }

  async generateToken(user: User): Promise<string> {    
    const payload = { id: user.id, email : user.email };

    const token = this.jwtService.sign(payload);

    return token
  }

  async signup(createUserDto: CreateUserDto): Promise<User> {
    // hash password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    // create user
    const user = this.userService.createUser(
      createUserDto.email,
      hashedPassword,
    );
    return user
  }

}
