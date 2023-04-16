import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
  @ApiProperty({
    description: 'Search for tasks with a matching title or description',
    example: 'task',
  })
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @ApiProperty({
    description: 'Filter tasks by completion status',
    example: true,
  })
  @IsOptional()
  status: boolean;
}
