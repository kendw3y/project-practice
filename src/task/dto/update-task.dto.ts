import { IsEnum, IsOptional } from "class-validator";
import { CreateTaskDto } from "./create-task.dto";
import { PartialType } from "@nestjs/swagger";
import { TaskStatus } from "../entities/task.entity";

export class UpdateTaskDto extends PartialType(CreateTaskDto){
    @IsOptional()
    @IsEnum(TaskStatus)
    status?:TaskStatus
}