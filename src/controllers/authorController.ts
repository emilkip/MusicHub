import { Request, Response } from "express";
// import * as Promise from 'bluebird';
import * as slug from 'slug';
import {Author, IAuthor} from "../models/Author";
import {Album, IAlbum} from "../models/Album";


export async function getAuthors(req: Request, res: Response) {
    try {
        const authors: IAuthor[] = await Author.find().sort({ title: 'asc' });
        return res.status(200).json(authors);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}


export async function getAllAlbumsForAuthor(req: Request, res: Response) {
    try {
        const author: IAuthor = await Author.findById(req.params.id);
        const albums: IAlbum[] = await Album.find({ author: req.params.id });
        return res.status(200).json({
            author,
            albums
        });
    } catch (err) {
        console.log(err);
        if (err.name === 'CastError') {
            return res.status(400).json({ message: 'Author id is incorrect' });
        }
        return res.status(500).json(err);
    }
}


export async function createAuthor(req: Request, res: Response) {
    const { author } = req.body;
    const slugTitle: string = slug(author.title).toLowerCase();

    try {
        const newAuthor: IAuthor = await Author.create({ title: author.title, slug: slugTitle });
        return res.status(200).json(newAuthor);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}
