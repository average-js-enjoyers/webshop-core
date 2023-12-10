const mongoose = require('mongoose');
const { faker: faker } = require('@faker-js/faker');
const clipboardy = require('node-clipboardy');

const numOfAddresses = 100;
const addresses = [];

for (let i = 0; i < numOfAddresses; i++) {
  const address = createRandomAddress();
  addresses.push(address);
}

const jsArrayString = JSON.stringify(addresses, null, 2);

clipboardy.writeSync(jsArrayString);

console.log(jsArrayString);

function createRandomAddress() {
  return {
    _id: new mongoose.Types.ObjectId(),
    city: faker.location.city(),
    region: faker.location.state(),
    vatID: faker.number.int(66666, 99999),
    type: faker.helpers.arrayElement(['Both', 'Shipping', 'Billing']),
    isActive: false,
    company: faker.company.name(),
    addressLine: faker.location.streetAddress({ useFullAddress: true }),
    zip: faker.location.zipCode('####'),
    name: faker.animal.cat(),
    country: faker.location.country(),
    phoneNumber: faker.phone.number(),
  };
}
