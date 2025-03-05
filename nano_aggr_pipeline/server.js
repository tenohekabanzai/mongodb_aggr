const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express();
mongoose.connect(process.env.mongo).then(()=>console.log("DB connected"))

const priceSchema = mongoose.Schema({
    location: String,
    price:Number,
    bedrooms:Number,
    floor:Number
})

const Price = new mongoose.model("prices",priceSchema);
const p = [
    { "location": "Mumbai", "price": 120, "bedrooms": 3, "floor": 10 },
    { "location": "Mumbai", "price": 95, "bedrooms": 2, "floor": 5 },
    { "location": "Mumbai", "price": 110, "bedrooms": 4, "floor": 12 },
    
    { "location": "Bangalore", "price": 80, "bedrooms": 3, "floor": 7 },
    { "location": "Bangalore", "price": 85, "bedrooms": 2, "floor": 4 },
    { "location": "Bangalore", "price": 90, "bedrooms": 3, "floor": 6 },
  
    { "location": "Delhi", "price": 75, "bedrooms": 2, "floor": 3 },
    { "location": "Delhi", "price": 100, "bedrooms": 3, "floor": 9 },
    { "location": "Delhi", "price": 78, "bedrooms": 2, "floor": 8 },
  
    { "location": "Pune", "price": 70, "bedrooms": 2, "floor": 3 },
    { "location": "Pune", "price": 72, "bedrooms": 3, "floor": 5 },
    { "location": "Pune", "price": 68, "bedrooms": 2, "floor": 6 },
  
    { "location": "Hyderabad", "price": 85, "bedrooms": 3, "floor": 6 },
    { "location": "Hyderabad", "price": 78, "bedrooms": 2, "floor": 7 },
    { "location": "Hyderabad", "price": 90, "bedrooms": 3, "floor": 8 }
  ]

app.post('/insertData',async(req,res)=>{
    try {
        const resp = await Price.insertMany(p);
        console.log("DATA inserted into DB")
    } catch (error) {
        console.log("Some error occurred")
    }
})

app.get('/',async(req,res)=>{
    try {
        const resp = await Price.find();
        res.json(resp)
    } catch (error) {
        
    }
})

// aggregation basics, pipeline here with $match, $group and $sort

app.get('/aggr',async(req,res)=>{
    try {
        const resp = await Price.aggregate([
            {
                $match: { location: "Bangalore" }  // $match for Bangalore location
            },
            {
                $project: {   // Compute totalRooms with $project
                    totalRooms: { $multiply: ["$bedrooms", "$floor"] },
                    price: 1  
                }
            },
            {
                $group: {   // Group by totalRooms
                    _id: "$totalRooms",
                    avgPrice: { $avg: "$price" },  // Compute average price per group
                }
            },
            {
                $sort: {avgPrice:1}
            }
        ])
        res.json(resp);
    } catch (error) {
        console.log(error)
    }
})


app.listen(5001,()=>{console.log("Server running at POST 5001")});