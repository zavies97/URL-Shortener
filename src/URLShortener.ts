import * as mongoose from "mongoose";

let dbName = process.env.MONGO_INITDB_DATABASE ? process.env.MONGO_INITDB_DATABASE : 'testdb';
let dbUser = process.env.MONGO_INITDB_ROOT_USERNAME ? process.env.MONGO_INITDB_ROOT_USERNAME : 'testuser';
let dbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD ? process.env.MONGO_INITDB_ROOT_PASSWORD : 'testpassword';

const uri: string = 'mongodb://' + dbUser + ':' + dbPassword + '@127.0.0.1:27017/' + dbName;
// mongodb://testuser:testpassword@127.0.0.1:27017/testdb

mongoose.connect(uri, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Successfully Connected!");
  }
});

export interface URLShortenerInterface extends mongoose.Document {
  shortenedUrl: string;
  originalUrl: string;
}

export const URLShortenerSchema = new mongoose.Schema({
  shortenedUrl: { type: String, required: true, unique: true },
  originalUrl: { type: String, required: true }
});

const URLShortener = mongoose.model<URLShortenerInterface>("URLShortener", URLShortenerSchema);
export default URLShortener;