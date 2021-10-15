import express from 'express'
import quizRouter from './src/routes/quiz.route.js'
import userRouter from './src/routes/user.route.js'
import https from 'https'
import fs from 'fs'

const privateKey = fs.readFileSync('sslcert/server.key', 'utf-8')
const certificate = fs.readFileSync('sslcert/server.crt', 'utf-8')

const credentials = {
    key: privateKey,
    cert: certificate    
}

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

// app.listen(3001)

const httpsServer = https.createServer(credentials, app)
httpsServer.listen(3001)