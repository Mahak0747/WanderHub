const mongoose=require("mongoose");
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fstocksnap.io%2Fsearch%2Fbeach&psig=AOvVaw0-8kORe2Z2OOKEUM9fa55L&ust=1761025639616000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC6sPCJspADFQAAAAAdAAAAABAL",
        set: (v)=> v==="" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstocksnap.io%2Fsearch%2Fbeach&psig=AOvVaw0-8kORe2Z2OOKEUM9fa55L&ust=1761025639616000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJC6sPCJspADFQAAAAAdAAAAABAL":v,
    },
    price:Number,
    location:String,
    country:String
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;