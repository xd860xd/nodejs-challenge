import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatus } from '../enum/task-status.enum';

@Injectable()
export class GetTasksFilterPipe implements PipeTransform {
  transform(filterDto: GetTasksFilterDto) {
    const { status, search } = filterDto;

    if (status && !this.isStatusValid(status)) {
      throw new BadRequestException(`"${status}" is an invalid status`);
    }

    return filterDto;
  }

  private isStatusValid(status: any) {
    return Object.values(TaskStatus).includes(status);
  }
}
