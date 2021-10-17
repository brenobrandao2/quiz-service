import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const QUIZ_COLLECTION = 'quiz'
const db = new MongoDb()

export const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log('Buscando todos os quiz')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(QUIZ_COLLECTION).find({}).sort({ 'lastModified': -1 }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar todos os quiz')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar todos os quiz')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const getSimpleList = () => {
    return new Promise((resolve, reject) => {
        console.log('Buscando todos os quiz reduzidos')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(QUIZ_COLLECTION).find({}, { projection: {'nome': 1, 'lastModified': 1} }).sort({ 'lastModified': -1 }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar todos os quiz reduzidos')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar todos os quiz reduzidos')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const getById = (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Buscando quiz por id')
        const objectId = new mongoose.Types.ObjectId(_id)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            console.log(objectId)
            db.collection(QUIZ_COLLECTION).find({ "_id": objectId }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar o quiz')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar o quiz')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const getCardFinalImg = async (_id) => {
    console.log('Buscando imagem do card final')
    try {
        const quiz = await getById(_id)
        const cardFinal = quiz[0].cardFinal
        const img = cardFinal.imagem
        return img
    } catch (error) {
        console.log('Falha ao buscar imagem do card final')
        return undefined
    }
}

export const deleteById = (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Deletando quiz por id')
        const objectId = new mongoose.Types.ObjectId(_id)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(QUIZ_COLLECTION).deleteOne({ "_id": objectId }).then((result) => {
                console.log('Sucesso ao deletar quiz')
                resolve(result)
                db.close()
            }).catch((error) => {
                console.log('Falha ao deletar quiz')
                reject(error)
                db.close()
            })
        })
    })  
}

export const insert = (quiz) => {
    return new Promise((resolve, reject) => {
        console.log('Registrando quiz')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            quiz.createdAt = new Date()
            quiz.lastModified = new Date()

            db.collection(QUIZ_COLLECTION).insertOne(quiz).then((result) => {
                console.log('Sucesso ao registrar quiz')
                resolve(result)
                db.close()
            }).catch((error) => {
                console.log('Falha ao registrar quiz')
                reject(error)
                db.close()
            })
        })
    })
}

export const update = async (quiz) => {    
    return new Promise((resolve, reject) => {
        console.log('Atualizando quiz')
        const { _id } = quiz
        const objectId = new mongoose.Types.ObjectId(_id)
        delete quiz._id
        delete quiz.lastModified

        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)

            db.collection(QUIZ_COLLECTION).updateOne({ "_id": objectId }, { $set: {...quiz}, $currentDate: { lastModified: true } }).then((result) => {
                console.log('Sucesso ao atualizar quiz')
                resolve(result)
                db.close()
            }).catch((error) => {
                console.log('Falha ao atualizar quiz')
                reject(error)
                db.close()
            })
        })
    })    
}