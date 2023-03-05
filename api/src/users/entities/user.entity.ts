import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: Date, default: new Date() })
  created_at: Date;
  @Column({ type: Date, default: new Date() })
  updated_at: Date;
  @Column({ type: Date, nullable: true })
  deleted_at: Date;
}
