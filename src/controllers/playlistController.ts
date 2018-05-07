import { Request, Response } from "express";
import * as Promise from 'bluebird';
import { Playlist } from "../models/Playlist";
import { PlaylistItem } from "../models/PlaylistItem";


export function getPlaylist(req: Request, res: Response) {

	return Playlist
		.findOne({ id: req.params.id })
		.then((playlist) => {
			return res.status(200).json(playlist);
		})
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function getAllProfilePlaylists(req: Request & { user }, res: Response) {

	return Playlist
		.find({ owner: req.user.id })
		.sort({ createdAt: 'desc' })
		.then((playlists) => {
			return res.status(200).json(playlists);
		})
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function getPlaylistItem(req: Request, res: Response) {

	return PlaylistItem
		.find({ playlist: req.params.id })
		.populate('music')
		.sort({ createdAt: 'desc' })
		.then((items) => {
			if (!items.length) {
				return Promise.resolve([]);
			}

			// const musicIds = items.map((item) => )

			// return Music.find({ _id:  })
			// items.forEach((item, i) => {
            //
			// 	Music
			// 		.findOne({ id: item.music })
			// 		.populate('author')
			// 		.populate('album')
			// 		.then(function(track) {
            //
			// 			items[iter].music = track;
			// 			++iter;
            //
			// 			if(iter == items.length)
			// 				res.json(items);
			// 		});
			// });
		})
		// .then(() => {  })
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function createPlaylist(req: Request & { user }, res: Response) {

	const body: any = req.body;

	return Playlist
		.create({
			title: body.title,
			owner: req.user.id
		})
		.then((createdPlaylist) => {
			const promises = body.music.map((item) => (
                PlaylistItem.create({
                    playlist: createdPlaylist.id,
                    music: item.id
                })
			));
			return Promise.all(promises)
				.then(() => Promise.resolve(createdPlaylist));
		})
        .then((createdPlaylist) => {
            return res.status(200).json(createdPlaylist);
		})
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function deletePlaylist(req: Request, res: Response) {

	return Playlist
		.remove({ id: req.body.id })
		.then(() => PlaylistItem.remove({ playlist: req.body.id }))
		.then(() => {
			return res.status(200).json();
		})
		.catch((err) => {
			console.log(err);
            return res.status(500).json(err);
		});
}


export function editPlaylist(req: Request, res: Response) {

	const body: any = req.body;

	return Playlist
		.update({
			id: req.params.id
		}, {
			title: body.title
		})
		.then(() => {
			return res.status(200).json();
		})
		.catch((err) => {
			console.log(err);
        	return res.status(500).json(err);
		});
}
