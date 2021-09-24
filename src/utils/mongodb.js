import mongoose from "mongoose";

export class MongoDb {
    constructor() {
        this.uri = 'mongodb://localhost/life_and_money_quiz'
        this.options =  { useNewUrlParser: true }
    }

    newConnection() {
        mongoose.connect(this.uri, this.options)
        const db = mongoose.connection.once('open', () => {
            console.log('connection has been made')
        }).on('error', (error) => {
            console.log('error: ', error)
        })

        console.log(db)
        return db
    }
}

const db = new MongoDb().newConnection()