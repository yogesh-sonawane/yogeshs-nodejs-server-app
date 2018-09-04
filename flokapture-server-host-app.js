var Express = require('express');
var BodyParser = require('body-parser');
var Cors = require('cors');
var App = Express();
var Path = require('path');
var Fs = require('fs');
const Hbs = require('hbs');

console.log('\n=======================================================================\n');
/*
var msgObj = require('../flokapture-server-app/plaground/message');
var Window = require('window');
var window = new Window();
var s = new msgObj(window);
s.showMessage('tdError', 'Please enter username', 'error');
*/
App.use(BodyParser.json({
  limit: '60mb'
}));
App.use(BodyParser.urlencoded({
  limit: '60mb',
  extended: true
}));

App.use(Cors());

var scriptPaths = ['/app-scripts', 'node_modules'];
var paths = new RegExp(scriptPaths.join('|'), 'i');
App.get(paths, (request, response) => {
  var dir = '/';
  var uri = url
    .parse(request.url)
    .pathname;
  var fileName = Path.join(dir, uri);
  Fs
    .readFile(__dirname + fileName)
    .then(jsFile => {
      response.writeHeader(200, {
        'Content-Type': 'text/html'
      });
      response.write(jsFile);
      response.end();
    }, e => {
      console.log(e);
      response
        .status(400)
        .end();
    });
});

App.set('view engine', Hbs);

App.get('/getstatus', function (request, response) {
  response
    .status(200)
    .end('Flokapture Server Application is up and running.!!!');
});
App.get('', function (request, response) {
  response
    .status(200)
    .end('Flokapture Server Application is up and running!!!');
});

var ExpressPath = require('express-path');
ExpressPath(App, './app-routes/api-routes.js');

var uploadPath = Path.join(__dirname, 'file-uploads');
if (!Fs.existsSync(uploadPath)) {
  Fs.mkdirSync(uploadPath);
};

App.use(Express.static(uploadPath));

var portNumber = process.env.PORT || 3000;
App.listen(portNumber, function () {
  console.log('\n=======================================================================\n');
  console.log(`Flokapture Server Host Application is up running on port: ${portNumber}\n`);
  console.log('=======================================================================\n');
});

/*
var MathObj = require('../flokapture-server-app/plaground/math-calc');
var sub = MathObj.findSub(2, 4);
console.log(sub);
*/

/*
var abcModule = require("../flokapture-server-app/plaground/call-apply-bind");
var abc = new abcModule();
abc.init.call(this);
*/