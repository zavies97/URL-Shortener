const {MongoClient} = require('mongodb');

let dbName = process.env.MONGO_INITDB_DATABASE ? process.env.MONGO_INITDB_DATABASE : 'testdb';
let dbUser = process.env.MONGO_INITDB_ROOT_USERNAME ? process.env.MONGO_INITDB_ROOT_USERNAME : 'testuser';
let dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD ? process.env.MONGO_INITDB_ROOT_PASSWORD : 'testpassword';


export async function connectToDb () {
    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    let connection = await MongoClient.connect(mongoDbUrl, {
    useNewUrlParser: true
    });

    const { data } = await connection.db(dbName);

    const response = [
        data,
        connection
    ]

    return response;
};

export async function closeConnection (connection: any, db: any) {
    await connection.close();
    await db.close();
}

export async function dropDatabase (db: any) {
    db.dropDatabase();
}

export async function addURL (requestUrl: any, db: any) {
    const urls = db.collection('urls');

    await urls.insertOne(requestUrl);
}

export async function getOneUrl (requestUrl: any, db: any) {
    const urls = db.collection('urls');

    return await urls.findOne(requestUrl);
}

export async function getAllUrl (requestUrl: any, db: any) {
    const urls = db.collection('urls');
    
    return await urls.find();
}
