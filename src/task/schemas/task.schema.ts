import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TaskStatus } from '../entities/task.entity';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, minLength: 5 })
  title!: string;

  @Prop({ required: true, minLength: 10 })
  description!:string

  @Prop({required:false,default:'pending'})
  status!: TaskStatus;

  @Prop({isRequired:false,default:new Date})
  createdAt!: Date;

}
export const TaskSchema = SchemaFactory.createForClass(Task)