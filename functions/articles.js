"use strict";
const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jihgao:5Ka4KGQi6ujFeUF@pocket-cluster-w2avi.mongodb.net/pocket'; // or Atlas connection string

let cachedDb = null;

function connectToDatabase(uri) {
  console.log('=> connect to database');

  if (cachedDb) {
    console.log('=> using cached database instance');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(uri, { useNewUrlParser: true })
    .then(db => {
      cachedDb = db.db('pocket');
      return cachedDb;
    });
}

function queryDatabase(db) {
  console.log('=> query database');

  return db.collection('articles').find({}).limit(10).toArray()
    .then((result) => { return { statusCode: 200, body: JSON.stringify(result) }; })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return { statusCode: 500, body: 'error' };
    });
}

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  console.log('event: ', event);

  connectToDatabase(MONGODB_URI)
    .then(db => queryDatabase(db))
    .then(result => {
      console.log('=> returning result: ', result);
      callback(null, result);
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      callback(err);
    });
};