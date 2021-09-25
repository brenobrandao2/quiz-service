import mongoose from "mongoose";

export default class MongoDb {
    constructor() {
        this.uri = 'mongodb://localhost/life_and_money_quiz'
        this.options =  { useNewUrlParser: true }
        
    }

    newConnection() {
        mongoose.connect(this.uri, this.options)
        const db = mongoose.connection

        db.on('error', (error) => {
            console.log('error: ', error)
        })
        db.on('connected', () => {
            console.log('database is connected successfully');
        });
        db.on('disconnected', () => {
            console.log('database is disconnected successfully');
        })

        return db
    }
}