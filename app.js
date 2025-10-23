const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");
const methodOverrid= require('method-override');
const ejsMate=require('ejs-mate');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverrid("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

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

// app.get("/testListing",async(req,res)=>{
//     let testListing=new Listing({
//       title:"My new Villa",
//       distciption:"By the beach",
//       price:1200,
//       location:"Calangute, Goa",
//       country:"India"
//     });
//     await testListing.save();
//     console.log("sample was saved");
//     res.send("succesful testing");
// })

app.get("/listings",async(req,res)=>{
  const allListings=await Listing.find({})
  res.render("listings/index",{allListings});
})

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})

app.post("/listings",async(req,res)=>{
  // let {title,description,image,price,location,country}=req.body;
  // let newListing=new Listing({
  //   title:title,
  //   description:description,
  //   image:image,
  //   price:price,
  //   location:location,
  //   country:country
  // })
  // newListing.save()
  // .then((result)=>{
  //     res.redirect("/listings");
  // })
  // .catch((err) => {
  //   console.log(err)
  // }); 
  let newListing=new Listing(req.body.listing); 
  await newListing.save();
  res.redirect("/listings"); 
})

app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  res.render("listings/show",{listing});
})

app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  res.render("listings/edit",{listing});
})

app.put("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
})