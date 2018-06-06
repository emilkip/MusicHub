import { Request, Response } from "express";
import * as Bluebird from 'bluebird';
import {IPlaylist, Playlist} from "../models/Playlist";
import { PlaylistItem } from "../models/PlaylistItem";
import {Album} from "../models/Album";
import {Author} from "../models/Author";


export async function getPlaylists(req: Request, res: Response) {
	return Playlist
		.find({ type: 'public' })
		.populate('owner')
		.limit(10)
		.then((playlists) => {
			if (!playlists) {
				return Bluebird.resolve([]);
			}

			return Bluebird.map(playlists, (playlist: any) => {
                return PlaylistItem.count({ playlist: playlist._id }).then((musicCount) => {
                    playlist._doc.count = musicCount;
                	return playlist;
				});
            });
		})
		.then((results) => {
            return res.status(200).json(results);
		})
		.catch((err) => {
            console.log(err);
			return res.status(500).json(err);
		});
}

export function getPlaylist(req: Request, res: Response) {

	let playlist;

	return Playlist
		.findOne({ _id: req.params.id })
        .populate('owner')
		.then((_playlist) => {
			if (!_playlist) {
				return Promise.reject({})
			}
            playlist = _playlist;
			return PlaylistItem.find({ playlist: _playlist._id }).populate('music');
		})
		.then((musicList) => {
			return Album.populate(musicList, {
				path: 'music.album'
			});
		})
		.then((musicList) => {
			return Author.populate(musicList, {
				path: 'music.author',
				select: 'title'
			});
		})
		.then((musicList) => {
            return res.status(200).json({
				playlist,
                musicList
			});
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
				return Bluebird.resolve([]);
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

	const { title, musicIds, type } = req.body;

	return Playlist
		.findOne({ title })
		.then((playlist) => {
			if (playlist) {
                return Bluebird.reject({ message: 'Playlist with this name already exists' });
			}
			return Playlist.create({
                title,
                owner: req.user.id,
                type: type || 'public'
            })
		})
		.then((createdPlaylist) => {
			return Bluebird
				.map(musicIds, (musicId: string) => (
					PlaylistItem.create({
						playlist: createdPlaylist._id,
						music: musicId
					})
				))
				.then(() => Bluebird.resolve(createdPlaylist));
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
