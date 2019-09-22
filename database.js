'use strict';

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbname = 'runlog';

const faker = require('faker');

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    console.error(err);
    throw err;
  }

  const db = client.db(dbname);
  const collection = db.collection('runs');

  collection.insert(
    [
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Tempo",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Hills",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Intervals",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Hills",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Hills",
        "notes": faker.lorem.sentence(5)
      },
      {
        "userId": "5d879ab678a7b945f7a9c844",
        "distance": faker.finance.amount(1, 20, 2),
        "date": faker.date.recent(60),
        "elapsedTime": faker.finance.amount(5, 80, 2),
        "workoutType": "Easy",
        "notes": faker.lorem.sentence(5)
      }

    ],
    (err, result) => {
      collection.find({}).toArray((err, items) => {
        if (err) {
          throw err;
        }
        console.log('items', items);
        client.close();
      });
    }
  )
});