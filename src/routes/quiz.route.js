import { Router } from "express"
import { insert, getAll, update, getById, deleteById, getCardFinalImg } from "../repository/quiz.repository.js"
import MongoDb from "../utils/mongodb.js"
import multer from "multer"

const router = Router()
const upload = multer()

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

router.post('/insert', upload.any(), async (req, res) => {
    try {
        const { quiz } = req.body
        const newQuiz = JSON.parse(quiz)
        const formData = req.files
        let quizImagem, cardFinalImagem
        
        if (formData && formData.length > 0) {
            quizImagem = formData.find(item => item.fieldname === 'quizImagem')
            cardFinalImagem = formData.find(item => item.fieldname === 'cardFinalImagem')
        }

        newQuiz.imagem = quizImagem
        newQuiz.cardFinal.imagem = cardFinalImagem

        console.log(newQuiz)

        const result = await insert(newQuiz)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/update', upload.any(), async (req, res) => {
    try {
        const body = JSON.parse(JSON.stringify(req.body))
        const { quiz } = body
        const newQuiz = JSON.parse(quiz)
        const formData = req.files
        let quizImagem = formData.find(item => item.fieldname === 'quizImagem')
        let cardFinalImagem = formData.find(item => item.fieldname === 'cardFinalImagem')
        
        if (quizImagem) newQuiz.imagem = formData.find(item => item.fieldname === 'quizImagem')
        else if (!body.hasOwnProperty('quizImagem')) newQuiz.imagem = undefined
        if (cardFinalImagem) newQuiz.cardFinal.imagem = formData.find(item => item.fieldname === 'cardFinalImagem')
        else if (body.hasOwnProperty('cardFinalImagem')) newQuiz.cardFinal.imagem = await getCardFinalImg(newQuiz._id)
        else newQuiz.cardFinal.imagem = undefined

        const result = await update(newQuiz)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router