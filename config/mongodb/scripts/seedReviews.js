const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const clipboardy = require('node-clipboardy');

const users = require('../data/users');
const reviews = [];
const numOfReviews = 100;

for (let i = 0; i < numOfReviews; i++) {
  reviews.push(getRandomReview());
}

const jsArrayString = JSON.stringify(reviews, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);

function getRandomReview() {
  return {
    _id: new mongoose.Types.ObjectId(),
    userID: getRandomUser()._id,
    rating: faker.number.int({ min: 1, max: 5 }),
    title: faker.word.words(3),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.recent(),
    isHidden: faker.datatype.boolean(0.2),
  };
}

function getRandomUser() {
  const randomIndex = Math.floor(Math.random() * users.length);
  return users[randomIndex];
}
