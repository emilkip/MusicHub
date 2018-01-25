import { model, Schema, Document } from 'mongoose';
import { IMusic } from './Music';
import { IPlaylist } from './Playlist';


export interface IPlaylistItem extends Document {
	playlist: IPlaylist;
  	music: IMusic;
}

const playlistItemSchema = new Schema({
	playlist: {
		ref: 'Playlist',
		type: Schema.Types.ObjectId,
		required: true
	},
	music: {
		ref: 'Music',
		type: Schema.Types.ObjectId,
		required: true
	}
});


export const PlaylistItem = model<IPlaylistItem>('PlaylistItem', playlistItemSchema);
