
import { authenticate } from 'passport';
import * as path from 'path';
import { Request, Response, NextFunction } from 'express';



export function mainPage(req: Request & { user }, res: Response) {
    return res.sendFile(path.resolve(__dirname, '../../views', 'index.html'));
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


export function logout(req: Request & { logout, session }, res: Response) {
    return req.session.destroy(() => {
        return res.status(200).json();
    });
}


export function reg(req: Request & { flash }, res: Response) {
	const error: string = req.flash('RegError')[0] || null;
	return res.render('reg', { error });
}

