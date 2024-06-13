import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';


@Module({
  imports:[ MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    secret: process.env.JWT_SECRET || "my-secret-key",
    signOptions: { expiresIn: '1h' },
  }),
],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
