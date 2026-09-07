import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../entities/task.entity";

export class GetTaskQueryDto{
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus

    @IsOptional()
    @IsString()
    search?:string
}