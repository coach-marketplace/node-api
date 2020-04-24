process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require("../src/server.js")

let should = chai.should();

chai.use(chaiHttp);

let app = "http://localhost:5555"
let basePath = "/v1/exercise"

var data = require("./shared.js")

var new_exercise = {
    instructions: "do the exercise",
    isPrivate: true,
    lang: "FR",
    name: "the amazing exercise",
    sportId: 4,
    userOwnerId: data.user._id,
    videoUrl: "https://www.youtube.com/watch?v=MvFmuWd_NQw&gl=BE",
}

/*describe("Test exercises", () => {

    it("create a new exercise", (done) => {
        chai.request(app)
        .post(basePath+"/")
        .send({"email": data.new_email})
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.email.should.equal(data.new_email);
            done();
        })
    })

})*/
