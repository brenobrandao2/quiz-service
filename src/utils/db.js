import mysql from 'mysql'
export default class Db {
    constructor() {
        this.host = '137.184.132.242'
        this.database = 'life_and_money_quiz'
        this.user = 'lam'
        this.password = 'HndC$1087Lam@2020a'
    }

    newConnection() {
        return mysql.createConnection(this)
    }

    // async isConnected(conn) {
    //     const status = false
    //     await conn.connect((err) => {
    //         if(err) {
    //             console.error('Error connecting: ' + err.stack)
    //         }
    //         console.log('Connected as id ' + conn.threadId)
    //         status = true
    //     })
    //     return status
    // }
}