const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderhub');
}

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
})

app.get("/",(req,res)=>{
    res.send("Hi I am root");
})

app.get("/testListing",async(req,res)=>{
    let testListing=new Listing({
      title:"My new Villa",
      distciption:"By the beach",
      price:1200,
      location:"Calangute, Goa",
      country:"India"
    });
    await testListing.save();
    console.log("sample was saved");
    res.send("succesful testing");
})