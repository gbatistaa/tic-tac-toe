// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement ('div')
const oSimbolo = document.createElement ('div')
const caixasPequenas = document.getElementsByClassName ('caixa-pequena')

// Adicionar simbolo x na caixa pequena
caixasPequenas[3].addEventListener('click',() => {
    adicionarclasse('x-simbolo')(xSimbolo)
    caixasPequenas[3].appendChild(xSimbolo)
})

// Função recursiva para transformar HTMLCollection (registro) em uma array de elementos da mesma classe HTML

const criaArray = (classe, index = 0, array = []) => {
    const key = index.toString();
    if (index === classe.length) return array;
    else {
        const vetor = classe[key];
        return criaArray (classe, index + 1, [...array, vetor]);
    };
};

// Função para adicionar uma classe a um elemento
const adicionarclasse = classe => elemento => {
    elemento.classList.add(classe);
}

// Função para remover uma classe de um elemento
const removerclasse = classe => elemento => {
    elemento.classList.remove(classe);
}

// Essa função "ouve" eventos que ocorrem no html
// O DOMContentLoaded é um evento que ocorre quando todo o html é carregado no navegador
document.addEventListener('DOMContentLoaded', () => {
    // Selecionando os elementos e atribuindo a constantes
    const principal = document.getElementById('principal');
    const info = document.getElementById('info');
    const btInstrucao = document.getElementById('botao-instrucao');
    const btFechar = document.getElementById('botao-fechar')

    // "Ouve o evento click no botão de instrução"
    btInstrucao.addEventListener('click', () =>{
        adicionarclasse('ativo')(principal);
        adicionarclasse('ativo')(info);
        btInstrucao.style.display = 'none'
    })

    // "Ouve o evento click no botão de fechar"
    btFechar.addEventListener('click', () =>{
        removerclasse('ativo')(principal);
        removerclasse('ativo')(info);
        btInstrucao.style.display = 'inline'
    })
})