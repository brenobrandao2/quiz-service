import { Router } from "express"
import { insert, getAll, update, getById, deleteById, getCardFinalImg, getSimpleList, insertLogo, insertFavicon, getImages } from "../repository/quiz.repository.js"
import multer from "multer"
import { getQuizMetrics } from "../repository/metric.repository.js"

const router = Router()
const upload = multer()

router.get('/', async (req, res) => {
    try {
        const allQuiz = await getAll()
        res.send(allQuiz)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/getSimpleList', async (req, res) => {
    try {
        const allQuiz = await getSimpleList()
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

router.post('/getQuizMetrics', async (req, res) => {
    try {
        const { _id } = req.body || req.query
        const quizMetrics = await getQuizMetrics(_id)

        res.send(quizMetrics)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.get('/getImages', async (req, res) => {
    try {
        const allImages = await getImages()
        res.send(allImages)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/insertImage', upload.any(), async (req, res) => {
    try {
        const formData = req.files
        let logo, favicon
        const result = []
        
        logo = formData.find(item => item.fieldname === 'logo')
        favicon = formData.find(item => item.fieldname === 'favicon')
        
        if (logo) {
            const objLogo = {
                tipo: 'logo',
                logo
            }
            const resultLogo = await insertLogo(objLogo)
            result.push(resultLogo)
        }

        if (favicon) {
            const objFavicon = {
                tipo: 'favicon',
                favicon
            }
            const resultFavicon = await insertFavicon(objFavicon)
            result.push(resultFavicon)
        }


        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router