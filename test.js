// create a db
use books
// create a collection
books.createCollection("nonfiction")
// drop database
db.dropDatabase()

// CRUD (INSERT/FIND/UPDATE/DELETE)

// INSERT
db.nonfiction.insertOne({name:"Abc",price:100})
db.nonfiction.insertMany([{name:"Def",price:101},{name:"Efg",price:103},{name:"Fgh",price:102}])

// FIND
// find all the nos
db.nonfiction.find()
// find by some field
db.nonfiction.find({name:"Abc"})
db.nonfiction.find({price:100})
db.nonfiction.find({price:{$lte:100}})
db.nonfiction.find({price:{$gte:101}})
db.nonfiction.find({price:{$gte:101,$lte:1000}})
db,nonfiction.find({price:{$in:[100,1001,101]}})
db,nonfiction.find({price:{$nin:[99,1001,101]}})

// UPDATE
// update one
db.nonfiction.updateOne(
    {name:"Abc"},
    {$set:{price:500}}
)
// update many
db.nonfiction.updateMany(
    {price: {$lte: 101}},
    {$set: {price:300}}
)

// DELETE
// deleteOne
db.nonfiction.deleteOne({name:"Abc"})
db.nonfiction.deleteMany({price:{$gte:1000}})
// deletes all entries
db.nonfiction.deleteMany({})

// select column query
db.nonfiction.find({},{name:1})
db.nonfiction.find({},{price:1})

// schema validation
db.createCollection("nonfiction",{
    validator:{
        $jsonSchema:{
            required:['name','price'],
            properties:{
                name:{
                    bsonType: 'string',
                    description: 'must be a string and required'
                },
                price:{
                    bsonType:'number',
                    description: 'must be a number and required'
                },
                author:{
                    bsonType:'array',
                    description: 'must be an array',
                    items:{
                        bsonType:'object',
                        required:["name",'email'],
                        properties:{
                            name:{bsonType:'string'},
                            email:{bsonType:'string'},
                        }
                    }
                }
            }
        }
    },
    validatorAction:'error'
})

// insert entries into mongodb database using a json file
// install mongoimport cmd tool
// use the following string
mongoimport "C:\Users\bypt-lenovo2\Desktop\mongodb\tmp.json" -d college -c students --jsonArray --drop
// mongoimport --path-to-jsonfile -d dbName -pc collectionName --jsonArray --drop
// here --jsonArray needs to be specified or the db stores all entries of jsonfile as a single tuple. and --drop here specifies to drop the collection with same name if it already exists in the db


// logical operators in mongodb
// OR
db.students.find({$or:[{age:{$lte:34}},{age:{$gte:35}}]})
// NOR
db.students.find({$nor:[{age:{$lte:29}},{age:{$gte:34}}]})
// AND
db.students.find({$and:[{age:{$lte:35}},{age:{$gte:29}}]})
// NOT
db.students.find({$and:[{age:{$not:{$gte:35}}},{age:{$not:{$lte:29}}}]})

// $exists and $type
// $exists is used to check if the tuple contains a specific field
db.book.find({isbn:{$exists:true}})
// $type is used to check the type of a specific field
db.book.find({isbn:{$exists:true,$type:"string"}})


// Evaluation Operators
// $expr -> helps use aggregation expressions within the query language
db.books.find({$expr : {$gt: ["$price", "$discountedPrice"]}}) // show fields where price is greater than dicountedPrice

// $jsonSchema -> Validate documents against he given JSON Schema

