const {MongoClient} = require('mongodb');

import URLShortener from './../URLShortener';

let dbName = process.env.MONGO_INITDB_DATABASE ? process.env.MONGO_INITDB_DATABASE : 'testdb';
let dbUser = process.env.MONGO_INITDB_ROOT_USERNAME ? process.env.MONGO_INITDB_ROOT_USERNAME : 'testuser';
let dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD ? process.env.MONGO_INITDB_ROOT_PASSWORD : 'testpassword';

// type RequestUrl = {
//     shortenedUrl: string,
//     originalUrl: string
// }

export async function dropDatabase () {
    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    let connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
    });
    let db = await connection.db(dbName);

    db.dropDatabase();

    await connection.close();

}

export async function addURL(requestUrl: Object) {

    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    let connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
    });
    let db = await connection.db(dbName);

    const urls = db.collection('urls');

    await urls.insertOne(requestUrl);

    await connection.close();

}

export async function getOneUrl (requestUrl: Object){
    
    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    let connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
    });
    let db = await connection.db(dbName);

    const urls = db.collection('urls');

    const foundUrl = await urls.findOne(requestUrl)

    await connection.close();

    return foundUrl;
}

export async function getAllUrl () {

    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    let connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
    });
    let db = await connection.db(dbName);
    const urls = db.collection('urls');

    const allUrls = await urls.find().toArray();

    await connection.close();
    
    return allUrls;
}
