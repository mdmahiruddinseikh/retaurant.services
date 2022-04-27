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
    "customer_id": "CUS-1",
    "amount": 500,
    "items": [
        {
            "restaurant_id": "2",
            "menu_id": "4",
            "price": 500
        }
    ]
};

let review_id;

describe('Review Service', () => {
    it('it should create review', (done) => {
        chai.request(server)
            .post(`/reviews`)
            .send(req_body)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');

                review_id = res.body.data.id;

                console.log('review_id in post api : ' + review_id);
                done();
            });
    });

    it('it should GET specific review by id', () => {
        console.log('review_id');
        console.log(review_id);
        chai.request(server)
            .get(`/reviews/${review_id}`)
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

    it('it should update review status', () => {
        chai.request(server)
            .put(`/reviews/${review_id}`)
            .send({
                order_status: "accted by restaurant"
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

    it('it should delete review', () => {
        chai.request(server)
            .delete(`/reviews/${review_id}`)
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
});
describe('Review Service', () => {
    it('it should GET all reviews list', () => {
        chai.request(server)
            .get(`/reviews`)
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