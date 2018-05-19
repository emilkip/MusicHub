import { model, Schema, Document, Model } from 'mongoose';
import { IAuthor } from './Author';
import { IUser } from './User';


export interface IPlaylist extends Document {
	title: string
  	owner: IUser
}

const playlistSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	owner: {
		ref: 'User',
		type: Schema.Types.ObjectId,
		required: true
	},
	type: {
		type: String,
		enum: ['private', 'public', 'favorite'],
		required: true
	}
});

export const Playlist: Model<IPlaylist> = model<IPlaylist>('Playlist', playlistSchema);
