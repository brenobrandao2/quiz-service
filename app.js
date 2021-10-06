import express from 'express'
import quizRouter from './src/routes/quiz.route.js'
import contactsRouter from './src/routes/contacts.route.js'
import userRouter from './src/routes/user.route.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/quiz', quizRouter)
app.use('/contacts', contactsRouter)
app.use('/user', userRouter)

app.listen(3001)