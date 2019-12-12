const { describe, it } = require('mocha');
const { chai, expect } = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../index');

chai.use(chaiHttp);

describe('App', () => {
	it('Should display Welcome node server Message', (done) => {
		chai.request(app).get('/api/v1').end((err, res) => {
			expect(res.status).eql(200);
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.eql('success');
			expect(res.body.data).to.eql('Welcome to sendIT-backend');
			done();
		});
	});

	it('Should display - This route is unavailable on this serve for GET method', (done) => {
		chai.request(app).get('/api/v1/hjhjh').end((err, res) => {
			expect(res.status).eql(404);
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.eql('error');
			expect(res.body.error).to.eql('This route is unavailable on this server');
			done();
		});
	});

	it('Should display - This route is unavailable on this serve for POST method', (done) => {
		chai.request(app).post('/api/v1/hjhjh').end((err, res) => {
			expect(res.status).eql(404);
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.eql('error');
			expect(res.body.error).to.eql('This route is unavailable on this server');
			done();
		});
	});
});
