import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false})
  title!: string;

  @Column({ nullable: false})
  description!: string;

  @Column({ nullable: false, enum: TaskStatus, default: TaskStatus.PENDING })
  status!: TaskStatus;

  @Column({ nullable: false, default: new Date() })
  createdAt!: Date;
}
