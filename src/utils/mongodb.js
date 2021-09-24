import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/quiz')

mongoose.connection.once('open', () => {
    console.log('connection has been made')
}).on('error', (error) => {
    console.log('error: ', error)
})