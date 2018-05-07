import { Request, Response, NextFunction } from 'express';

export function isAuthorized(req: Request, res: Response, next: NextFunction) {

	if(!req.user) {
		return res.redirect('/login');
	} else {
		return next();
	}
}


export function isNotAuthorized(req: Request, res: Response, next: NextFunction) {

    if(!req.user) {
       return next();
    } else {
        return res.redirect('/');
    }
}