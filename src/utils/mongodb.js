import mongoose from "mongoose";
import { server } from '../utils/baseUrls.js'

export default class MongoDb {
    constructor() {
        this.user = 'lam_quiz'
        this.pass = 'HndC$1087Lam%402020a'
        this.uri = `mongodb://${this.user}:${this.pass}@${server}/life_and_money_quiz?authSource=admin&w=1`
        this.options =  { user: this.user, pass: this.pass, useNewUrlParser: true }
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