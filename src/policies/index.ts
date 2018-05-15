import { Request, Response, NextFunction } from 'express';

export function isAuthorized(req: Request & { isAuthenticated }, res: Response, next: NextFunction) {
	if(!req.isAuthenticated()) {
		return res.redirect('/login');
	} else {
		return next();
	}
}

export function isNotAuthorized(req: Request & { isAuthenticated }, res: Response, next: NextFunction) {
    if(!req.isAuthenticated()) {
       return next();
    } else {
        return res.redirect('/');
    }
}

export function isAuthorizedApi(req: Request & { isAuthenticated }, res: Response, next: NextFunction) {
    if(!req.isAuthenticated()) {
        return res.status(403).json({ message: 'Forbidden' });
    } else {
        return next();
    }
}
