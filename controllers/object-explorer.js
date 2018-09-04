const {
    ObjectId
} = require('mongodb');
var MongoServer = require('../app-config/db-config');
var {
    appFunctions
} = require('../common-lib/app-functions');
var DbServer = MongoServer.dbServer();
var Path = require('path');
var Fs = require('fs');

var FileTypeExtensionMaster = DbServer.model("FileTypeExtensionMaster", {}, "FileTypeExtensionMaster");
var FileMaster = DbServer.model("FileMaster", {}, "FileMaster");

exports.getObjectTypes = function (request, response) {
    var searchCriteria = request.body;
    FileTypeExtensionMaster.find(searchCriteria).then(function (data) {
        response.status(200).send(data);
    });
};

exports.getAllObjects = function (request, response) {
    var fileTypeExtensionId = request.query.FileTypeExtensionId;
    var fileName = new RegExp('^' + request.query.FileName, "i");
    var findQuery = {
        "FileTypeExtensionId": parseInt(fileTypeExtensionId),
        "ProjectId": ObjectId("5b4f18d24664f127100289ee"),
        "FileName": fileName
    };
    FileMaster.find(findQuery).then(function (data) {
        response.setHeader('Content-Type', "application/json");
        response.status(200).send(data);
    });
};
exports.getObjectSource = function (request, response) {
    var fileId = appFunctions.getParameterByName(request.url, "objectId");
    var viewSourceMaster = DbServer.model("ViewSourceMaster", {}, "ViewSourceMaster");
    viewSourceMaster.findOne({
        "FileId": parseInt(fileId)
    }).then(s => {
        response.setHeader('Content-Type', "application/text");
        response.status(200).send(s);
    });
};

exports.getObjectUploads = function (request, response) {
    var objectId = appFunctions.getParameterByName(request.url, "objectId");
    var uploadPath = Path.join(__dirname, '../file-uploads', objectId);
    Fs.readdir(uploadPath, (err, files) => {
        if (err) response.status(200).send();

        response.status(200).send(files);
    });
};

exports.downloadFile = function (request, response) {
    var objectId = appFunctions.getParameterByName(request.url, "objectId");
    var fileName = appFunctions.getParameterByName(request.url, "fileName");
    var downloadPath = Path.join(__dirname, '../file-uploads', objectId, fileName);

    Fs.readFile(downloadPath, (err, data) => {
        if (err) console.log(err);
        
        response.write(data);
        response.end();
    });
};

exports.delete = function (request, response) {
    var objectId = appFunctions.getParameterByName(request.url, "objectId");
    var fileName = appFunctions.getParameterByName(request.url, "fileName");
    var deletePath = Path.join(__dirname, '../file-uploads', objectId, fileName);

    Fs.unlink(deletePath, function (error) {
        if (error) console.log(error);

        // console.log(`Deleted file: ${deletePath}`);
        response.writeHeader(200);
        response.status(200).send();
    });
};