//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { describe, it } = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('./../index');

chai.use(chaiHttp);
describe('smoke test', function() {
	it('checks equality', function() {
		expect(true).to.be.true;
	});
});

describe('Launching App', () => {
	it('Should display Welcome Node Server Message', (done) => {
		chai.request(app).get('/').end((err, res) => {
			expect(res.status).eql(200);
			expect(res.body).to.be.an('object');
			// return console.log(res.body.data);
			// expect(res.body.data).to.eql('Welcome to sendIT-backend');
			done();
		});
	});

	it('Should display - This route is unavailable on this serve for GET method', (done) => {
		chai.request(app).get('/hjhjh').end((err, res) => {
			expect(res.status).eql(404);
			expect(res.body).to.be.an('object');
			// expect(res.body.error).to.eql('This route is unavailable on this server');
			done();
		});
	});

	it('Should display - This route is unavailable on this serve for POST method', (done) => {
		chai.request(app).post('/hjhjh').end((err, res) => {
			expect(res.status).eql(404);
			expect(res.body).to.be.an('object');
			// expect(res.body.error).to.eql('This route is unavailable on this server');
			done();
		});
	});
});
