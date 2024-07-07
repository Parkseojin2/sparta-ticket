import { compare, hash } from 'bcrypt';
import _, { has } from 'lodash';
import { Repository } from 'typeorm';

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Role } from './types/userRole.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, imageUrl?: string) {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }

    const hashedPassword = await hash(password, 10);
    const role = Role.User
    
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
      imageUrl,
      role,
      points: role === Role.User ? 1000000 : 0,
    });

    await this.userRepository.save(newUser);
    return { message: '회원가입이 완료되었습니다.'}
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      select: ['id', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, sub: user.id };
    return { message: '로그인 되었습니다.',
      access_token: this.jwtService.sign(payload),
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getProfile(userId: number){
    const user = await this.userRepository.findOne({
      select:['id', 'email','imageUrl', 'role', 'points'],
      where: {id: userId}
    });
    if(!user){
      throw new NotFoundException('사용자를 찾을 수 없습니다.')
    }
    return user;
  }
}