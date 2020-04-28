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

  it("Create a new user", (done) => {
    chai.request(app)
      .post(basePath+'/register-local')
      .send({email: data.email, password: data.password})
      .end( (err, res) => {
        should.not.exist(err)
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.email.should.equal(data.email);
        data.user = res.body;
        done();
      })
    })

    it("log in with new user", (done) => {
      chai.request(app)
        .post(basePath+"/login-local")
        .send({email: data.email, password: data.password})
        .end( (err, res) => {
          should.not.exist(err)
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.user.should.not.be.empty;
          data.token = res.body.token;
          done()
          });
    })

});


//TODO logout