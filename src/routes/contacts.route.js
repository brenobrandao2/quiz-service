import { Router } from "express"
import { create } from "../repository/contact.repository.js"
import { getToken } from "../repository/quiz.repository.js"

const router = Router()

router.post('/create', async (req, res) => {
    try {
        const { name, email, id_quiz } = req.body
        const token = await getToken(id_quiz)
        const result = await create(name, email, token)
        res.json({ ...result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router