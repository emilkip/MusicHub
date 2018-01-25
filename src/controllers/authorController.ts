import { Request, Response } from "express";
import * as Promise from 'bluebird';
import { Author } from "../models/Author";


export function getAuthors(req: Request, res: Response) {

    return Author
        .find()
        .sort({ title: 'asc' })
        .then((authors) => {
            return res.status(200).json(authors);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function createAuthor(req: Request, res: Response) {

    return Author
        .create({ title: req.body.title })
        .then((author) => {
            return res.status(200).json(author);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}