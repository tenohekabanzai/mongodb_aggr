// MONGODB INDEXING
// -> without indexing MongoDB applies linear search over all elements of the collection
// -> with indexing, it applies Binary Search over that Index instead of lin seearch
// if we index a collection according to a fielf eg, name, a new DS is created that stores the indexes of the name field in a sorted order to allow Binary Search
// data structure used to stor index => BALANCED TREE

// any searching will now occur on the index and not on the main collection
// Pros of indexing -> Better READ Latency
// Cons of indexing -> More Memory required to store Indexes, Write Operation Latency increases

// Types of Indexes -
// Single Field Index
// Compound Index
// Text Index

// CREATING A SINGLE FIELD INDEX on asc val of age
db.teachers.createIndex({"age":1})
// REMOVE AN INDEX
db.teachers.dropIndex("age_1")
// CREATING AN INDEX WITH A UNIQUE CONSTRAINT
db.teachers.createIndex({ "name": 1 }, { unique: true }); // will not allow insertion of another entry with same name

// WHEN NOT TO USE INDEXING ??
// when collection in small
// when collections if frequently updated (frequent writes/updates)
// when cmplex queries are involved
// when collection is large (make less indexes)

// COMPOUND INDEX
db.teachers.createIndex({"age":1,"gender":1})

// INDEXING WITH PARTIAL filters
// only create an index on age where age>=22
db.teachers.createIndex({age:1},{particularFilterExpression:{age:{$gte:22}}})
// only create an index on age for the tuples where gender filed exists
db.teachers.createIndex({name:1},{particularFilterExpression:{gender:{$exists:true}}})

// this only works on date field and single field index
db.teachers.createIndex({"expires":1},{expireAfterSeconds:3600})

// MUTIPLE INDEX CONDITION
// if a query can access more than 1 index, which one will it use ?
// MONGODB checks performance of index on a sample of docs once the queries are run and set it as Optimal index to run for future queries

// that efficient index is stored in a cache
// CACHE updated after 100 writes
// Index is reset
// Mongo Server is restaretd
// Other indexes are manipulated

// MULTI KEY INDEX
// eg we create an Index on a field which stores keys in an Array
//  {
//     _id: ObjectId('67c938f82aeca683066d750d'),
//     name: 'Geeta',
//     Hobbies: [ 'Walking', 'Reading' ],
//     bio: 'I just code',
//     experience: [
//       { company: 'Amazon', duration: 2, neglect: false },
//       { company: 'Flipkart', duration: 1, neglect: true }
//     ],
//     age: 0
//   }
// eg we create an index on Hobbies field
db.students.createIndex({"Hobbies":1})
// here an index is created for every distinct element of the Hobbies array for each student tuple
// very memory intensive to do multi Key indexing in this case

// TEXT index
// creating a text index on bio field
db.students.createIndex({bio:"text"},{background:true})
// creating a compound text index
db.students.createIndex({name:"text",bio:"text"},{background:true})
// searching for single word
db.students.find({$text:{$search:"youtube"}})
// searching for multiple words
db.students.find({$text:{$search:"youtube "}})

// sorting for relevance on basis of textscore
db.students.find({TextScore:{$meta:"textScore"}},{$text:{$search:"database"}},{score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}})

// applying weights on text-indexing
db.students.createindex({name:"text",bio:"text"},{weights:{name:1000,bio:1}})

