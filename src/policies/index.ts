import { Request, Response, NextFunction } from 'express';

export function isAuthorized(req: Request, res: Response, next: NextFunction) {

	if(!req.user) {
		res.redirect('/login');
	} else {
		next();
	}
}
