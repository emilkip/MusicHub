import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import * as mkdirp from 'mkdirp';
import * as sharp from 'sharp';


function getFilename(): string {
    return crypto.randomBytes(16).toString('hex');
}

function CropFull(size: number): sharp.SharpInstance {
    return sharp().resize(size, size);
}

function Storage (params: any = {}) {
    this.filename = getFilename();
    this.fullSize = params.fullSize || 700;
    this.thumbnailSize = params.thumbnailSize || 300;

    if (typeof params.destination === 'string') {
        this.destination = path.join(params.destination, this.filename);
    } else {
        this.destination = os.tmpdir();
    }
}

Storage.prototype._handleFile = function(req, file, cb) {
    mkdirp.sync(this.destination);

    const finalPathFull: string = path.join(this.destination, 'full');
    const finalPathThumbnail: string = path.join(this.destination, 'thumbnail');

    const outFullStream: fs.WriteStream = fs.createWriteStream(finalPathFull);
    const outThumbnailStream: fs.WriteStream = fs.createWriteStream(finalPathThumbnail);
    const cropFullStream: sharp.SharpInstance = CropFull(this.fullSize);
    const cropThumbnailStream: sharp.SharpInstance = CropFull(this.thumbnailSize);

    file.stream
        .pipe(cropFullStream)
        .pipe(outFullStream);

    file.stream
        .pipe(cropThumbnailStream)
        .pipe(outThumbnailStream);

    cropThumbnailStream.on('error', (err) => {
        cb(err);
    });
    outThumbnailStream.on('error', (err) => {
        cb(err);
    });
    cropFullStream.on('error', (err) => {
        cb(err);
    });
    outFullStream.on('error', (err) => {
        cb(err);
    });
    outFullStream.on('finish',() => {
        cb(null, {
            destination: this.destination,
            filename: this.filename,
            path: finalPathFull,
            size: outFullStream.bytesWritten
        })
    })
};

Storage.prototype._removeFile = function _removeFile (req, file, cb) {
    const path: string = file.path;

    delete file.destination;
    delete file.filename;
    delete file.path;

    fs.unlink(path, cb)
};

export const CoverStorage = (opts) => new Storage(opts);
