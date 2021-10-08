import mongoose from "mongoose";

export default class MongoDb {
    constructor() {
        this.uri = 'mongodb://lam_quiz:HndC$1087Lam%402020a@159.203.187.163/life_and_money_quiz'
        this.options =  { useNewUrlParser: true }
        this.mongo = new mongoose.Mongoose(({ uri: this.uri, options: this.options}))
    }

    async newConnection() {
        await mongoose.connect(this.uri, this.options)
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