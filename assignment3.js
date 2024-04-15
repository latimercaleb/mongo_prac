const { MongoClient } = require("mongodb");
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
  try {
    // Assignment 3
    // Grab dataset (boxoffice json) and come up with table and collection convention
    // Query 1: Find all movies that have a rating > 9.2 & a runtime lower than 100m
    // Query 2: Find all movies with genre of drama OR action 
    // Query 3: Find all movies with visitors > expectedVisitors
    // Query 4: Use unique operator and query something yourself
    // Query 5: Make custom complex query yourself
    // Do this all via nodejs driver compare code
    console.log('in');
    const database = client.db('exercise2');
    const fighters = database.collection('champions');
    // console.log(movies);
    // Query for a movie that has the title 'Back to the Future'
    const queryToInsert1 = { _id: 'KI', name: 'Jago' , style: 'kung-fu'};
    const queryToInsertMany = [
      {_id: 'SF', name: 'Ken', style: 'shoto'}, 
      {_id: 'STRIDER', name: 'hiryu', style: 'ninjutsu'}, 
      {_id: 'MK', name: 'liu kang', style: 'shaolin'}
    ];
    const queryToInsertManyWithConflict = [
      {_id: 'SF', name: 'ryu', style: 'shoto'},
      {_id: 'MK', name: 'kung lao', style: 'shaolin'},
      {_id: 'tekken', name: 'jin', style: 'karate'}
    ];
    const queryWithJournal = {
      _id: 'maverick hunter',
      name: 'zero',
      style: 'saber'
    };
    const resp = await fighters.insertOne(queryWithJournal, {w: 1, j: true});
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