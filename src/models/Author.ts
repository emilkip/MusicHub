import { model, Schema, Document } from 'mongoose';


export interface IAuthor extends Document {
  	author: string;
}


const authorSchema = new Schema({
	title: {
		type: String,
		required: true
	}
});

export const Author = model<IAuthor>('Author', authorSchema);
