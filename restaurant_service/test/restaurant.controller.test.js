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
    "name": "Test Restaurant",
    "address": "Test Address",
    "city": "Kolkata",
    "state": "WB",
    "cusine": "test",
    "avg_rating": 4,
    "total_reviews": 10,
    "contact_no": "9832910997",
    "menus": [
      {
        "name": "Dal-Vat",
        "category": "Veg",
        "price": 50
      }
    ]
  };

let restaurant_id;

describe('Restaurant Service', () => {
    it('it should create restaurant', () => {
        chai.request(server)
            .post(`/restaurants`)
            .send(req_body)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');

                restaurant_id = res.body.data.id;

                console.log('restaurant_id in post api : ' + restaurant_id);
                // done();
            });
    });

    it('it should search restaurant with search string', () => {
        console.log('restaurant_id');
        console.log(restaurant_id);
        chai.request(server)
            .get(`/restaurants/search/{search_string}`)
            .end((err, res) => {  
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });

    it('it should GET specific restaurant by id', () => {
        console.log('restaurant_id');
        console.log(restaurant_id);
        chai.request(server)
            .get(`/restaurants/${restaurant_id}`)
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

    it('it should update restaurant status', () => {
        chai.request(server)
            .put(`/restaurants/${restaurant_id}`)
            .send({
                "name": "Test Restaurant 2",
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

    it('it should delete restaurant', () => {
        chai.request(server)
            .delete(`/restaurants/${restaurant_id}`)
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

    it('it should GET orders of specific restaurant by id', () => {
        console.log('restaurant_id');
        console.log(restaurant_id);
        chai.request(server)
            .get(`/restaurants/${restaurant_id}/orders`)
            .end((err, res) => {
                if (err) done(err);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                expect(res.body).to.have.property('data');
                expect(res.body).to.have.property('status');
                expect(res.body).to.have.property('msg');
            });
    });
});
describe('Restaurant Service', () => {
    it('it should GET all restaurants list', () => {
        chai.request(server)
            .get(`/restaurants`)
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