const {MongoClient} = require('mongodb');

let dbName = process.env.MONGO_INITDB_DATABASE ? process.env.MONGO_INITDB_DATABASE : 'testdb';
let dbUser = process.env.MONGO_INITDB_ROOT_USERNAME ? process.env.MONGO_INITDB_ROOT_USERNAME : 'testuser';
let dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD ? process.env.MONGO_INITDB_ROOT_PASSWORD : 'testpassword';

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {

    const mongoDbUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/';

    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
    });
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  afterAll(async () => {
    db.dropDatabase();
  })

  it('should insert a new url', async () => {
    const urls = db.collection('urls');

    const mockUrl = {shortenedUrl: 'https://pbid.io/1bcu74yr', originalUrl: 'https://thisisnaexamplesite'};
    await urls.insertOne(mockUrl);

    const addedUrl = await urls.findOne({shortenedUrl: 'https://pbid.io/1bcu74yr'});
    expect(addedUrl).toEqual(mockUrl);
  });

  it('should retrieve known url from db', async () => {
    const urls = db.collection('urls');

    const mockUrl = { shortenedUrl: 'https://pbid.io/1bcu74yr', originalUrl: 'https://thisisnaexamplesite'};

    const addedUrl = await urls.findOne({shortenedUrl: 'https://pbid.io/1bcu74yr'});
    expect(addedUrl.originalUrl).toEqual(mockUrl.originalUrl);
  })
});