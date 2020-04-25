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

    it("update new user email address", (done) => {
        chai.request(app)
        .put(basePath+"/"+data.user._id)
        .set("authorization",data.token)
        .send({"email": new_data.email})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(new_data.email);
            data.email = new_data.email;
            done();
        })
    })

    // TODO update password

    //TODO after call is updated
    /*it("Update new user body data", (done) => {
        chai.request(app)
        .post(basePath+"/body/"+data.user._id)
        .send({""})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(data.email);
            done();
        })
    })*/

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

    it("get new user", (done) => {
        chai.request(app)
        .get(basePath+"/me")
        .set("authorization",data.token)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(data.email);
            done();
        })
    })

    //CALL TO BE FIXED
    /*it("get new user physical data", (done) => {
        chai.request(app)
        .get(basePath+"/body/"+data.user._id)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            done();
        })
    })*/
})