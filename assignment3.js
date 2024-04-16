const { MongoClient } = require("mongodb");
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    // Assignment 3
    // Grab dataset (boxoffice json) and come up with table and collection convention (Done)
    // Query 1: Find all movies that have a rating > 9.2 & a runtime lower than 100m (Done)
    // Query 2: Find all movies with genre of drama OR action (Done)
    // Query 3: Find all movies with visitors > expectedVisitors(Done)
    console.log('in');
    const database = client.db('box_office');
    const movies = database.collection('movies');

    const query1 = {$and: [{"meta.rating": {$gt: 9.2}},{"meta.runtime": {$lt: 100}}]};
    const query2 = {genre: {$in: ['drama', 'action']}};
    const query3 = {$expr: {$gt: ['$visitors', '$expectedVisitors']}};



    const resp = await movies.find(query3).toArray();
    console.log(resp);
  } catch(e) {
    console.error('Failed somehow')
    console.log(e)
  }finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);