process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

let app = "http://localhost:5555"
let basePath = "/v1/coach"

var data = require("./shared.js")

var exercise_data = {
    name: "Gabon army dance",
    lang: "en",
    instructions: "dance like there's no tomorrow",
    videoUrl: "https://www.youtube.com/watch?v=MvFmuWd_NQw&gl=BE",
    isPrivate: "true",
    _id: "",
}
describe("Test exercises", () => {

    it("create new exercise", (done) => {
        chai.request(app)
        .post(basePath+"/"+data.user._id+"/exercises")
        .set("authorization",data.token)
        .send(exercise_data)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(201);
            res.body.should.be.a("object");
            res.body.content[0].name.should.equal(exercise_data.name);
            exercise_data._id = res.body._id;
            done();
        })
    })

    it("get coach exercises", (done) => {
        chai.request(app)
        .get(basePath+"/"+data.user._id+"/exercises")
        .set("authorization",data.token)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.body.should.not.have.lengthOf(0);
            done();
        })
    })

    it("delete newly created exercise", (done) => {
        chai.request(app)
        .delete(basePath+"/"+exercise_data._id+"/exercises")
        .set("authorization",data.token)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.equal("ok");
            done();
        })
    })
})
