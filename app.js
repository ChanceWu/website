var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var logger = require('morgan');
var serveStatic = require('serve-static');
var path = require('path');
var mongoose = require('mongoose');
var mongoStore = require('connect-mongo')(expressSession);
var port = process.env.PORT || 3003;
var app = express();
var dbUrl = 'mongodb://localhost/imooc';

mongoose.connect(dbUrl);

app.set('views','./app/views/pages');
app.set('view engine','jade');
app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
	secret: 'imooc',
	resave: false,
	saveUninitialized: true,
	store: new mongoStore({
		url: dbUrl,
		collection: 'sessions'
	})
}));

var env = process.env.NODE_ENV || 'development';
if ('development' === env) {
	app.set('showStackError', true);
	app.use(logger(':method :url :status'));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}

require('./config/routes')(app);

app.use(serveStatic(path.join(__dirname, 'public')));
app.locals.moment = require('moment');
app.listen(port);

console.log('website started on port '+port);
