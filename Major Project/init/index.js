const mongoose = require('mongoose');
const Listing = require('../Models/listing.js');
const initData = require('./data.js');


const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

main()
.then((res)=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDb = async() =>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data has been added");
};

initDb();