import * as mongoose from "mongoose";
const configs = require('./config')(process.env.NODE_ENV);

mongoose
    .connect(`mongodb://${configs.mongodb.host}:${configs.mongodb.port}/${configs.mongodb.dbName}`)
    .then(() => {
        console.log('Connected to mongoDB');
    })
    .catch((err) => {
        console.log(err)
    });

// mongoose.set('debug', true);

export default mongoose;
