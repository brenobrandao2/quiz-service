import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const QUIZ_METRICAS_COLLECTION = 'quiz_metricas'
const db = new MongoDb()

export const getQuizMetrics = (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Buscando métrica por id_quiz')
        const objectId = new mongoose.Types.ObjectId(_id)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            console.log(objectId)
            db.collection(QUIZ_METRICAS_COLLECTION).find({ "id_quiz": objectId }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar métricas')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar métricas')
                    resolve(result)
                }
                // db.close()
              })
        })
    })
}