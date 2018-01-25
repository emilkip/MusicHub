import { model, Schema, Document } from 'mongoose';
import { IAuthor } from './Author';
import { IUser } from './User';


export interface IPlaylist extends Document {
	title: string;
  	owner: IUser;
}

const playlistSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	owner: {
		ref: 'User',
		type: Schema.Types.ObjectId,
		required: true
	}
});

export const Playlist = model<IPlaylist>('Playlist', playlistSchema);
