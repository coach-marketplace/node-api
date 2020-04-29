process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

//let server = require("../src/server.js")

let should = chai.should();

chai.use(chaiHttp);

var data = require("./shared.js")

const application = require('../src/app')
const { PORT } = process.env

let app = "http://localhost:"+PORT;
let basePath = "/v1/auth"


before(function (done) {
  application.on("appStarted", function(){
      done();
  });
});

//Create a user
describe("Ensure new user is working", () => {

  it("Create a new user (coach)", (done) => {
    chai.request(app)
      .post(basePath+'/register-local')
      .send(data.coach)
      .end( (err, res) => {
        should.not.exist(err)
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.email.should.equal(data.coach.email);
        data.coach.user = res.body;
        done();
      })
    })

    it("log in with new user", (done) => {
      chai.request(app)
        .post(basePath+"/login-local")
        .send({email: data.coach.email, password: data.coach.password})
        .end( (err, res) => {
          should.not.exist(err)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.user.should.not.be.empty;
          data.token = res.body.token;
          done()
          });
    })

    it("Create a second user (customer)", (done) => {
      chai.request(app)
        .post(basePath+'/register-local')
        .send(data.customer)
        .end( (err, res) => {
          should.not.exist(err)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.email.should.equal(data.customer.email);
          data.customer.user = res.body;
          done();
        })
      })

});


//TODO logout