const insertPerguntas = (perguntas, id_quiz) => {
    const listaPerguntas = []
    const listaRespostas = []

    perguntas.forEach(item => {
        const pergunta = [item.pergunta, id_quiz]
        listaPerguntas.push(pergunta)

        
    });
}