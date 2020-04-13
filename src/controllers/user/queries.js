'use strict'

const mongoose = require('mongoose')

const User = require('../../models/user')
const Body = require('../../models/body')

module.exports = {
  /**
   * @param {string} query Mongo query
   * @return Mongoose query object
   */
  read(query = {}) {
    return User.find(query)
  },

  /**
   * @param {object} data User data
   */
  create(data) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    })

    return newUser.save()
  },

  /**
   * @param {string} userId Id of the user to update
   * @param {object} newData Data to update
   */
  updateOne(userId, newData) {
    return User.findOneAndUpdate(
      { _id: userId },
      { $set: newData },
      { new: true }, // new is use to return the document after updating
    )
  },

  /**
   * @param {string} id User id
   * @return Mongoose query object
   */
  deleteOne(id) {
    return User.deleteOne({ _id: { $eq: id } })
  },

  getBodyData(userId) {
    //var bodyId = User.findOne({_id: userId}).select("body -_id").exec();
    User.findOne({_id: userId, "body":{$ne:null}}).select("body -_id").exec().then(doc => {
      if(doc) {
        return {"todo":"todo"};
      }
      else {
        return {};
      }
    });
  },

  editBodyData(userId, bodyData) {
    User.findOne({_id: userId, "body":{$ne:null}}).select("body -_id").exec().then(doc => {
      if(doc) {
        return {"todo":"todo"};
      }
      else {
        var bodyId = new mongoose.Types.ObjectId()
        bodyData._id = bodyId;
        var newBody = new Body(bodyData);
        User.findOneAndUpdate({ _id: userId }, 
          {$set:{"body":bodyId}}, 
          {new: true}
        )
        return newBody.save();
      }
    });
  },
}
