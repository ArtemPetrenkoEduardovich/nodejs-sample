import Group, { IGroup } from 'src/model/group';
import { GroupSaveDto } from 'src/dto/group/groupSaveDto';
import { GroupDto } from 'src/dto/group/groupDto';

export const listGroups = async (): Promise<GroupDto[]> => {
  const groups = await Group.find({});
  return groups.map(group => toGroupDto(group));
};

export const saveGroup = async ({
  name,
  startYear,
}: GroupSaveDto): Promise<string> => {
  const group = await new Group({
    name,
    startYear,
  }).save();

  return group._id;
};

const toGroupDto = (group: IGroup): GroupDto => {
  return ({
    _id: group._id,
    name: group.name,
    startYear: group.startYear,
  });
};
