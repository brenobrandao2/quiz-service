import express from 'express'
import quizRouter from './src/routes/quiz.route.js'
import userRouter from './src/routes/user.route.js'
import activeCampaignRouter from './src/routes/activeCampaign.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/quiz', quizRouter)
app.use('/user', userRouter)
app.use('/ac', activeCampaignRouter)

app.listen(3001)