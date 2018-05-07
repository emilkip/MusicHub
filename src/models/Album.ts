import { model, Schema, Document, Model } from 'mongoose';
import { IAuthor } from './Author';


export interface IAlbum extends Document {
  	author: IAuthor
  	title: string
  	cover?: string
}

const albumSchema: Schema = new Schema({
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

export const Album: Model<IAlbum> = model<IAlbum>('Album', albumSchema);
