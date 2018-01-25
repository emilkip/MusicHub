import { model, Schema, Document } from 'mongoose';
import { IAuthor } from './Author';


export interface IAlbum extends Document {
  	author: IAuthor;
  	title: string;
  	cover?: string;
}

const albumSchema = new Schema({
	author: {
		ref: 'Author',
		type: Schema.Types.ObjectId
	},
	title: {
		type: String,
		required: true
	},
	cover: {
		type: String
	}
});

export const Album = model<IAlbum>('Album', albumSchema);
