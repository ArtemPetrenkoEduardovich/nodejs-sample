import Student from 'src/model/student';
import { StudentSaveDto } from 'src/dto/student/studentSaveDto';
import { StudentDetailsDto } from 'src/dto/student/studentDetailsDto';
import { StudentInfoDto } from 'src/dto/student/studentInfoDto';

export const createStudent = async (
	studentDto: StudentSaveDto
): Promise<string> => {
	validateStudent(studentDto);
	const student = await new Student(studentDto).save();
	return student._id;
}

export const getStudent = (id: string): Promise<StudentDetailsDto | null> => {
	return Student.findById(id);
}

export const updateStudent = async (
	id: string,
	studentDto: StudentSaveDto,
) => {
	await Student.findOneAndUpdate(
		{
			_id: id,
		},
		{
			...studentDto,
		}
	);
}

export const listStudentsByGroupId = async (
	groupId: string
): Promise<StudentInfoDto[]> => {
	const students = await Student.find({
		groupId,
	});
	return students.map(student => ({
		_id: student._id,
		fullName: `${student.name} ${student.surname}`,
		groupId,
	}));
}

const validateStudent = (studentDto: StudentSaveDto) => {
	if (!!studentDto.birthDate
		&& studentDto.birthDate.getTime() >= new Date().getTime()) {
		throw new Error("birthDate should be before this moment");
	}
}


