const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        filename:String,
        url:String,
    },
    
    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
    type: {
        type: String,
        enum: ["Point"],
    },
    coordinates: {
        type: [Number],
    },
},
// models/listing.js — add inside listingSchema
category: {
    type: String,
    enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Amazing Pools",
         "Camping", "Beaches", "Farms", "Arctic", "Domes", "Boats"],
    default: "Trending",
},

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const listing=mongoose.model("listing",listingSchema);
module.exports=listing;