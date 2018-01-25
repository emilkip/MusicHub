import * as fs from 'fs';
import * as Promise from 'bluebird';
import { Request, Response } from "express";
import {IMusic, Music} from "../models/Music";
import {PlaylistItem} from "../models/PlaylistItem";



export function getAllMusic(req: Request, res: Response) {

	return Music
		.find()
		.populate('genre')
		.populate('author')
		.populate('album')
		.populate('creator')
		.sort({ createdAt: 'desc' })
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
		.find({ genre: req.params.id })
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


export function createMusic(req: Request, res: Response) {

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
			audio: trackFileName,
			creator: req.user.id
		})
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
		.findOne({ id: req.params.id })
		.populate('genre')
		.populate('author')
		.populate('album')
		.populate('creator')
		.then((music) => {
			return res.status(200).json(music);
		})
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function getAllProfileMusic(req: Request, res: Response) {

	return Music
		.find({ creator: req.user.id })
		.populate('genre')
		.populate('author')
		.populate('album')
		.sort({ createdAt: 'desc' })
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
		.update({ id: req.params.id }, {
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
	let deletedMusicDoc: IMusic;

	return Music
		.findOneAndRemove({ id: req.params.id })
		.then((deletedMusic) => {
            deletedMusicDoc = deletedMusic;
			return PlaylistItem.remove({ music: req.params.id });
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
