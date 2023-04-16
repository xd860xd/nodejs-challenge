import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';
import { Transform } from 'class-transformer';

export class CreateTaskDto {

  @ApiProperty({
    description: 'Title of the task',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the task',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Status of the task',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    type: String,
  })
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'Due date of the task',
    type: Date,
  })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dueDate: Date;

  @ApiProperty({
    description: 'Comments on the task',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({
    description: 'Tags for the task',
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray()
  tags?: string[];
}
