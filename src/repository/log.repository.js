import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'

const LOG_COLLECTION = 'logs'
const db = new MongoDb()

export const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log('Buscando todos os logs')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(LOG_COLLECTION).find({}).sort({ 'data': -1 }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar todos os logs')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar todos os logs')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const registerLog = async (data, usuario, descricao, detalhes) => {
    return new Promise((resolve, reject) => {
        console.log('Registrando log')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
                const log = {
                    data,
                    usuario,
                    descricao,
                    detalhes
                }
                
                console.log(log)
                
            db.collection(LOG_COLLECTION).insertOne(log).then((result) => {
                console.log('Sucesso ao registrar log')
                resolve(result)
                db.close()
            }).catch((error) => {
                console.log('Falha ao registrar log')
                reject(error)
                db.close()
            })
        })
    })
}