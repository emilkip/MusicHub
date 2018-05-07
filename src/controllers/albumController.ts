import {Request, Response} from "express";
import {Album, IAlbum} from "../models/Album";
import {IMusic, Music} from "../models/Music";


export function getAlbumsByAuthor(req: Request, res: Response) {

    return Album
        .find({author: req.body.id})
        .then((albums) => {
            return res.status(200).json(albums);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function createAlbum(req: Request & { file }, res: Response) {

    const body: any = req.body;
    const file: any = req.file;
    let cover: string = file ? file.filename : null;

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

export async function getMusic(req: Request, res: Response) {
    try {
        const album: IAlbum = await Album.findById(req.params.id).populate('author');
        const musicList: IMusic[] = await Music.find({album: req.params.id});
        return res.status(200).json({
            album,
            musicList
        });
    } catch (err) {
        console.log(err);
        if (err.name === 'CastError') {
            return res.status(400).json({message: 'Album id is incorrect'});
        }
        return res.status(500).json(err);
    }
}
