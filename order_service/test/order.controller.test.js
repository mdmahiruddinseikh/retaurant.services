const server = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
chai.use(require("chai-sorted"));
chai.use(chaiHttp);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1haGlydWRkaW5zZWlraEBnbWFpbC5jb20iLCJpYXQiOjE2NTEyMDE1MDcsImV4cCI6MTY1MTIwNTEwN30.9OZM0WOSgObeWy4dTJhqx-KNqexg0Zp0J7H9SRCmdIs"
;
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

let order_id;

describe('Order Service', () => {
    it('it should create order', (done) => {
        chai.request(server)
            .post(`/orders`)
            .send(req_body)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');

                console.log('res.body')
                console.log(res.body)

                order_id = res.body.data.id;

                console.log('order_id in post api : ' + order_id);
                done();
            });
    });

    it('it should GET specific order by id', () => {
        chai.request(server)
            .get(`/orders/${order_id}`)
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

    it('it should update order status', () => {
        chai.request(server)
            .put(`/orders/${order_id}`)
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

    it('it should delete order', () => {
        chai.request(server)
            .delete(`/orders/${order_id}`)
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
describe('Order Service', () => {
    it('it should GET all order list', () => {
        chai.request(server)
            .get(`/orders`)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                // (res.body.data).should.be.a('array');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });
});