export const insertPergunta = (conn, pergunta, id_quiz) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO quiz (nome, titulo, subtitulo) VALUES ("${nome}", "${titulo}", "${subtitulo}");`, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}