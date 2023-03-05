/* eslint-disable prettier/prettier */
import { Expose, Exclude } from 'class-transformer';
export class UserDto {
  @Expose()
  id: string;
  @Expose()
  username: string;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  created_at: Date;
  @Expose()
  updated_at: Date;
  @Expose()
  deleted_at: Date;
}
