const users = require('../data/users');
const addresses = require('../data/addresses');
const mongoose = require('mongoose');
const { faker: fakerHU } = require('@faker-js/faker');
const clipboardy = require('node-clipboardy');

const existingLength = users.length;
const numOfUsers = 100;

for (let i = 0; i < numOfUsers; i++) {
  let user = createRandomUser();

  if (i < existingLength) {
    user = users[i];
  }

  user.addresses.push(addresses[i]._id);

  users.push(user);
}

const jsArrayString = JSON.stringify(users, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);

function createRandomUser() {
  return {
    _id: new mongoose.Types.ObjectId(),
    emailAddress: fakerHU.internet.email(),
    phoneNumber: fakerHU.phone.number(),
    password: 'Asdasd42',
    firstName: fakerHU.person.firstName(),
    lastName: fakerHU.person.lastName(),
    registrationDate: fakerHU.date.recent({ days: 10 }),
    role: fakerHU.helpers.arrayElement(['user']),
    twoFactorEnabled: fakerHU.datatype.boolean(0.2),
    active: true,
    emailConfirmed: true,
    profilePhoto:
      'https://firebasestorage.googleapis.com/v0/b/average-js-webshop.appspot.com/o/profile-photos%2Fdefault.png?alt=media',
    addresses: [],
  };
}
