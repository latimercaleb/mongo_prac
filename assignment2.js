    // Assignment 2 insert company data to a collection
    // Use insertOne & insertMany
    // Insert duplicate ID data, fix it via unordered inserts
    // Do an insert with jorunaling or no journaling

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

