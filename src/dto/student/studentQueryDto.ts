import { QueryDto } from 'src/dto/queryDto';

export class StudentQueryDto extends QueryDto {

  name?: string;
  surname?: string;
  groupId?: string;

  constructor(data?: any) {
    super();
    Object.assign(this, data);
  }
}
