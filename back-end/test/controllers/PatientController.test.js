const app = require('../../app');
const Patient = require('../../models/patient-model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);
const fs = require('fs');

describe('Test PatientController', () => {
  describe('Test unprotected routes', () => {
    describe('GET /api/patients', () => {
      it('should return all patients', (done) => {
        chai
          .request(app)
          .get('/api/patients')
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal('success');
            const { data } = response.body;
            expect(data.patients).to.be.an('array');
            expect(data.patients.length).to.be.greaterThan(-1);
            expect(data.totalCount).to.be.a('number');
            expect(data.totalCount).to.be.be.greaterThan(-1);
            done();
          });
      });
    });
    describe('GET /patients/:id', () => {
      it('should return a patient by id', async () => {
        const testPatient = await Patient.findOne();
        const res = await chai
          .request(app)
          .get(`/api/patients/${testPatient._id.toString()}`);
        expect(res.status).to.equal(200);
        expect(res.body.status).to.equal('success');
        expect(res.body.data.patient._id.toString()).to.equal(
          testPatient._id.toString()
        );
        expect(res.body.data.patient.name).to.equal('test patient');
      });
      it('should return 404 if patient not found', (done) => {
        chai
          .request(app)
          .get('/patients/nonexistent-id')
          .end((error, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('error');
            expect(res.body.message).to.equal('Resource not found error');
            done();
          });
      });
    });
  });

  describe('Test protected routes with an admin user', () => {
    let token;
    it('should create an admin user', async () => {
      const res = await chai
        .request(app)
        .post('/api/users/register/')
        .field('name', 'admin')
        .field('email', 'admin@email.com')
        .field('password', 'admin')
        .field('role', 'Admin')
        .field('university', 'University of Admins')
        .attach('photo', fs.readFileSync('utils/admin.png'), 'admin.png');

      expect(res.statusCode).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.have.property('token');
      token = res.body.data.token;
      expect(token).to.be.a('string');
      expect(token).to.have.length.greaterThan(0);
    });

    it.skip('POST /api/patients should create a new patient', (done) => {
      chai
        .request(app)
        .post('/api/patients')
        .field('name', 'Test Patient')
        .field('age', 20)
        .field('sex', 'male')
        .field('address', 'Zagazig City')
        .field('phoneNumber', '0123456789')
        .field('diagnosis', 'Test Diagnosis')
        .field('status', 'pending')
        .attach('photos', fs.readFileSync('utils/patient.jpg'), 'patient.jpg')
        .auth(token, { type: 'bearer' })
        .end((error, response) => {
          if (error) {
            console.log('error', error);
          }
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property('patient');
          done();
        });
    });

    it('POST /api/patients should return 400 if validation fails', (done) => {
      chai
        .request(app)
        .post('/api/patients')
        .send({})
        .auth(token, { type: 'bearer' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body.status).to.equal('error');
          done();
        });
    });

    it('PATCH /api/patients/:id should update a patient by id', async () => {
      const testPatient = await Patient.findOne();
      const res = await chai
        .request(app)
        .patch(`/api/patients/${testPatient._id.toString()}`)
        .send({
          name: 'New Name',
        });
      expect(res.status).to.equal(200);
      expect(res.body.status).to.be.equal('success');
      expect(res.body.data.acknowledged).to.be.true;
      expect(res.body.data.modifiedCount).to.be.equal(1);
      expect(res.body.data.matchedCount).to.be.equal(1);
    });

    it('PATCH /api/patients/:id should return 404 if patient not found', (done) => {
      chai
        .request(app)
        .patch('/patients/nonexistent-id')
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Resource not found error');
          done();
        });
    });

    it('DELETE /api/patients/:id should delete a patient by id', async () => {
      const testPatient = await Patient.findOne();
      const res = await chai
        .request(app)
        .delete(`/api/patients/${testPatient._id.toString()}`);
      expect(res.status).to.equal(200);
      expect(res.body.status).to.equal('success');
      expect(res.body.data).to.equal(null);
    });
  });
});
