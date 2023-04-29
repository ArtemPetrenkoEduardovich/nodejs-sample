import Group from 'src/model/group';
import { GroupSaveDto } from 'src/dto/group/groupSaveDto';
import { GroupDto } from 'src/dto/group/groupDto';

export const listGroups = (): Promise<GroupDto[]> => {
	return Group.find({});
}

export const saveGroup = async ({
	name,
	startYear,
}: GroupSaveDto): Promise<string> => {
	const group = await new Group({
		name,
		startYear,
	}).save();
	return group._id;
}
