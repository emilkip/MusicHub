const Promise = require('bluebird');
const slug = require('slug');
const genres = require('./data/genres');
const GenreModel = require('../dist_server/models/Genre');


module.exports.run = () => {
    const genresDocs = genres.list.map((genre) => ({ title: genre, slug: slug(genre).toLowerCase() }));

    return Promise
        .map(genresDocs, (genre) => {
            return GenreModel.Genre.create(genre);
        })
        .then((createdGenres) => {
            console.log(`${createdGenres.length} genres created`);
            process.exit(0);
        }).catch((err) => {
            console.log(err);
            process.exit(1);
        })
};