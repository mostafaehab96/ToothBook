const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const fs = require('fs');



describe('UserController', () => {
  it('POST /api/users/register should create a user', async () => {
    const res = await chai
      .request(app)
      .post('/api/users/register/')
      .field('name', 'test user')
      .field('email', 'user@email.com')
      .field('password', 'test_password')
      .field('role', 'User')
      .field('university', 'University of Users')
      .attach('photo', fs.readFileSync('utils/admin.png'), 'admin.png');
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.data).to.have.property('token');
    const token = res.body.data.token;
    expect(token).to.be.a('string');
    expect(token).to.have.length.greaterThan(0);
  });

  it('GET /api/users should return all users', async () => {
    const res = await chai.request(app).get('/api/users');
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal('success');
    const { data } = res.body;
    expect(data.users).to.be.an('array');
    expect(data.users.length).to.be.greaterThan(-1);
  });

  it('POST /api/users/login should login a user', async () => {
    const res = await chai.request(app).post('/api/users/login/').send({
      email: 'user@email.com',
      password: 'test_password',
    });
    expect(res.statusCode).to.equal(200);
    expect(res.body.status).to.equal('success');
    expect(res.body.data).to.have.property('token');
    const token = res.body.data.token;
    expect(token).to.be.a('string');
    expect(token).to.have.length.greaterThan(0);
  });
});
