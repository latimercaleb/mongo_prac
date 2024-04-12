const { MongoClient } = require('mongodb');
const client = new MongoClient('mongodb://localhost:27017');

async function run() {
	try {
		console.log('in');
		const database = client.db('movies');
		const tv = database.collection('tv');

        // Comparisons
		const resp = await tv.findOne({}); // Simply returns first record
		const resp2 = await tv.findOne({ name: 'The Last Ship' }); // Simply returns first record
		const resp3 = await tv.findOne({ runtime: { $eq: 60 } }); // Example of $eq operator, same logic as above but with an operator syntax

		const resp4 = await tv.find({ runtime: { $lt: 60 } }).toArray(); // Using filter but returning more than one and getting data from cursor object
		// console.log(resp4.length); // 68 for dataset

		const resp5 = await tv.find({ runtime: { $lte: 60 } }).toArray();
		// console.log(resp5.length); // 238 for dataset

		const resp6 = await tv.findOne({ 'network.name': { $ne: 'CBS' } }); // Query an embedded document where network name is not cbs
		const resp7 = await tv.find({ genres: 'Western' }).toArray(); // Query an item being in an array
		const resp8 = await tv.find({ genres: ['Drama'] }).toArray(); // Query an item being in an EXACT array

        const resp9 = await tv.find({runtime: {$in: [30, 42]}}).toArray(); // 2 distinct values to search for
        // console.log(resp9.length); // removing a value will change the count accordingly

        const resp10 = await tv.find({runtime: {$in: [30, 42]}}).toArray(); // all values not in the list
        // console.log(resp10)

        // Logical operators
        const a = await tv.find({$or: [{weight: {$lt: 90}},{weight: {$gt: 80}}]}).toArray(); // Data with that fits any condition in the []
        console.log(a.length) // Can change to $nor for neither of those conditions, $and for matching all conditions, and $not is simply inverts an expression but $nor and $ne are better short hands
	
        // Element operators 
        const b = await tv.find({type: {$exists: true, $eq: "Scripted"}}).toArray(); // Implicit $and such that a field exists AND equals a value
        console.log(b.length)

        const c = await tv.find({runtime: {$type: "number"}}).toArray(); // Query only data that has a field of a certain type
        console.log(c.length)
    } catch (e) {
		console.error('Failed somehow');
		console.log(e);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
