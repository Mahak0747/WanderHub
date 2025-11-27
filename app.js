const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverrid= require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require('./utils/ExpressError.js');

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverrid("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderhub');
};

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});

app.get("/",(req,res)=>{
    res.send("Hi I am root");
});


app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


app.use((req, res, next) => {
  next(new ExpressError(404,"Page Not Found!"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!!" } = err;
  res.status(statusCode).render("error",{message})
  // res.status(statusCode).send(message);
}); 