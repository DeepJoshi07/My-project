const express = require('express');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const Listing = require("./Models/listing.js");
const methodOverride = require('method-override');
const ejs_mate = require('ejs-mate');


const MONGO_URL = "mongodb://127.0.0.1:27017/wonderlust";

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejs_mate);
app.use(express.static(path.join(__dirname,"public")));

main()
.then((res)=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.listen(port,()=>{
    console.log("Server is running on port 8080");
});

app.get("/",(req,res)=>{
    res.send("port is working");
});

// app.get("/testListing",async(req,res)=>{
//     let sempleListing = new Listing ({
//         title: "Sample Listing",
//         description: "Sample Description",
//         price: 1000,
//         location:"gujarat",
//         country:"india",
//     });

//      await sempleListing.save();
//      console.log("semple has been saved");
//      res.send("testing successful");
// });

app.get("/listings",async(req,res)=>{
    let listing = await Listing.find({});
    
    res.render("listings/index.ejs",{listing});
});

app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

app.get("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    
    res.render("listings/show.ejs",{listing});
});

app.post("/listings",async(req,res)=>{
    let new_listing = new Listing(req.body.listing);
    await new_listing.save();
    res.redirect("/listings");
});

app.get("/listings/:id/edit",async(req,res)=>{
    let id = req.params.id;
    const listing = await Listing.findById(id);
    
    res.render("listings/edit.ejs",{listing});
});

app.put("/listings/:id/edit",async(req,res)=>{
    let id = req.params.id;
    await Listing.findByIdAndUpdate(id,{...req.body.listing},{setDefaultsOnInsert:true});
    res.redirect("/listings");
});

app.delete("/listings/:id",async(req,res)=>{
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});