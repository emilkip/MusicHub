import { model, Schema, Document, Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';


export interface IUser extends Document {
  username: string
  password: string
  salt: string
  admin: boolean
}

const userSchema: Schema = new Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
        select: false
	},
	salt: {
		type: String,
		required: true,
        select: false
	},
	admin: {
		type: Boolean,
		defaultsTo: false
	}
});

export const UserStatics: any = {
	generatePassword(password) {
		let salt;
		return bcrypt.genSalt(10)
			.then((_salt) => {
				salt = _salt;
				return bcrypt.hash(password, _salt)
			})
			.then((hash) => {
				return { salt, hash };
			});
	}
};

export const User: Model<IUser> = model<IUser>('User', userSchema);
