import * as Express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as flash from 'connect-flash';
import * as bodyParser from 'body-parser';
import * as eSession from 'express-session';
import * as passport from './configs/passport';
import './configs/mongo';

import routes from './routes/index';
import api from './routes/api';

const app = Express();


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

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

app.use('/libs', Express.static('node_modules'));

// Routes
app.use('/api', api);
app.use('/', routes);




export = app;
