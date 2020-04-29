process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

let app = "http://localhost:"+PORT;
let basePath = "/v1/user"

var data = require("./shared.js")

let conversation_data = {
    conversation: {},
    message: "Hello!",
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

describe("Testing conversations", () => {

    it("Starting a conversation", (done) => {
        chai.request(app)
          .post(basePath+"/"+data.coach.user._id+"/conversations")
          .set("authorization", data.token)
          .send({memberIds: [data.customer.user._id]})
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.participants.should.be.a("array");
            res.body.participants.should.have.lengthOf(2);
            conversation_data.conversation = res.body;
            done();
        })
      })

      it("Sending a message", (done) => {
        chai.request(app)
          .post(basePath+"/"+data.coach.user._id+"/conversations/"+conversation_data.conversation._id+"/messages")
          .set("authorization", data.token)
          .send({text: conversation_data.message})
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.text.should.equal(conversation_data.message);
            done();
        })
      })

      it("Getting all conversations", (done) => {
        chai.request(app)
          .get(basePath+"/"+data.coach.user._id+"/conversations")
          .set("authorization", data.token)
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.not.have.lengthOf(0);
            done();
        })
      })

      it("Getting one conversation", (done) => {
        chai.request(app)
          .get(basePath+"/"+data.coach.user._id+"/conversations/"+conversation_data.conversation._id)
          .set("authorization", data.token)
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body._id.should.equal(conversation_data.conversation._id)
            done();
        })
      })

      it("Getting messages in conversation", (done) => {
        chai.request(app)
          .get(basePath+"/"+data.coach.user._id+"/conversations/"+conversation_data.conversation._id+"/messages")
          .set("authorization", data.token)
          .end( (err, res) => {
            should.not.exist(err)
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.not.have.lengthOf(0);
            res.body[0].text.should.equal(conversation_data.message)
            done();
        })
      })
})