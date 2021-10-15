import mongoose from 'mongoose'
import MongoDb from '../utils/mongodb.js'
import bcrypt from 'bcrypt'

const USERS_COLLECTION = 'usuario'
const db = new MongoDb()

export const insert = (user) => {
    return new Promise((resolve, reject) => {
        console.log('Registrando usuário')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            const saltRound = 10
            bcrypt.hash(user.senha, saltRound, (error, hash) => {
                if (error) {
                    db.close()
                    return reject(error)
                }

                user.senha = hash
                user.createdAt = new Date()

                db.collection(USERS_COLLECTION).insertOne(user).then((result) => {
                    console.log('Sucesso ao registrar usuário')
                    resolve(result)
                    db.close()
                }).catch((error) => {
                    console.log('Falha ao registrar usuário')
                    reject(error)
                    db.close()
                })
            })
        })
    })
}

export const getAll = () => {
    return new Promise((resolve, reject) => {
        console.log('Buscando todos os usuários')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(USERS_COLLECTION).find({}).sort({ 'nome': 1 }).toArray((error, result) => {  
                if (error) {
                    console.log('Falha ao buscar todos os usuários')   
                    reject(error)
                } else {
                    console.log('Sucesso ao buscar todos os usuários')
                    resolve(result)
                }
                db.close()
              })
        })
    })
}

export const update = async (user) => {    
    return new Promise((resolve, reject) => {
        console.log('Atualizando usuário')
        const { _id } = user
        const objectId = new mongoose.Types.ObjectId(_id)
        delete user._id
        delete user.lastModified

        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)

            const saltRound = 10
            bcrypt.hash(user.senha, saltRound, (error, hash) => {
                if (error) {
                    db.close()
                    return reject(error)
                }

                user.senha = hash

                db.collection(USERS_COLLECTION).updateOne({ "_id": objectId }, { $set: user, $currentDate: { lastModified: true } }).then((result) => {
                    console.log('Sucesso ao atualizar usuário')
                    resolve(result)
                    db.close()
                }).catch((error) => {
                    console.log('Falha ao atualizar usuário')
                    reject(error)
                    db.close()
                })
            })

        })
    })    
}

export const deleteById = (_id) => {
    return new Promise((resolve, reject) => {
        console.log('Deletando quiz por id')
        const objectId = new mongoose.Types.ObjectId(_id)
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(USERS_COLLECTION).deleteOne({ "_id": objectId }).then((result) => {
                console.log('Sucesso ao deletar usuário')
                resolve(result)
                db.close()
            }).catch((error) => {
                console.log('Falha ao deletar usuário')
                reject(error)
                db.close()
            })
        })
    })  
}

export const login = (email, senha) => {
    return new Promise((resolve, reject) => {
        console.log('Buscando usuário')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(USERS_COLLECTION).find({ "email": email }).toArray((error, result) => {  
                if (error) {

                    console.log('Falha ao buscar usuário')   
                    reject(error)

                } else {
                    const user = result[0] 
                    console.log(user)
                    bcrypt.compare(senha, user?.senha, (error, result) => {
                        if (error) {
                            console.log('Falha ao buscar usuário')   
                            reject(error)

                        } else {
                            if (result) {
                                console.log('Autenticado com sucesso')
                                resolve({status: true, user: user})
                            }
                            else {
                                console.log('Senha incorreta')   
                                reject({status: false})
                            }

                        }

                    })
                }
                db.close()
              })
        })
    })
}

export const checkPassword = (email, senha) => {
    return new Promise((resolve, reject) => {
        console.log('Buscando usuário')
        db.mongo.connect(db.uri, (error, db) => {
            if (error)
                return reject(error)
            
            db.collection(USERS_COLLECTION).find({ "email": email }).toArray((error, result) => {  
                if (error) {

                    console.log('Falha ao buscar usuário')
                    reject(error)

                } else {
                    const user = result[0] 
                    console.log(user)
                    bcrypt.compare(senha, user?.senha, (error, result) => {
                        if (error) {
                            console.log('Falha ao buscar usuário')   
                            reject(error)

                        } else {
                            if (result) {
                                console.log('Autenticado com sucesso')
                                resolve({status: true})
                            }
                            else {
                                console.log('Senha incorreta')   
                                reject({status: false})
                            }

                        }

                    })
                }
                db.close()
              })
        })
    })
}