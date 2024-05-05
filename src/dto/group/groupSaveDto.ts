export class GroupSaveDto {
  name?: string;
  startYear?: number;

  constructor(data: Partial<GroupSaveDto>) {
    this.name = data.name;
    this.startYear = data.startYear;
  }
}