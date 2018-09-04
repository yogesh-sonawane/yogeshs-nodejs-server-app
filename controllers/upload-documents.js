const {
    appFunctions
} = require('../common-lib/app-functions');
var Path = require('path');
var Fs = require('fs');
const Multer = require('multer');
let Storage = Multer.diskStorage({
    destination: function (request, file, cb) {
        var uploadDirName = appFunctions.getParameterByName(request.url, "uploadDirName");
        var uploadPath = Path.join(__dirname, '../file-uploads', uploadDirName);
        if (!Fs.existsSync(uploadPath)) {
            Fs.mkdirSync(uploadPath);
        };
        var dirPath = './file-uploads/' + uploadDirName;
        cb(null, dirPath)
    },
    filename: function (request, file, cb) {
        cb(null, file.originalname)
    }
});
const Upload = Multer({
    storage: Storage
}).array("uploads", 12);

exports.uploadDocuments = function (request, response) {
    Upload(request, response, function (err) {
        if (err) response.status(500).send(JSON.stringify(err));

        response.status(200).send(JSON.stringify({
            status: "File(s) uploaded successfully"
        }));
    });
};