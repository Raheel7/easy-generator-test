import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(email: string, name: string, password: string): Promise<{ access_token: string }> {

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({ email, name, password: hashedPassword });
      const user = await newUser.save();
      const payload = { sub: user.id, email: user.email };
      return { access_token: this.jwtService.sign(payload) };
    } catch (error) {
      if (error.code === 11000) { 
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException('An error occurred during sign up');
    }
  }

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
