import mongoose from 'mongoose';
import Group from 'src/model/group';
import Student, { IStudent } from 'src/model/student';
import { StudentSaveDto } from 'src/dto/student/studentSaveDto';
import { StudentDetailsDto } from 'src/dto/student/studentDetailsDto';
import { StudentInfoDto } from 'src/dto/student/studentInfoDto';
import { StudentQueryDto } from 'src/dto/student/studentQueryDto';

export const createStudent = async (
  studentDto: StudentSaveDto
): Promise<string> => {
  await validateStudent(studentDto);
  const student = await new Student(studentDto).save();
  return student._id;
};

export const getStudent = async (
  id: string
): Promise<StudentDetailsDto | null> => {
  const student = await Student.findById(id);
  return student ? toDetailsDto(student) : null;
};

const toDetailsDto = (student: IStudent): StudentDetailsDto => {
  return ({
    name: student.name,
    surname: student.surname,
    groupId: student.groupId,
    birthDate: student.birthDate,
    phoneNumbers: [...(student.phoneNumbers || [])],
    address: student.address,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
  });
};

export const updateStudent = async (
  id: string,
  studentDto: StudentSaveDto,
): Promise<void> => {
  await validateStudent(studentDto);
  await Student.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...studentDto,
      },
    }
  );
};

export const listStudentsByGroupId = async (
  groupId: string
): Promise<StudentInfoDto[]> => {
  const students = await Student.find({
    groupId,
  });

  return students.map(student => toInfoDto(student));
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

  return students.map(student => toInfoDto(student));
};

const toInfoDto = (student: IStudent): StudentInfoDto => {
  return ({
    _id: student._id,
    fullName: `${student.name} ${student.surname}`,
    groupId: student.groupId,
  });
};

export const validateStudent = async (studentDto: StudentSaveDto) => {
  const id = studentDto.groupId;
  if (id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error(`Group with id ${id} doesn't exist`);
    }
    const isGroupExists = await Group.exists({
      _id: id,
    });
    if (!isGroupExists) {
      throw new Error(`Group with id ${id} doesn't exist`);
    }
  }
  if (!!studentDto.birthDate
		&& studentDto.birthDate.getTime() >= new Date().getTime()) {
    throw new Error("birthDate should be before this moment");
  }
};


