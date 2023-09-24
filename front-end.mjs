// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement ('div');
const oSimbolo = document.createElement ('div');

// Selecionando os elementos HTML e atribuindo a constantes
const principal = document.getElementById('principal');
const info = document.getElementById('info');
const btInstrucao = document.getElementById('botao-instrucao');
const btFechar = document.getElementById('botao-fechar');
const btReniciar = document.getElementById('botao-reiniciar');
const regras = document.getElementById('info');
const caixasPequenas = document.getElementsByClassName ('caixa-pequena');

// Função recursiva para Adicionar simbolo x ou o na caixa pequena
const adicionarEvento = (caixaP, index = 0) => { 
    if (index === caixaP.length) return true;
    else  {
        const elemento = caixaP[index];
        elemento.addEventListener('click', () => {
            const vez = elemento.classList[2];
            if (vez === 'X') {
                const simboloClone = xSimbolo.cloneNode(true); //com appendchild o X ou o O são tranferidos para a proxima casa selecionada e não duplicados
                adicionarClasse('x-simbolo')(simboloClone);    //então é criado o simboloclone, para o X ou O ficarem nos lugares após
                elemento.appendChild(simboloClone);            //a próxima escolha
                mudaVezX(caixasPequenas);
                removerClasse(elemento.classList[2])(elemento)
                adicionarClasse('X-add')(elemento);            //identifica um quadrante selecionado
                vitoriaParcial(elemento.parentNode);
            } else if (vez === 'O'){
                const simboloClone = oSimbolo.cloneNode(true);
                adicionarClasse('o-simbolo')(simboloClone);
                elemento.appendChild(simboloClone);
                mudaVezO(caixasPequenas);
                removerClasse(elemento.classList[2])(elemento);
                adicionarClasse('O-add')(elemento);             // identifica um quadrante selecioando 
                vitoriaParcial(elemento.parentNode);            // verificação de vitória parcial, analizando as 8 combinações de vitória possíveis
            }
        }
        // , {once: true}
        );
        adicionarEvento(caixaP, index + 1);
    };
};
adicionarEvento(caixasPequenas);

//verifica se o quadrante ja foi selecionado, caso não, muda a vez
const mudaVezX = (objClasse, index = 0) => {
    if (index === objClasse.length) return true;
    else {
        removerClasse('X')(objClasse[index]);
        if (objClasse[index].classList.contains('X-add') === false) {
            adicionarClasse('O')(objClasse[index]);
        }
        return mudaVezX(objClasse, index + 1)
    }
}

//verifica se o quadrante ja foi selecionado, caso não, muda a vez
const mudaVezO = (objClasse, index = 0) => {
    if (index === objClasse.length) return true;
    else {
        removerClasse('O')(objClasse[index]);
        if (objClasse[index].classList.contains('O-add') === false) {
            adicionarClasse('X')(objClasse[index]);
        }
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


// "Ouve o evento click no botão de instrução"
btInstrucao.addEventListener('click', () => {
    adicionarClasse('ativo')(principal);
    adicionarClasse('ativo')(info);
    btInstrucao.style.display = 'none';
    btReniciar.style.display = 'none';
})

// "Ouve o evento click no botão de fechar"
btFechar.addEventListener('click', () =>{
    regras.scrollTo({top: 0});
    removerClasse('ativo')(principal);
    removerClasse('ativo')(info);
    btInstrucao.style.display = 'inline';
    btReniciar.style.display = 'inline';
})

const vitoriaParcial = (subTab) => {
    const caixinhas = subTab.children
    if (caixinhas[0].classList[2] === caixinhas[1].classList[2] && caixinhas[0].classList[2] === caixinhas[2].classList[2] && caixinhas[0].classList[2].includes('add')) {
        return true;
    };
    
};

btReniciar.addEventListener('click', () =>{
    reinicar(caixasPequenas)
})

const reinicar = (elemento, index = 0) => {
    if (index === elemento.length) return true;
    else {
        removerClasse('X-add')(elemento[index]);
        removerClasse('O-add')(elemento[index]);
        removerClasse('O')(elemento[index]);    
        adicionarClasse('X')(elemento[index]);
        // elemento[index].removeChild(elemento[index].firstChild);
        elemento[index].innerHTML = "";
        return reinicar(elemento,index+1);
    }
}