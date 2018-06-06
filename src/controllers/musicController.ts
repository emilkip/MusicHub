import * as fs from 'fs';
import * as path from 'path';
import * as Promise from 'bluebird';
import {Request, Response} from "express";
import {IMusic, Music} from "../models/Music";
import {Author} from "../models/Author";
import {Album} from "../models/Album";
import {PlaylistItem} from "../models/PlaylistItem";
import {Playlist} from "../models/Playlist";


export function getAllMusic(req: Request, res: Response) {

    return Music
        .find()
        .populate('genre')
        .populate('author')
        .populate('album')
        .populate('creator')
        .sort({createdAt: 'desc'})
        .then((music) => {
            return res.status(200).json(music);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function getAllByGenre(req: Request, res: Response) {

    return Music
        .find({genre: req.params.id})
        .populate('genre')
        .populate('author')
        .populate('album')
        .then((music) => {
            return res.status(200).json(music);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function createMusic(req: Request & { file, user }, res: Response) {

    const file: any = req.file;
    const body: any = req.body;
    let trackFileName: string;

    if (!file) trackFileName = null;
    else trackFileName = file.filename;


    return Music
        .create({
            author: body.author,
            title: body.title,
            album: body.album,
            genre: body.genre,
            filename: trackFileName,
            creator: req.user.id
        })
        .then((createdMusic) => (
            createdMusic
                .populate('author')
                .populate('album')
                .populate('genre')
                .execPopulate()
        ))
        .then((createdMusic) => {
            return res.status(200).json(createdMusic);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function getOne(req: Request, res: Response) {

    return Music
        .findOne({_id: req.params.id})
        .populate('genre')
        .populate('author')
        .populate('album')
        .populate('creator')
        .then((music) => {
            return res.status(200).json(music);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({message: 'Error during fetching music'});
        });
}


export function getAllProfileMusic(req: Request & { user }, res: Response) {

    return Music
        .find({creator: req.user.id})
        .populate('genre')
        .populate('author')
        .populate('album')
        .sort({createdAt: 'desc'})
        .then((music) => {
            return res.status(200).json(music);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function getAllByUserId(req: Request, res: Response) {

    // var id = req.params.id;

}


export function edit(req: Request, res: Response) {

    const body: any = req.body;
    const file: any = req.file;
    let trackFileName: string;

    if (!file) trackFileName = body.audio;
    else trackFileName = file.filename;

    return Music
        .update({id: req.params.id}, {
            author: body.author,
            title: body.title,
            album: body.album,
            genre: body.genre,
            audio: trackFileName
        })
        .then(() => {
            return res.status(200).json();
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function deleteMusic(req: Request, res: Response) {

    const unlinkFile: Function = Promise.promisify(fs.unlink);
    let deletedMusicDoc: any;

    return Music
        .findOneAndRemove({id: req.params.id})
        .then((deletedMusic) => {
            deletedMusicDoc = deletedMusic;
            return PlaylistItem.remove({music: req.params.id});
        })
        .then(() => unlinkFile(`public/uploads/audio${deletedMusicDoc.filename}`))
        .then(() => {
            return res.status(200).json();
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
}


export function search(req: Request, res: Response) {
    const query: RegExp = new RegExp(req.body.query);

    return Music.find({title: {$regex: query, $options: 'i'}})
        .populate('author')
        .limit(20)
        .then((result) => {
            return res.status(200).json(result);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
}

export function searchAll(req: Request, res: Response) {
    const query: RegExp = new RegExp(req.body.query);

    return Promise
        .all([
            Music.find({title: {$regex: query, $options: 'i'}})
                .populate('author')
                .populate('album')
                .populate('genre')
                .limit(10),
            Album.find({title: {$regex: query, $options: 'i'}})
                .populate('author')
                .limit(10),
            Author.find({title: {$regex: query, $options: 'i'}})
                .limit(10),
            Playlist.find({title: {$regex: query, $options: 'i'}, type: 'public'})
                .populate('owner', 'username')
                .limit(10),
        ])
        .then((result) => {
            const resultObject: object = {
                musicList: result[0] || [],
                albums: result[1] || [],
                authors: result[2] || [],
                playlists: result[3] || []
            };
            return res.status(200).json(resultObject);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        })
}


export function getAudio(req: Request, res: Response) {
    const audioPath: string = path.join(__dirname, `../../public/audio/${req.params.id}`);
    const stat: any = fs.statSync(audioPath);
    const fileSize = stat.size;
    const range: any = req.headers.range;


    if (range) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const stream: fs.ReadStream = fs.createReadStream(audioPath, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'audio/*',
        };
        res.writeHead(206, head);
        stream.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'audio/*',
        };
        res.writeHead(200, head);
        fs.createReadStream(audioPath).pipe(res);
    }
}
