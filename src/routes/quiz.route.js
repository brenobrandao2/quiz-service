import { Router } from "express"
import Db from '../utils/db.js';
// import * as Quiz from '../../src/repository/quiz.repository.js'
import Quiz, { insertQuiz } from '../models/quiz.model.js'

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

// router.get('/getQuizById', async (req, res) => {
//     try {
//         const quiz_id = req.query.id
//         const db = new Db()
//         const conn = db.newConnection()
//         const allQuiz = await Quiz.getById(conn, quiz_id)
//         conn.end()
//         res.send(allQuiz)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// })

// router.post('/deleteQuizById', async (req, res) => {
//     try {
//         const id_quiz = req.body.id
//         const db = new Db()
//         const conn = db.newConnection()
//         const result = await Quiz.deleteById(conn,id_quiz)
//         conn.end()
//         res.send(result)
//     } catch (error) {
//         console.log(error)
//         res.send(error)
//     }
// })

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

router.post('/insertQuizTest', async (req, res) => {
    try {
        const quiz = req.body
        const result = await insertQuiz(quiz)
        res.json({ result })
        // Quiz.createData(quiz, (data) => {
        //     res.json({ 
        //         message: 'Quiz registrado com sucesso',
        //         data
        //     })
        // })
        
        // const db = new Db()
        // const conn = db.newConnection()
        // const result = await Quiz.insertQuizTest(conn)
        // conn.end()
        // res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router