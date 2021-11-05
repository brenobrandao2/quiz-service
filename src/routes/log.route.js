import { Router } from "express"
import { getAll, registerLog } from "../repository/log.repository.js"

const router = Router()

router.get('/', async (req, res) => {
    try {
        const allLogs = await getAll()
        res.send(allLogs)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

router.post('/registerLog', async (req, res) => {
    try {
        const { data, usuario, descricao, detalhes } = req.body
        const result = await registerLog(data, usuario, descricao, detalhes)

        res.send(result)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router