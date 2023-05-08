import mongoose from 'mongoose';
import { StudentSaveDto } from 'src/dto/student/studentSaveDto';
import { StudentDetailsDto } from 'src/dto/student/studentDetailsDto';
import { StudentInfoDto } from 'src/dto/student/studentInfoDto';
import { StudentQueryDto } from 'src/dto/student/studentQueryDto';
import Student, { IStudent } from 'src/model/student';
import Group from 'src/model/group';

export const createStudent = async (
  studentDto: StudentSaveDto
): Promise<string> => {
  await validateStudent(studentDto);
  const student = await new Student(studentDto).save();
  return student._id;
};

export const getStudent = (id: string): Promise<StudentDetailsDto | null> => {
  return Student.findById(id);
};

export const updateStudent = async (
  id: string,
  studentDto: StudentSaveDto,
) => {
  await validateStudent(studentDto);
  Student.findOneAndUpdate(
    {
      _id: id,
    },
    {
      ...studentDto,
    }
  );
};

export const listStudentsByGroupId = async (
  groupId: string
): Promise<StudentInfoDto[]> => {
  const students = await Student.find({
    groupId,
  });

  return toInfoDto(students);
};

export const search = async (
  query: StudentQueryDto
): Promise<StudentInfoDto[]> => {
  const {
    name,
    surname,
    groupId,
  } = query;
  const students = await Student
    .find({
      ...(name && { name }),
      ...(surname && { surname }),
      ...(groupId && { groupId }),
    })
    .skip(query.skip)
    .limit(query.limit);

  return toInfoDto(students);
};

const toInfoDto = (students: IStudent[]): StudentInfoDto[] => {
  return students.map(student => ({
    _id: student._id,
    fullName: `${student.name} ${student.surname}`,
    groupId: student.groupId,
  }));
};

export const validateStudent = async (studentDto: StudentSaveDto) => {
  const id = studentDto.groupId;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error(`Group with id ${id} doesn't exist`);
  }
  const isGroupExists = await Group.exists({
    _id: id,
  });
  if (!isGroupExists) {
    throw new Error(`Group with id ${id} doesn't exist`);
  }
  if (!!studentDto.birthDate
		&& studentDto.birthDate.getTime() >= new Date().getTime()) {
    throw new Error("birthDate should be before this moment");
  }
};


