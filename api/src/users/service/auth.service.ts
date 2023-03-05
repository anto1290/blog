/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
// Injectable decorator is used to mark a class as injectable.
@Injectable()
export class AuthService {
  // Dependency Injection
  constructor(private usersService: UsersService) {}
  async signUp({ username, email, password }) {
    // See if email is in use
    const users = await this.usersService.findByEmail(email);
    if (users.length) throw new BadRequestException('Email already in use');
    // Hash new users password
    // Generate a salt
    const salt = randomBytes(8).toString('hex');
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    // Create a new user and save it to the database
    const user = await this.usersService.create({username, email, password: result});
    // return the new user
    return user;
  }

  async signin(email: string, password: string){
        // See if email is in use
        const [users] = await this.usersService.findByEmail(email);
        if (!users) throw new NotFoundException('Email not found');
        // Get the user's salt and hash
        const [salt,storedHash] = users.password.split('.');
        // Hash the salt and the password together
        const hash = (await scrypt(password,salt,32)) as Buffer;
        // Compare the hashed result to the hash in the database
        if (storedHash !== hash.toString('hex')) throw new BadRequestException('Invalid password');
        // Return the user
        return users;
    
    }
}
