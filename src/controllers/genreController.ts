import { Request, Response } from "express";
import * as Promise from 'bluebird';
import { Genre } from "../models/Genre";
import { Music } from "../models/Music";
import * as slug from 'slug';


export function getAllGenre(req: Request, res: Response) {

    return Genre
        .find()
        .sort({ title: 'asc' })
        .then((genres) => {
            return res.status(200).json(genres);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function editGenre(req: Request, res: Response) {

    const genreSlug: string = slug(req.body.title, { lower: true });

    return Genre
        .update(
            {
                id: req.params.id
            }, {
                title: req.body.title,
                slug: genreSlug
            }
        )
        .then((updatedGenre) => {
            return res.status(200).json(updatedGenre);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function createGenre(req: Request, res: Response) {

    const genreSlug: string = slug(req.body.title, { lower: true });

    return Genre
        .create({
            title: req.body.title,
            slug: genreSlug
        })
        .then((createdGenre) => {
            return res.status(200).json({ status: true, genre: createdGenre });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function deleteGenre(req: Request, res: Response) {

    return Genre
        .remove({ id: req.params.id })
        .then((result) => {
            // if (result)
            return Music.update({ genre: req.params.id }, { genre: 0 });
        })
        .then(() => {
            return res.status(200).json({ status: true });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}