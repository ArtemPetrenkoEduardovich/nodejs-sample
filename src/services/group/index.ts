import Group from '../../model/group';

export const listGroups = () => {
	return Group.find({});
}

export const createGroup = ({
	name,
	startYear,
}) => {
	return new Group({
		name,
		startYear,
	}).save();
}
