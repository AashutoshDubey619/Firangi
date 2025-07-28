const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("./Models/listing.js");
require('dotenv').config();

const dbURL = process.env.ATLASDB_URL;

if (!dbURL) {
  console.error("Error: ATLASDB_URL environment variable is not set.");
  process.exit(1);
}

main()
  .then(() => {
    console.log("Connection Successful!");
    return initdb();
  })
  .then(() => {
    console.log("Data initialization complete!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  });

async function main() {
  await mongoose.connect(dbURL);
}

async function initdb() {
  await Listing.deleteMany({});

  
  const ownerId = "688712cfd557f04f25504a7f";

  const dataWithOwner = initdata.data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));

  await Listing.insertMany(dataWithOwner);
}
