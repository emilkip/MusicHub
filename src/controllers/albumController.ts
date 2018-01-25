import { Request, Response } from "express";
import * as Promise from 'bluebird';
import { Album } from "../models/Album";


export function getAlbumsByAuthor(req: Request, res: Response) {

    return Album
        .find({ author: req.body.id })
        .then((albums) => {
            return res.status(200).json(albums);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function createAlbum(req: Request, res: Response) {

    const body: any = req.body;
    const file: any  = req.file;
    let cover: string;

    if (!file) cover = 'music-placeholder.png';
    else cover = file.filename;


    return Album
        .create({
            author: body.author,
            title: body.title,
            cover
        })
        .then((album) => {
            return res.status(200).json(album);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}
