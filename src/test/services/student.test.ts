import chai from 'chai';
import sinon from 'sinon';
import { ObjectId } from 'mongodb';
import mongoSetup from '../mongoSetup';
import Student from 'src/model/student';
import Group from 'src/model/group';
import { StudentSaveDto } from 'src/dto/student/studentSaveDto';
import { StudentQueryDto } from 'src/dto/student/studentQueryDto';
import * as studentService from 'src/services/student';

const { expect } = chai;

const sandbox = sinon.createSandbox();

const group1 = new Group({
  _id: new ObjectId(),
  name: 'Group 1',
  startYear: 1,
});

const student1 = new Student({
  _id: new ObjectId(),
  name: 'John',
  surname: 'Doe',
  groupId: group1._id.toString(),
  birthDate: new Date('1999-06-06'),
  phoneNumbers: ['+380667890011'],
  address: {
    country: 'UA',
    town: 'New York',
    addressString: 'Some address string',
  },
});

const group2 = new Group({
  _id: new ObjectId(),
  name: 'Group 2',
  startYear: 2,
});

const student1OfGroup2 = new Student({
  name: 'Benjamin',
  surname: 'Brown',
  groupId: group2._id.toString(),
  birthDate: new Date('1988-03-01'),
});

const student2OfGroup2 = new Student({
  name: 'Emily',
  surname: 'Thompson',
  groupId: group2._id.toString(),
  birthDate: new Date('1993-05-08'),
});

const studentForSearch = new Student({
  _id: new ObjectId().toString(),
  name: 'Test Name 1',
  surname: 'Test Surname 1',
  groupId: new ObjectId().toString(),
  birthDate: new Date('1991-01-01'),
});

describe('Student Service', () => {
  before(async () => {
    /**
		 * The mongoSetup promise is resolved when the database is ready to be used.
		 * After it is resolved we can save all the needed data.
		 */
    await mongoSetup;

    await group1.save();
    await group2.save();
    await student1.save();
    await student1OfGroup2.save();
    await student2OfGroup2.save();
    await studentForSearch.save();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('createStudent should create a new student and return its id', (done) => {
    const studentDto: StudentSaveDto = {
      name: 'John',
      surname: 'Doe',
      birthDate: new Date('2000-01-01'),
      groupId: group1._id.toString(),
    };
    studentService.createStudent(studentDto)
      .then(async (id) => {
        const student = await Student.findById(id);

        expect(student).to.exist;
        expect(student?.name).to.equal(studentDto.name);
        expect(student?.surname).to.equal(studentDto.surname);
        expect(student?.birthDate).to.eql(studentDto.birthDate);
        expect(student?.groupId).to.eql(studentDto.groupId);

        done();
      })
      .catch((error: Error) => done(error));
  });

  it('getStudent should return null if student not found', (done) => {
    const nonExistentId = new ObjectId().toString();
    studentService.getStudent(nonExistentId)
      .then((student) => {
        expect(student).to.be.null;
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('getStudent should return student details if found', (done) => {
    studentService.getStudent(student1._id)
      .then((studentDetails) => {
        expect(studentDetails).to.have.property('name', student1.name);
        expect(studentDetails).to.have.property('surname', student1.surname);
        expect(studentDetails).to.have.property('groupId', student1.groupId);
        expect(studentDetails).to.have.property('birthDate').that.eql(student1.birthDate);
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('updateStudent should update a student', (done) => {
    const validateStudentStub = sandbox.stub(studentService, 'validateStudent');
    const findOneAndUpdateStub = sandbox.stub(Student, 'findOneAndUpdate');
    studentService.updateStudent(student1._id, student1)
      .then(() => {
        sandbox.assert.calledOnce(validateStudentStub);
        sandbox.assert.calledOnce(findOneAndUpdateStub);
        const validationArgs = validateStudentStub.getCall(0).args;
        expect(validationArgs[0]).to.eql(student1);
        const findArgs = findOneAndUpdateStub.getCall(0).args;
        expect(findArgs[0]).to.eql({
          _id: student1._id,
        });
        expect(findArgs[1]).to.eql({
          $set: {
            ...student1,
          },
        });
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('listStudentsByGroupId should provide a list of students by groupId', (done) => {
    const savedStudents = [student1OfGroup2, student2OfGroup2];
    studentService.listStudentsByGroupId(group2._id.toString())
      .then((students) => {
        expect(students.length).to.equal(2);
        expect(students.map(std => std._id.toString())).to
          .eql(savedStudents.map(std => std._id.toString()));
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('search should find a student by name', (done) => {
    const query: StudentQueryDto = new StudentQueryDto();
    query.name = studentForSearch.name;
    studentService.search(query)
      .then((students) => {
        expect(students.length).to.equal(1);
        expect(students[0]._id).to.eql(studentForSearch._id);
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('search should find a student by surname', (done) => {
    const query: StudentQueryDto = new StudentQueryDto();
    query.surname = studentForSearch.surname;
    studentService.search(query)
      .then((students) => {
        expect(students.length).to.equal(1);
        expect(students[0]._id).to.eql(studentForSearch._id);
        done();
      })
      .catch((error: Error) => done(error));
  });

  it('search should find a student by groupId', (done) => {
    const query: StudentQueryDto = new StudentQueryDto();
    query.groupId = studentForSearch.groupId;
    studentService.search(query)
      .then((students) => {
        expect(students.length).to.equal(1);
        expect(students[0]._id).to.eql(studentForSearch._id);
        done();
      })
      .catch((error: Error) => done(error));
  });
});
