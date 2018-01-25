import { model, Schema, Document } from 'mongoose';


export interface IGenre extends Document {
  title: string;
  slug: string;
}

const genreSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	}
});

export const Genre = model<IGenre>('Genre', genreSchema);
