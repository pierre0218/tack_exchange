//module dependencies
var express = require('express'); 
var routes = require('./routes'); //it is equal to "./routes/index.js"
var http = require('http');
var path = require('path');
var app = express();
var partials = require('express-partials');
// all environments

//default port 3000
app.set('port', process.env.PORT || 3000);


app.set('views', path.join(__dirname, 'views'));//view tamplates
app.set('view engine', 'ejs');
app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(express.cookieParser('123456789'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


//routes
app.get('/', routes.index);
app.get('/t/:symbol', routes.index);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout );

http.createServer(app).listen(app.get('port'), function( req, res ){ 
    //create app instance
    console.log('Express server listening on port ' + app.get('port'));
});