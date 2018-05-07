import { model, Schema, Document, Model } from 'mongoose';


export interface IAuthor extends Document {
    title: string
	slug: string
}


const authorSchema: Schema = new Schema({
	title: {
		type: String,
		required: true
	},
	slug: {
        type: String,
        required: true
	}
});

export const Author: Model<IAuthor> = model<IAuthor>('Author', authorSchema);
