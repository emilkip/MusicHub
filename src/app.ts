import * as Express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as mongoose from 'mongoose';
import * as cookieParser from 'cookie-parser';
import * as flash from 'connect-flash';
import * as bodyParser from 'body-parser';
import * as eSession from 'express-session';
import * as passport from './configs/passport';
import { development, production } from './configs/config';

import routes from './routes/index';
import api from './routes/api';

const app = Express();

if (process.env.NODE_ENV === 'production') {
	mongoose.connect(`mongodb://${production.mongodb.host}:${production.mongodb.port}/${production.mongodb.dbName}`);
} else {
	mongoose.connect(`mongodb://${development.mongodb.host}:${development.mongodb.port}/${development.mongodb.dbName}`);
}



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(eSession({
	secret: 'meow',
	resave: false,
	cookie: { maxAge: 604800000 },
	saveUninitialized: false,
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(Express.static(path.join(__dirname, '../public')));

// Routes
app.use('/', routes);
app.use('/api', api);


// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new Error('Not Found');
	return next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next) => {
		return res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
	return res.render('error', {
		message: err.message,
		error: {}
	});
});


// module.exports = app;
export = app;
