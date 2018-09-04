module.exports = [
  ['api/users/addUser', '/user-master#addUser', 'post'],
  ['api/users/userLogin', '/user-master#userLogin', 'post'],
  ['api/projects/getAll', '/project-master#getAll', 'get'],
  // File-Master Collection API's
  ['api/FileMaster/getAll', 'file-master#getAll', 'get'],
  // Upload documents controller API's
  ['api/UploadDocs/upload', 'upload-documents#uploadDocuments', 'post'],
  // Object-Explorer API's
  ['api/object-explorer/get-object-types', 'object-explorer#getObjectTypes', 'post'],
  ['api/object-explorer/get-all-objects', 'object-explorer#getAllObjects', 'get'],
  ['api/object-explorer/get-object-source', 'object-explorer#getObjectSource', 'get'],
  ['api/object-explorer/get-object-uploads', 'object-explorer#getObjectUploads', 'get'],
  ['api/object-explorer/download-file', 'object-explorer#downloadFile', 'get'],
  ['api/object-explorer/delete-file', 'object-explorer#delete', 'delete']
];