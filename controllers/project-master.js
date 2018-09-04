var Mongoose = require('mongoose');
var MongoServer = require('../app-config/db-config');
var Schema = Mongoose.Schema;
var DbServer = MongoServer.dbServer();
// var Axios = require('axios');

var projectMasterSchema = new Schema({
  ProjectId: {required: true, unique: true, type: Number},
  SolutionId: {required: true, type: Number},
  LanguageId: {required: true, type: Number},
  ProjectName: {required: true, unique: true, type: String},
  ProjectConfigType: {type: Number},
  PhysicalPath: {required: true, unique: true, type: String},
  TotalFiles: {type: Number},
  UploadedDate: {type: Date, default: Date.now},
  Active: {type: Boolean, default: true},
  ProjectDescription: {type: String, default: ''},
});

module.exports.projectMasterSchema = projectMasterSchema;

exports.getAll = function(request, response) {
  // var allParameters = appFunctions.getAllParameters(request.url);
  var ProjectMaster = DbServer.model(
    'ProjectMaster',
    projectMasterSchema,
    'ProjectMaster'
  );
  ProjectMaster.find().then(function(data) {    
    response.status(200).send(data);
  });
};

exports.uploadProject = function(request, response) {
  var project = request.body;
  var ProjectMaster = DbServer.model(
    'ProjectMaster',
    projectMasterSchema,
    'ProjectMaster'
  );
  ProjectMaster.create(project)
    .then(p => {
      response.status(200).send(p);
    })
    .catch(e => {
      response.status(400).send(JSON.stringify(e));
    });
};
