
import * as multer from 'multer';


export const uploadConfig = {

	audio: multer({
		dest: 'public/audio'
	}),

	cover: multer({
		dest: 'public/images/cover'
	})
};
