// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement ('div')
const oSimbolo = document.createElement ('div')
const caixasPequenas = document.getElementsByClassName ('caixa-pequena')

// Adicionar simbolo x ou o na caixa pequena
const adicionarEvento = (caixaP, index = 0) => { 
    if (index === caixaP.length) return true
    else  {
        const elemento = caixaP[index]
        const vez = elemento.classList[2]
        elemento.addEventListener('click', () => {
            if (vez === 'X'){
                const simboloClone = xSimbolo.cloneNode(true) //o appendchild é tranferido para a proxima casa selecionada e não duplicado
                adicionarClasse('x-simbolo')(simboloClone)    //então é criado o simboloclone, para o X ou O ficarem nos lugares após
                elemento.classList[2] = 'x-add'               //a próxima escolhida
                elemento.appendChild(simboloClone)
            }

            else if (vez === 'O'){
                const simboloClone = oSimbolo.cloneNode(true)
                adicionarClasse('o-simbolo')(simboloClone)
                elemento.classList[2] = 'o-add'
                elemento.appendChild(simboloClone) 
            }
        }, {once: true}) 
        adicionarEvento(caixaP, index + 1)
    }
} 
adicionarEvento(caixasPequenas)

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
const adicionarClasse = classe => elemento => {
    elemento.classList.add(classe);
}

// Função para remover uma classe de um elemento
const removerClasse = classe => elemento => {
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
        adicionarClasse('ativo')(principal);
        adicionarClasse('ativo')(info);
        btInstrucao.style.display = 'none'
    })

    // "Ouve o evento click no botão de fechar"
    btFechar.addEventListener('click', () =>{
        removerClasse('ativo')(principal);
        removerClasse('ativo')(info);
        btInstrucao.style.display = 'inline'
    })
})