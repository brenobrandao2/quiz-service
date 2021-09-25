const mongoose = require('mongoose');
const { MongoDb } = require('../utils/mongodb');
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

module.exports={
    createData: (inputData, callback) => {
        quizData = new quizCollection(inputData)
        quizData.save( (err, data) => {
            if (err) throw err;
            return callback(data);
        })
    }
}