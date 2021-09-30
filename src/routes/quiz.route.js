import { Router } from "express"
import { insert, getAll, update, getById, deleteById } from "../repository/quiz.repository.js"
import MongoDb from "../utils/mongodb.js"

const router = Router()

// router.get('/', async (req, res) => {
//     try {
//         const db = new Db()
//         const conn = db.newConnection()
//         const allQuiz = await Quiz.getAll(conn)
//         conn.end()
//         res.send(allQuiz)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// })

router.get('/', async (req, res) => {
    try {
        const allQuiz = await getAll()
        res.send(allQuiz)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/getById', async (req, res) => {
    try {
        const { key } = req.body || req.query
        const _id = key
        const quiz = await getById(_id)
        res.send(quiz)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/deleteById', async (req, res) => {
    try {
        const { _id } = req.body
        const quiz = await deleteById(_id)
        res.send(quiz)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

// router.post('/insertQuiz', async (req, res) => {
//     try {
//         const {nome, titulo, subtitulo, perguntas, cardFinal} = req.body
//         console.log(req.body)
//         const db = new Db()
//         const conn = db.newConnection()
//         // const result = await Quiz.insert(conn, nome, titulo, subtitulo)
//         conn.end()
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// })

router.post('/insert', async (req, res) => {
    try {
        const quiz = req.body
        const result = await insert(quiz)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/update', async (req, res) => {
    try {
        const quiz = req.body
        const result = await update(quiz)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router