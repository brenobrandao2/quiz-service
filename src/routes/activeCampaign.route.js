import { Router } from "express"
import { getAllLists } from "../repository/activeCampaign.repository.js"

const router = Router()

router.post('/getLists', async (req, res) => {
    try {
        const token = req.body.token || ''
        const allLists = await getAllLists(token)
        res.send(allLists)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

export default router