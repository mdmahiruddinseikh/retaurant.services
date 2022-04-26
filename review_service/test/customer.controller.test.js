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
        },
        {
            "restaurant_id": "4",
            "menu_id": "1",
            "price": 500
        },
        {
            "restaurant_id": "10",
            "menu_id": "50",
            "price": 250
        }
    ]
};

let order_id;

describe('Order Service', () => {
    // it('it should GET access token for aassistant controller', (done) => {
    //     chai.request(config.token.token_host)
    //         .post(config.token.token_env_point)
    //         .send(config.token.token_req_body)
    //         .end((err, res) => {
    //             if (err) { done(err) };
    //             (res).should.have.status(200);
    //             (res.body).should.be.a('object');
    //             expect(res.body).to.have.property('access_token');
    //             token = res.body.access_token;
    //             done();
    //         });
    // });

    it('it should create order', () => {
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

                order_id = res.body.data.id;
                // done();
            });
    });
});
describe('Order Service', () => {
    it('it should GET order list', () => {
        chai.request(server)
            .get(`/orders`)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body.data).should.be.a('array');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
                // done();
            });
    });

    it('it should GET specific order by id', () => {
        chai.request(server)
            .get(`/orders/1`)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                (res.body.data).should.be.a('object');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
                // done();
            });
    });

    it('it should update order status', () => {
        chai.request(server)
            .put(`/orders/1`)
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
                // done();
            });
    });
});