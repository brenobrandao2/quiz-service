import { Router } from "express"
import { insert, getAll, update, deleteById, login } from "../repository/user.repository.js"

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allUsers = await getAll()
        res.send(allUsers)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/insert', async (req, res) => {
    try {
        const user = req.body
        const result = await insert(user)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/update', async (req, res) => {
    try {
        const user = req.body
        const result = await update(user)
        res.json({ result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/deleteById', async (req, res) => {
    try {
        const { _id } = req.body
        const user = await deleteById(_id)
        res.send(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, senha} = req.body
        const result = await login(email, senha)
        res.json({ ...result })
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router