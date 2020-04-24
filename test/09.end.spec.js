process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');

let should = chai.should();

chai.use(chaiHttp);

let app = "http://localhost:5555"
let basePath = "/v1/user"

var data = require("./shared.js")

describe("Cleaning up", () => {

    it("destroy test user", (done) => {
        chai.request(app)
        .delete(basePath+"/"+data.user._id)
        .end((err, res) => {
            should.not.exist(err);
            res.should.have.status(200)
            done();
        })
    })
})