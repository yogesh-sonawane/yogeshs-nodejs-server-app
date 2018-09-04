var Mongoose = require('mongoose');
var DbSetting = function() {
  var dbConfig = {
    dbUrl: 'mongodb://127.0.0.1:27017/flokapture-server',
  };

  return dbConfig;
};
exports.dbSetting = DbSetting;

exports.dbServer = function() {
  var serverUrl = 'mongodb://127.0.0.1:27017/flokapture-server';
  Mongoose.Promise = global.Promise;
  var dbServer = Mongoose.createConnection(serverUrl);
  return dbServer;
};

exports.apiAddress = function() {
  var apiBaseAddress = 'http://localhost:3000/api/';
  return apiBaseAddress;
};

exports.mongoDbServer = function() {
  var Db = require('mongodb').Db;
  var MongoClient = require('mongodb').MongoClient;
  var Server = require('mongodb').Server;

  return {Db: Db, Server: Server, Client: MongoClient};
};
