const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/firangi";

main()
.then(()=>{
    console.log("Connection Successfull!");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
        await mongoose.connect(MONGO_URL);
}


const initdb = async() =>{
   await Listing.deleteMany({});

   const categories = ['Trending', 'Rooms', 'Beach', 'Mountains', 'Cottages', 'City View', 'Pool Villas', 'Nature Stay', 'Camps', 'Meals', 'Parking', 'Pet-Friendly', 'Luxury', 'Near Airport'];

   initdata.data = initdata.data.map((obj) => ({
       ...obj, 
       owner : "687c8541826af549cb914723",
       category: categories[Math.floor(Math.random() * categories.length)]
   }))

   await Listing.insertMany(initdata.data);

   console.log("Data was initialized !");
}

initdb();

