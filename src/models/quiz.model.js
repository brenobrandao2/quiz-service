import mongoose from "mongoose";
import { MongoDb } from '../utils/mongodb.js'
const Schema = mongoose.Schema

const db = new MongoDb()
const conn = db.newConnection()

const QuizSchema = new Schema({
    nome: String,
    titulo: String,
    subtitulo: String,
    imagem: String,
    duplicidades: Number
})

const quizCollection = mongoose.model('quiz', QuizSchema);

export default {
    createData: (inputData, callback) => {
        quizData = new quizCollection(inputData)
        quizData.save( (err, data) => {
            if (err) throw err;
            return callback(data);
        })
    }
}