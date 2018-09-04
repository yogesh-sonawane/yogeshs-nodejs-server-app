var Mongoose = require('mongoose');
var DbSetting = function () {
  var dbConfig = {
    dbUrl: 'mongodb://173.248.135.123:27017/flokapture-server',
  };

  return dbConfig;
};
exports.dbSetting = DbSetting;

exports.dbServer = function () {
  try {
    var serverUrl = 'mongodb://173.248.135.123:27017/flokapture-server';
    Mongoose.Promise = global.Promise;
    var dbServer = Mongoose.createConnection(serverUrl);
    return dbServer;
  } catch (exception) {
    console.log(exception);
  }
};

exports.apiAddress = function () {
  var apiBaseAddress = 'http://localhost:3000/api/';
  return apiBaseAddress;
};

exports.mongoDbServer = function () {
  var Db = require('mongodb').Db;
  var MongoClient = require('mongodb').MongoClient;
  var Server = require('mongodb').Server;

  return {
    Db: Db,
    Server: Server,
    Client: MongoClient
  };
};