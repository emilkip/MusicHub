import * as passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;
import * as Promise from 'bluebird';
import * as bcrypt from 'bcryptjs';
import { User, UserStatics } from '../models/User';

const strategyParams = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
};


passport.serializeUser<any, any>((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => (
	User.findById(id)
		.then((user) => done(null, user))
		.catch((err) => done(err))
));


passport.use('local-signup', new LocalStrategy(strategyParams, (req, username, password, done) => {

    return User.findOne({ $or: [{ username }, { username: username.toLowerCase() }] })
		.then((user) => {
			if (user) return Promise.reject('User with this username already exists');
			return Promise.resolve();
		})
	  	.then(() => UserStatics.generatePassword(password))
		.then((generatePassword) => {
			const newUser: any = {
                username: username,
                password: generatePassword.hash,
                salt: generatePassword.salt
            };
			return User.create(newUser);
		})
	  	.then((user) => done(null, user))
		.catch((err) => {
			console.log(err);
			return done(null, false, req.flash('RegError', err.message || err));
		});
}));


passport.use('local-login', new LocalStrategy(strategyParams, (req, username, password, done) => {
	let user;

	return User
	  	.findOne({ username })
		.select('+password')
	  	.then((_user) => {
			if (!_user) return done(null, false, req.flash('AuthError', 'Incorrect username'));
            user = _user;
			return bcrypt.compare(password, _user.password);
	  	})
        .then((res) => {
            if (!res) return done(null, false, req.flash('AuthError', 'Invalid Password'));

            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return done(null, user);
        })
	   	.catch((err) => {
		 	console.log(err);
		 	return done(null, false, req.flash('AuthError', 'Something went wrong. Please try again.'));
	   	});
}));


export = passport;
