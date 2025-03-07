// db.collection.aggregate(pipeline.options)

// find all matching tuples
db.teachers.aggregate([{$match:{gender:"male"}}])

// group tuples by age fields ie creating a new tuple for each unique age value
db.teachers.aggregate([{$group:{_id:"$age"}}])

// group tuples by age and display names in each group
db.teachers.aggregate([{$group:{_id:"$age",names:{$push:"$name"}}}])

// group tuples by age and push entire tuples into a field called entries
db.teachers.aggregate([{$group:{_id:"$age",entries:{$push:"$$ROOT"}}}])


// fetch all male teachers and group them by age and display the count of each age group
db.teachers.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",number:{$sum:1}}}])

db.teachers.aggregate([{$match:{gender:"male"}},{$group:{_id:"$age",numberOfTeachers:{$sum:1}}},{$sort:{numberOfTeachers:-1}},{$group:{_id:null,maxNumberInAgeGroup:{$max:"$numberOfTeachers"}}}])

// group by age and print sum of ages in each group (here $toDouble does typecasting into double)
db.teachers.aggregate([{$group:{_id:"$age",sumofAges:{$sum:{$toDouble:"$age"}}}}])

// $unwind, create multiple copies of the tuple each with a single element of the field that is unwind
db.students.aggregate([{$unwind:"$Hobbies"}])
// shows the count of people according to their hobbies
db.students.aggregate([{$unwind:"$Hobbies"},{$group:{_id:"$Hobbies", count:{$sum:1}}}])
db.students.aggregate([{$unwind:"$Hobbies"},{$group:{_id:"$Hobbies"}}])

// total number of hobbies
db.students.aggregate([{$group:{_id:null,count:{$sum:{$size:{$ifNull:["$Hobbies",[]]}}}}}])



// show the average score of every entry with age>25 / scores is an array here
db.emp.aggregate([{$match:{age:{$gt:25}}},{$project:{age:1,name:1,avgScore:{$avg:"$scores"}}}])

