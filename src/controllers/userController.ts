import { Request, Response } from "express";


export function getUser(req: Request & { user, session }, res: Response) {
    if (!req.session.passport) {
        return res.status(401).json({ message: 'Authorization required' });
    }
    return res.status(200).json(req.user);
}
