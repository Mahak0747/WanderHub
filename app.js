const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Listing=require("./models/listing.js");
const methodOverrid= require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsyc=require('./utils/wrapAsyc.js')
const ExpressError=require('./utils/ExpressError.js')

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

app.get("/listings",wrapAsyc(async(req,res)=>{
  const allListings=await Listing.find({})
  res.render("listings/index",{allListings});
}))

app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
})

//create route
app.post("/listings",wrapAsyc(async(req,res)=>{
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
  if(!req.body.listing){
    throw new ExpressError(404,"Send valid data for listing")
  }
  let newListing=new Listing(req.body.listing); 
  await newListing.save();
  res.redirect("/listings"); 
}))

//show route
app.get("/listings/:id",wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  res.render("listings/show",{listing});
}))

app.get("/listings/:id/edit",wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  let listing=await Listing.findById(id);
  res.render("listings/edit",{listing});
}))

//update route
app.put("/listings/:id",wrapAsyc(async(req,res)=>{
  if(!req.body.listing){
    throw new ExpressError(404,"Send valid data for listing")
  }
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
}))

app.delete("/listings/:id",wrapAsyc(async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}))

app.use((req, res, next) => {
  next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!!" } = err;
  res.render("error",{message})
  // res.status(statusCode).send(message);
}); 