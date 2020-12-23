// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')


const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) =>{
    if (error){
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // const updatePromise = db.collection('users').updateOne(
    //     {
    //         _id: ObjectID('5fd8c6f786180a116a4dafbe')
    //     },
    //     {
    //         $set: {
    //             name: 'shayan zp'
    //         }
    //     }
    // )
    //
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })
    // const updatePromise = db.collection('users').updateOne(
    //     {
    //         _id: ObjectID('5fd8c6f786180a116a4dafbe')
    //     },
    //     {
    //         $inc: {
    //             age: 1
    //         }
    //     }
    // )
    //
    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // const updateManyPromise = db.collection('tasks').updateMany(
    //     {
    //         completed: false
    //     },{
    //         $set: {
    //             completed: true
    //         }
    //     }
    // )
    //
    // updateManyPromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


    // db.collection('users').deleteMany(
    //     {
    //         age: 27
    //     }
    // ).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne(
        {
            description: 'complete mongodb section '
        }
    ).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })

    // db.collection('users').findOne({ _id: new ObjectID('5fd8c8b5afff25118933431e') }, (error, user) => {
    //     if (error){
    //         return console.log('Unable to fetch')
    //     }
    //
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     if (error){
    //         return console.log('unable to get users')
    //     }
    //     console.log(users)
    // })
    //
    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     if (error){
    //         return console.log('unable to get users')
    //     }
    //     console.log(count)
    // })

    // db.collection('tasks').findOne({ _id: ObjectID('5fd8f271ef0e9312584c1661') }, (error, task) => {
    //     if (error){
    //         return  console.log('Unable to fetch task')
    //     }
    //     console.log(task)
    // })
    //
    // db.collection('tasks').find({ completed: false}).toArray((error, tasks) => {
    //     if (error){
    //         return console.log('Unable to get tasks')
    //     }
    //
    //     console.log(tasks)
    // })

    // db.collection('users').insertOne({
    //     name: 'shayan zarabadi pour',
    //     age: 27,
    //
    // }, (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert user')
    //     }
    //
    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'aysana',
    //         age: 21
    //     },
    //     {
    //         name: 'kianoosh',
    //         age: 27
    //     }
    // ], (error, result) => {
    //
    //     if (error){
    //         return  console.log('Unable to insert users')
    //     }
    //
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'complete mongodb section ',
    //         completed: false
    //     },
    //     {
    //         description: 'complete weather app course',
    //         completed: true,
    //     },
    //     {
    //         description: 'master in git and github',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error){
    //         return console.log('Unable to insert tasks')
    //     }
    //     console.log(result.ops)
    // })
})