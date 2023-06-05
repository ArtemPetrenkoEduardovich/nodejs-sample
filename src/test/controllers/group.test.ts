import bodyParser from 'body-parser';
import express from 'express';
import sinon from 'sinon';
import chai from 'chai';
import chaiHttp from 'chai-http';
import routers from 'src/routers/groups';
import Group from 'src/model/group';
import { ObjectId } from 'mongodb';

const { expect } = chai;

chai.use(chaiHttp);
chai.should();

const sandbox = sinon.createSandbox();

const app = express();

app.use(bodyParser.json({ limit: '1mb' }));
app.use('/', routers);

describe('Group controller', () => {

  afterEach(() => {
    sandbox.restore();
  });

  it('should list the groups', (done) => {
    const groups = [
      {
        _id: new ObjectId().toString(),
        name: "Group 1",
        startYear: 1,
      },
      {
        _id: new ObjectId().toString(),
        name: "Group 2",
        startYear: 2,
      },
    ];

    const findOneStub = sandbox.stub(
      Group,
      'find',
    );
    findOneStub.resolves(groups);

    chai.request(app)
      .get('')
      .end((_, res) => {
        res.should.have.status(200);
        expect(res.body).to.deep.equal(groups);

        done();
      });
  },
  );

  it('should save the group', (done) => {
    const groupIdAfterSave = new ObjectId();
    const group = {
      name: "Group to save",
      startYear: 3,
    };

    const saveOneStub = sandbox.stub(
      Group.prototype,
      'save',
    );
    saveOneStub.resolves({
      ...group,
      _id: groupIdAfterSave,
    });

    chai.request(app)
      .post('')
      .send({ body: { ...group } })
      .end((_, res) => {
        res.should.have.status(201);
        expect(res.body.id).to.equal(groupIdAfterSave.toString());

        done();
      });
  },
  );
});
