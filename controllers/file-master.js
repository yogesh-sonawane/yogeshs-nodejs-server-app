// var Mongoose = require('mongoose');
var MongoServer = require('../app-config/db-config');
// var Schema = Mongoose.Schema;
var DbServer = MongoServer.dbServer();

var FileMaster = DbServer.model("FileMaster", {}, "FileMaster");

exports.getAll = function(request, response){
    FileMaster.find().limit(25).then(function (data) {
        response.status(200).send(data);
    });
};