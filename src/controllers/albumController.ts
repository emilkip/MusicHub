import {Request, Response} from "express";
import {Album, IAlbum} from "../models/Album";
import {IMusic, Music} from "../models/Music";
import {Author, IAuthor} from "../models/Author";


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


export async function createAlbum(req: Request & { file }, res: Response) {

    const body: any = req.body;
    const file: any = req.file;
    let cover: string = file ? file.filename : null;

    try {
        const existingAuthor: IAlbum = await Album.findOne({ title: body.title, author: body.author });

        if (existingAuthor) {
            return res.status(409).json({ message: 'An album with this title already exists for the author' });
        }

        const newAlbum: IAlbum = await Album.create({
            author: body.author,
            title: body.title,
            cover
        });

        return res.status(200).json(newAlbum);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

export async function getMusic(req: Request, res: Response) {
    try {
        const album: IAlbum = await Album.findById(req.params.id).populate('author');
        const musicList: IMusic[] = await Music.find({album: req.params.id}).populate('author').populate('album');
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
