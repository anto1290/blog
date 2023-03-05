import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }
  findById(id: string) {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, attrs: UpdateUserDto) {
    const user = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: string) {
    const { ...user } = await this.repo.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    user.deleted_at = new Date();
    return this.repo.save(user);
  }
}
