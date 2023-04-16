import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'my_secret_key', // replace with your own secret key
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService, 
    UsersService,
    JwtStrategy],
  exports: [AuthService],
  controllers : [
    AuthController
  ]
})
export class AuthModule {}
