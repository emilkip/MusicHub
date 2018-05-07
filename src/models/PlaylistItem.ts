import { model, Schema, Document, Model } from 'mongoose';
import { IMusic } from './Music';
import { IPlaylist } from './Playlist';


export interface IPlaylistItem extends Document {
	playlist: IPlaylist
  	music: IMusic
}

const playlistItemSchema: Schema = new Schema({
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


export const PlaylistItem: Model<IPlaylistItem> = model<IPlaylistItem>('PlaylistItem', playlistItemSchema);
