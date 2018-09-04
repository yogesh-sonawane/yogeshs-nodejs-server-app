var Mongoose = require('mongoose');
var MongoServer = require('../app-config/db-config');
var Schema = Mongoose.Schema;
var DbServer = MongoServer.dbServer();
var validator = require('validator');
var Jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcryptJs = require('bcryptjs');

var userMasterSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: function (v) {
      return new Promise(function (resolve, reject) {
        if (validator.isEmail) resolve(true);

        reject();
      });
    }
  },
  lastName: String,
  dateOfBirth: {
    type: Date,
    default: Date.now
  },
  userName: {
    type: String,
    required: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    },
  }],
});

userMasterSchema.methods.toJSON = function () {
  var userMaster = this;
  var userObject = userMaster.toObject();
  // var thisUser = _.pick(userObject, ['_id', 'userName', 'email', 'tokens']);
  return userObject;
};
userMasterSchema.pre('save', function (next) {
  var userMaster = this;
  if (userMaster.isModified('password')) {
    bcryptJs.genSalt(10, function (err, salt) {
      bcryptJs.hash(userMaster.password, salt, function (e, hash) {
        userMaster.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
userMasterSchema.methods.generateAuthToken = function () {
  var userMaster = this;
  var access = 'auth';
  var token = Jwt.sign({
      _id: userMaster._id.toHexString(),
      access: access,
    },
    'floKapture@123'
  ).toString();

  userMaster.tokens.push({
    access: access,
    token: token
  });

  return userMaster.save().then(() => {
    return token;
  });
};
var createUser = function (request, response) {
  var user = request.body;
  var UserMaster = DbServer.model('UserMaster', userMasterSchema, 'UserMaster');
  var newUser = new UserMaster(user);
  newUser
    .save()
    .then(() => {
      return newUser.generateAuthToken();
    }, err => {
      response.status(400).send(JSON.stringify(err));
    }).then(token => {
      response.setHeader('x-auth-token', token);
      response.send(newUser.toJSON(newUser));
    }).catch(e => {
      response.status(400).send(JSON.stringify(e));
    });
};

exports.addUser = createUser;

userMasterSchema.statics.findByCredentials = function (userName, password) {
  // var userMaster = this;
  var UserMaster = DbServer.model('UserMaster', userMasterSchema, UserMaster);
  return UserMaster.findOne({
    userName
  }).then(user => {
    if (!user) {
      return Promise.reject('User Not Found');
    }

    return new Promise((resolve, reject) => {
      bcryptJs.compare(password, user.password, function (err, res) {
        if (err) reject(err);

        resolve(user);
      });
    });
  });
};

userMasterSchema.statics.toJSON = function (userMaster) {
  var userObject = userMaster.toObject();
  var thisUser = _.pick(userObject, ['_id', 'userName', 'email', 'tokens']);
  return thisUser;
};
exports.userLogin = function (request, response) {
  var body = _.pick(request.body, ['UserName', 'Password']);
  var UserMaster = DbServer.model('UserMaster', userMasterSchema, 'UserMaster');
  UserMaster.findByCredentials(body.UserName, body.Password)
    .then(function (user) {
      response.setHeader('x-auth-token', user.tokens[0].token);
      response.status(200).send(UserMaster.toJSON(user));
    })
    .catch(function (ex) {
      response.status(400).send(JSON.stringify(ex));
    });
};