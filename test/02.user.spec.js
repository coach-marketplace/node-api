process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require("../src/server.js")

let should = chai.should();

chai.use(chaiHttp);

let app = "http://localhost:5555"
let basePath = "/v1/user"

var data = require("./shared.js")

var new_data = {
    email: "general.de.dieu@yopmail.com",
    password: "sapologie",
}

describe("Udating user infos", () => {

    it("update new user email address and make it coach", (done) => {
        chai.request(app)
        .put(basePath+"/"+data.coach.user._id)
        .set("authorization",data.token)
        .send({"email": new_data.email, "isCoach": "true"})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(new_data.email);
            data.coach.email = new_data.email;
            done();
        })
    })

    it("Update new user password", (done) => {
        chai.request(app)
        .post(basePath+'/'+data.coach.user._id+"/change-password")
        .set("authorization",data.token)
        .send({"new": new_data.password, "current": data.coach.password})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.equal("ok");
            data.coach.password = new_data.password;
            done();
        })
    })

    it("add new user body data", (done) => {
        chai.request(app)
        .post(basePath+'/'+data.coach._id+"/physical-metrics")
        .set("authorization",data.token)
        .send({"weight": {"value":"75", "unit":"kg"}, "height":{"value":"175", "unit":"cm"}})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(201);
            res.body.should.be.a("object");
            done();
        })
    })

})


describe("Getting user infos", () => {

    /*it("get all users", (done) => {
        chai.request(app)
        .get(basePath+"/")
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.should.not.have.lengthOf(0);
            done();
        })
    })*/

    it("get me", (done) => {
        chai.request(app)
          .get(basePath+"/me")
          .set("authorization", data.token)
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.email.should.equal(data.coach.email)
            done();
        })
      })

    it("get new user", (done) => {
        chai.request(app)
        .get(basePath+"/"+data.coach.user._id)
        .set("authorization",data.token)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(data.coach.email);
            done();
        })
    })

    it("get new user physical data", (done) => {
        chai.request(app)
        .get(basePath+'/'+data.coach.user._id+"/physical-metrics")
        .set("authorization",data.token)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.should.not.have.lengthOf(0);
            done();
        })
    })
})