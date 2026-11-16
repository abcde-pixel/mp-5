import {MongoClient, Db, Collection} from 'mongodb';

//this file is used to connect to the database and it is also the only place we can connect to
//db to access the data there
const MONGO_URI = process.env.MONGO_URI as string;
//if we cannot find MONGO_URI in .env.local, stop here and show an error
if(!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

const DB_NAME = "URL-Shortener"; //give our db a name and we will use this name to access it in the future
//the collection stores all the alias and url pairs, we export it so other files will use the same name
export const URLS_COLLECTION = "urls-collection";

let client: MongoClient | null = null; //the connection to mongodb, null means we have not connected yet
let db: Db | null = null; //our database, null means we have not gotten it yet

//we use this method (connect()) to access to our db and get data
//this is an async function because we do not want to be stuck and wait a long time for the data to be
//given without doing anything else
async function connect(): Promise<Db> {
    //if our server has not connected to MongoDB, then create a new client and connect
    if(!client) {
        client = new MongoClient(MONGO_URI); //create a client using our MONGO_URI
        await client.connect(); //wait for the client server side to connect to the db successfully
    }
    return client.db(DB_NAME); //return the database with the name we gave
}

//different from connect(), this method allows us to gather the data we achieved from db,
//then we can use find() or insertOne() to read or write data
export default async function getCollection(
    collectionName: string,
): Promise<Collection>{
    //if not gotten the db yet, call connect() to get it
    if(!db){
        db = await connect();
    }
    return db.collection(collectionName); //return the collection we want from the db
}