/* eslint-disable no-undef */
process.env.NODE_ENV = 'test'

let chai = require('chai')
let chaiHttp = require('chai-http')

let should = chai.should()

chai.use(chaiHttp)

const { PORT } = process.env
let app = 'http://localhost:' + PORT

let basePath = '/v1/coach'

var data = require('./shared.js')

let exercise_data = {
  name: 'Gabon army dance',
  lang: 'en-US',
  instructions: "dance like there's no tomorrow",
  videoUrl: 'https://www.youtube.com/watch?v=MvFmuWd_NQw&gl=BE',
  isPrivate: 'true',
  _id: '',
}

let coachProfileData = {
  description: "I am a coach",
  company: "Fitigai SPRL",
  sports: ["5e12049908735f213b9f1e23"],
  _id: '',
}

describe('Test exercises', () => {
  it('create new exercise', (done) => {
    chai
      .request(app)
      .post(basePath + '/' + data.coach.user._id + '/exercises')
      .set('authorization', data.coach.token)
      .send(exercise_data)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        res.body.content[0].name.should.equal(exercise_data.name)
        exercise_data._id = res.body._id
        done()
      })
  })

  it('get coach exercises', (done) => {
    chai
      .request(app)
      .get(basePath + '/' + data.coach.user._id + '/exercises')
      .set('authorization', data.coach.token)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.not.have.lengthOf(0)
        done()
      })
  })

  it('delete newly created exercise', (done) => {
    chai
      .request(app)
      .delete(
        basePath +
          '/' +
          data.coach.user._id +
          '/exercises/' +
          exercise_data._id,
      )
      .set('authorization', data.coach.token)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        done()
      })
  })
})

describe('Test customers', () => {
  it('add new non-existing customer to coach', (done) => {
    chai
      .request(app)
      .post(basePath + '/' + data.coach.user._id + '/customers')
      .set('authorization', data.coach.token)
      .send(data.contact)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.lead.email.should.equal(data.contact.email)
        data.contact.user = res.body.lead
        done()
      })
  })

  it('add new existing customer to coach', (done) => {
    chai
      .request(app)
      .post(basePath + '/' + data.coach.user._id + '/customers')
      .set('authorization', data.coach.token)
      .send({
        firstName: data.customer.firstName,
        lastName: data.customer.lastName,
        phone: data.customer.phone,
        email: data.customer.email,
        leadId: data.customer.user._id,
      })
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.lead.email.should.equal(data.customer.email)
        done()
      })
  })

  it('get coach customers', (done) => {
    chai
      .request(app)
      .get(basePath + '/' + data.coach.user._id + '/customers')
      .set('authorization', data.coach.token)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.should.not.have.lengthOf(0)
        done()
      })
  })
})

describe('Test search users', () => {
  it('Search users as coach', (done) => {
    chai
      .request(app)
      .get(basePath + '/' + data.coach.user._id + '/search-users')
      .set('authorization', data.coach.token)
      .query({ email: data.customer.email })
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.email.should.equal(data.customer.email)
        done()
      })
  })
})

describe('Test coach profile', () => {
  it('add coach profile', (done) => {
    chai
      .request(app)
      .post(basePath + '/' + data.coach.user._id + '/coach-profile')
      .set('authorization', data.coach.token)
      .send({description, company, sports} = coachProfileData)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(201)
        res.body.should.be.a('object')
        coachProfileData._id = res.body._id
        done()
      })
  })

  it('read coach profile', (done) => {
    chai
      .request(app)
      .get(basePath + '/' + data.coach.user._id + '/coach-profile')
      .set('authorization', data.coach.token)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

  it('update coach profile', (done) => {
    chai
      .request(app)
      .put(basePath + '/' + data.coach.user._id + '/coach-profile/'+coachProfileData._id)
      .set('authorization', data.coach.token)
      .send({description, company, sports} = coachProfileData)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.should.be.a('object')
        done()
      })
  })

  it('delete coach profile', (done) => {
    chai
      .request(app)
      .delete(basePath + '/' + data.coach.user._id + '/coach-profile/'+coachProfileData._id)
      .set('authorization', data.coach.token)
      .end((err, res) => {
        should.not.exist(err)
        res.should.have.status(200)
        res.body.message.should.equal('ok')
        done()
      })
  })
})
