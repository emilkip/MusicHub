
module.exports = (env) => {
    const configs = {
        development: {
            mongodb: {
                host: 'localhost',
                dbName: 'music_hub',
                port: 27017
            },
            upload: {
                coverMaxSize: 10000000,
                audioMaxSize: 30000000,
                coverFullCropSize: 700,
                coverThumbnailCropSize: 300
            }
        },
        production: {
            mongodb: {
                host: 'mongo',
                dbName: 'music_hub',
                port: 27017
            },
            upload: {
                coverMaxSize: 5000000,
                audioMaxSize: 10000000,
                coverFullCropSize: 700,
                coverThumbnailCropSize: 300
            }
        }
    };

    if (!env || (env in configs)) env = 'development';

    return configs[env];
};
