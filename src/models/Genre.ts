import { model, Schema, Document, Model } from 'mongoose';


export interface IGenre extends Document {
	title: string
	slug: string
}

const genreSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true,
        unique: true
	}
});

export const Genre: Model<IGenre> = model<IGenre>('Genre', genreSchema);
