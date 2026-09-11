import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: false, unique: true })
  email!: string;

  @Exclude()
  @Column({ nullable: false })
  password!: string;

  @UpdateDateColumn()
  updateDate!: Date;

  @CreateDateColumn()
  createDate!: Date;
}
