
import { authenticate } from 'passport';
import { Request, Response, NextFunction } from 'express';



export function mainPage(req: Request, res: Response) {
	return res.render('index', { user: req.user });
}


export function loginPage(req: Request & { flash }, res: Response) {
	const error = req.flash('AuthError')[0] || null;
	return res.render('login', { error });
}


export function login(req: Request, res: Response, next: NextFunction) {
	return authenticate( 'local-login', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
  })(req, res, next);
}


export function createUser(req: Request, res: Response, next: NextFunction) {
	return authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/reg',
      failureFlash: true
  })(req, res, next);
}


export function logout(req: Request, res: Response) {
	req.logout();
	return res.redirect('/');
}


export function reg(req: Request & { flash }, res: Response) {
	const error: string = req.flash('RegError')[0] || null;
	return res.render('reg', { error });
}


export function currentUser(req: Request, res: Response) {
	return res.status(200).json(req.user);
}
