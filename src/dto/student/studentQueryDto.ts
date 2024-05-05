import { QueryDto } from 'src/dto/queryDto';

export class StudentQueryDto extends QueryDto {
  name?: string;
  surname?: string;
  groupId?: string;

  constructor(query?: Partial<StudentQueryDto>) {
    super();
    if (query) {
      this.name = query.name;
      this.surname = query.surname;
      this.groupId = query.groupId;
      this.skip = query.skip || 0;
      this.limit = query.limit || 10;
    }
  }
}
