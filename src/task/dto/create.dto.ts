import { Type } from 'class-transformer';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(5)
  title!: string;
  @IsString()
  @MinLength(10)
  description!: string;
  @IsBoolean()
  status!:boolean
  @IsString({groups:["alta","media","baja"]})
  priority!:string
  
}
