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
        });
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
const adicionarClasse = (classe) => (elemento) => {
    elemento.classList.add(classe);
}

// Função para remover uma classe de um elemento
const removerClasse = (classe) => (elemento) => {
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

// Função auxiliar para indentificar o empate, somente quando for garantida
// que todas as caixinhas possuem simbolos dentro

const temSimbolo = (objClasse, index = 0) => {
    const elementoAtual = objClasse[index]
    if (elementoAtual.innerHTML !== "") {
        if (index === objClasse.length - 1) return true
        else return temSimbolo(objClasse, index + 1);
    }
}

// Função de estruturas condicionais para analisar qual tipo de vitória, entre as 8 combinações possíveis
// Caso não bata com nenhuma das 8 e todos as caixinhas tenham simbolos a função irá retornar false, indicando velha (empate)

const vitoriaParcial = (subTab) => {
    const caixinhas = subTab.children;
    const simbolos = {
        c1: caixinhas[0].innerHTML,
        c2: caixinhas[1].innerHTML,
        c3: caixinhas[2].innerHTML,
        c4: caixinhas[3].innerHTML,
        c5: caixinhas[4].innerHTML,
        c6: caixinhas[5].innerHTML,
        c7: caixinhas[6].innerHTML,
        c8: caixinhas[7].innerHTML,
        c9: caixinhas[8].innerHTML,
    };
    
    if (simbolos.c1 === simbolos.c2 && simbolos.c1 === simbolos.c3 && simbolos.c1 !== "") {
        return true
    } else if (simbolos.c4 === simbolos.c5 && simbolos.c4 === simbolos.c6 && simbolos.c4 !== "") {
        return true
    } else if (simbolos.c7 === simbolos.c8 && simbolos.c7 === simbolos.c9 && simbolos.c7 !== "") {
        return true
    } else if (simbolos.c1 === simbolos.c4 && simbolos.c1 === simbolos.c7 && simbolos.c1 !== "") {
        return true
    } else if (simbolos.c2 === simbolos.c5 && simbolos.c2 === simbolos.c8 && simbolos.c2 !== "") {
        return true
    } else if (simbolos.c3 === simbolos.c6 && simbolos.c3 === simbolos.c9 && simbolos.c3 !== "") {
        return true
    } else if (simbolos.c1 === simbolos.c5 && simbolos.c1 === simbolos.c9 && simbolos.c1 !== "") {
        return true
    } else if (simbolos.c3 === simbolos.c5 && simbolos.c3 === simbolos.c7 && simbolos.c3 !== "") {
        return true
    } else if (temSimbolo(caixinhas) === true) return false;
};

btReniciar.addEventListener('click', () =>{
    reiniciar(caixasPequenas)
})

const reiniciar = (elemento, index = 0) => {
    if (index === elemento.length) return true;
    else {
        removerClasse('X-add')(elemento[index]);
        removerClasse('O-add')(elemento[index]);
        removerClasse('O')(elemento[index]);    
        adicionarClasse('X')(elemento[index]);
        elemento[index].innerHTML = "";
        return reiniciar(elemento,index+1);
    }
}