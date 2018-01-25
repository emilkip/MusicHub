import { model, Schema, Document } from 'mongoose';
import { IAuthor } from './Author';
import { IAlbum } from './Album';
import { IGenre } from './Genre';
import { IUser } from './User';


export interface IMusic extends Document {
  	author: IAuthor;
  	genre: IGenre;
  	album: IAlbum;
  	creator: IUser;
	title: string;
  	filename: string;
}


const musicSchema = new Schema({
	author: {
		ref: 'Author',
		type: Schema.Types.ObjectId,
		required: true
	},
	genre: {
		ref: 'Genre',
		type: Schema.Types.ObjectId,
		required: true
	},
	album: {
		ref: 'Album',
		type: Schema.Types.ObjectId,
		required: true
	},
	creator: {
		ref: 'User',
		type: Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	filename: {
		type: String
	}
});


export const Music = model<IMusic>('Music', musicSchema);
