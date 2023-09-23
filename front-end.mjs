// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement ('div');
const oSimbolo = document.createElement ('div');
const caixasPequenas = document.getElementsByClassName ('caixa-pequena');
const regras = document.getElementById('info');

// Função recursiva para Adicionar simbolo x ou o na caixa pequena
const adicionarEvento = (caixaP, index = 0) => { 
    if (index === caixaP.length) return true;
    else  {
        const elemento = caixaP[index];
        elemento.addEventListener('click', () => {
            console.log(elemento)
            const vez = elemento.classList[2];
            if (vez === 'X'){
                const simboloClone = xSimbolo.cloneNode(true); //o appendchild é tranferido para a proxima casa selecionada e não duplicado
                adicionarClasse('x-simbolo')(simboloClone);    //então é criado o simboloclone, para o X ou O ficarem nos lugares após
                                                               //a próxima escolhida
                elemento.appendChild(simboloClone);
                mudaVezX(caixasPequenas);
            } else if (vez === 'O'){
                const simboloClone = oSimbolo.cloneNode(true);
                adicionarClasse('o-simbolo')(simboloClone);
                elemento.appendChild(simboloClone);
                mudaVezO(caixasPequenas);
            }
        }, {once: true});
        adicionarEvento(caixaP, index + 1);
    };
};
adicionarEvento(caixasPequenas);

const mudaVezX = (objClasse, index = 0) => {
    if (index === objClasse.length) return true;
    else {
        removerClasse('X')(objClasse[index])
        adicionarClasse('O')(objClasse[index])
        return mudaVezX(objClasse, index + 1)
    }
}

const mudaVezO = (objClasse, index = 0) => {
    if (index === objClasse.length) return true;
    else {
        removerClasse('O')(objClasse[index])
        adicionarClasse('X')(objClasse[index])
        return mudaVezO(objClasse, index + 1)
    }
}

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

// Selecionando os elementos HTML e atribuindo a constantes
const principal = document.getElementById('principal');
const info = document.getElementById('info');
const btInstrucao = document.getElementById('botao-instrucao');
const btFechar = document.getElementById('botao-fechar');

// "Ouve o evento click no botão de instrução"
btInstrucao.addEventListener('click', () => {
    adicionarClasse('ativo')(principal);
    adicionarClasse('ativo')(info);
    btInstrucao.style.display = 'none';
})

// "Ouve o evento click no botão de fechar"
btFechar.addEventListener('click', () =>{
    regras.scrollTo({top: 0});
    removerClasse('ativo')(principal);
    removerClasse('ativo')(info);
    btInstrucao.style.display = 'inline';
})