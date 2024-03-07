const generateJWT = require('../../utils/generate-jwt');
const {expect} = require('chai');
const jwt = require('jsonwebtoken');
require('dotenv-flow').config();

describe('test generate-jwt', () => {
  it('should generate a token with correct payload and expiration time', async () => {
    let payload = { foo: 'bar' };
    const token = await generateJWT(payload);

    expect(token).to.exist;
    expect(token).to.be.a('string');
    expect(token).to.have.length.greaterThan(0);

    payload = jwt.verify(token, process.env.JWT_SECRET);

    expect(payload.foo).to.equal('bar');

    expect(payload.exp).to.be.a('number');
    expect(payload.exp - (Date.now() / 1000)).to.be.closeTo(24 * 60 * 60, 5);
  });
});
