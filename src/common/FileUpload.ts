// import {uploadConfig} from '../configs/upload';
const configs = require('../configs/config')(process.env.NODE_ENV);
import * as multer from 'multer';
import {CoverStorage} from './multer-storages/coverStorage';

export function uploadCover() {
    return (req, res, next) => {
        const diskConfig: any = CoverStorage({
            destination: 'public/images/cover',
            fullSize: configs.upload.coverFullCropSize,
            thumbnailSize: configs.upload.coverThumbnailCropSize
        });

        const upload: any = multer({ storage: diskConfig, limits: configs.upload.coverMaxSize }).single('file');

        return upload(req, res, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json(err);
            }

            return next();
        })
    };
}
