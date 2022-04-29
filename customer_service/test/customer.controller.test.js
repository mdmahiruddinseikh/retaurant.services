
const server = require('../server');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(require("chai-sorted"));
chai.use(chaiHttp);
// let token;
const env = process.env.ENV || 'development';

const req_body = {
    "full_name": "Mahiruddin sk",
    "email": "mahiruddinsk@gmail.com",
    "password": "123456",
    "mobile_no": "9749197240",
    "alternative_mobile_no": "7872188556",
    "address": [
        {
            "address": "deara",
            "city": "kolkata",
            "state": "W.B",
            "pin": "713409",
            "default": ""
        }
    ]
};

let customer_id;
let token;

describe('Customer Service Test Case', () => {
    it('it should create customer', () => {
        chai.request(server)
            .post(`/customers`)
            .send(req_body)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');

                // customer_id = res.body.data.id;

                // done();
            });
    });
    it('it should check customer login', () => {
        chai.request(server)
            .post(`/customers/login`)
            .send({
                "email": "mahiruddinsk@gmail.com",
                "password": "123456"
            })
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');

                token = res.body.token;
            });
    });
    it('it should get error while login with wrong credentials', () => {
        chai.request(server)
            .post(`/customers/login`)
            .send({
                "email": "mahiruddinsk@gmail.com",
                "password": "12345"
            })
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });

    it('it should GET specific customer by id', () => {
        chai.request(server)
            .get(`/customers/${customer_id}`)
            .set("token", token)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                (res.body.data).should.be.a('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });

    it('it should update customers data', () => {
        chai.request(server)
            .put(`/customers/${customer_id}`)
            .set("token", token)
            .send({
                "full_name": "mahiruddin sk",
                "mobile_no": "9749136691",
                "alternative_mobile_no": "9749197240"
            })
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
                // res.body.should.have.property('status').eql(200);
                // res.body.should.have.property('msg').eql('Order data updated successfully.');
            });
    });

    it('it should delete customers', () => {
        chai.request(server)
            .delete(`/customers/${customer_id}`)
            .set("token", token)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
                // res.body.should.have.property('status').eql(200);
                // res.body.should.have.property('msg').eql('Order data updated successfully.');
            });
    });

    it('it should GET all customers list', () => {
        chai.request(server)
            .get(`/customers`)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body.data).should.be.a('array');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });
});
