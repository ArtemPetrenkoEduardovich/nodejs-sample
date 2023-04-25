import Group from 'src/model/group';
import { GroupSaveDto } from 'src/dto/group/groupSaveDto';
import { GroupDto } from 'src/dto/group/groupDto';

export const listGroups = (): Promise<GroupDto[]> => {
	return Group.find({});
}

export const saveGroup = ({
	name,
	startYear,
}: GroupSaveDto) => {
	return new Group({
		name,
		startYear,
	}).save();
}
