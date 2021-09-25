export const getAll = (conn) => {
    return new Promise((resolve, reject) => {
        conn.query('SELECT * FROM quiz;', (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })    
}

export const getById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM quiz WHERE id = ${id};`, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })    
}

export const deleteById = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`DELETE FROM quiz WHERE id = ${id};`, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

export const insert = (conn, nome, titulo, subtitulo) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO quiz (nome, titulo, subtitulo) VALUES ("${nome}", "${titulo}", "${subtitulo}");`, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}

export const insertQuizTest = (conn, id) => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO quiz (nome, titulo, subtitulo) VALUES ("Quiz de teste", "Título do quiz de teste", "Subtítulo do quiz de teste");`, (err, results) => {
            if (err) reject(err)
            resolve(results)
        })
    })
}