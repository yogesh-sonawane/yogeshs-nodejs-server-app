var Mongoose = require('mongoose');
var MongoServer = require('../app-config/db-config');
var Schema = Mongoose.Schema;
var DbServer = MongoServer.dbServer();
var validator = require('validator');

var solutionMasterSchema = new Schema({
    solutionId: {
        type: Number,
        required: true,
        unique: true
    },
    solutionType: {
        type: String,
        required: true,
        unique: true
    },
    languageId: {
        type: String,
        required: true
    }
});