const express = require('express') 

const app = express()

app.get('/', (req, res) => {
    
    const mysql = require('mysql')
    const conn = mysql.createConnection({
        host: '137.184.132.242',
        database : 'life_and_money_quiz',
        user     : 'lam',
        password : 'HndC$1087Lam@2020a',
    })

    conn.connect((err) => {
        if(err) {
            console.error('Error connecting: ' + err.stack)
            return;
        }

        console.log('Connected as id ' + conn.threadId)
    })

    const allQuiz = null

    conn.query('SELECT * FROM quiz', (err, results, fields) => {
        if (err) {
            console.error('Error: ' + err)
            throw err;
        }

        res.send(results)
    })

    conn.end()

})

app.listen(3000)