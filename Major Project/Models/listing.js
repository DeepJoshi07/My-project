const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
        required: true,
    },
    description: String,
    price: Number,
    location: String,
    image: {
        filename:{
            type:String,
            default:"listing image",
            set:(v) => v === "" ?"listing image":v,
        },
        url:{
            type:String,
            default:"https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg",
            set:(v) => v === "" ?"https://gratisography.com/wp-content/uploads/2024/10/gratisography-cool-cat-800x525.jpg":v,
        }
        
    },
    country:String,
});

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;