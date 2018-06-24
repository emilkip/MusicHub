import * as Express from 'express';
import * as path from 'path';
import * as logger from 'morgan';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as flash from 'connect-flash';
import * as bodyParser from 'body-parser';
import * as eSession from 'express-session';
import * as mongoStore from 'connect-mongo';
import * as passport from './configs/passport';
import * as policy from './policies';
import mongoConnection from './configs/mongo';

import routes from './routes/index';
import api from './routes/api';

const app = Express();
const MongoStore = mongoStore(eSession);


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(eSession({
	secret: 'meow',
	resave: false,
	cookie: { maxAge: 604800000 },
	saveUninitialized: true,
	store: new MongoStore({
        mongooseConnection: mongoConnection.connection
	})
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(Express.static(path.join(__dirname, '../public/dist_client')));
app.use('/images', Express.static(path.join(__dirname, '../public/images')));
app.use('/cover', Express.static(path.join(__dirname, '../public/images/cover')));
app.use('/libs', Express.static('node_modules'));

app.disable('x-powered-by');

// Routes
app.use('/api', policy.isAuthorizedApi, api);
app.use('/', routes);




export = app;
