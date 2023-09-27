// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement ('div');
const oSimbolo = document.createElement ('div');

// Selecionando os elementos HTML e atribuindo a constantes
const principal = document.getElementById('principal');
const info = document.getElementById('info');
const btInstrucao = document.getElementById('botao-instrucao');
const btFechar = document.getElementById('botao-fechar');
const btReiniciar = document.getElementById('botao-reiniciar');
const regras = document.getElementById('info');
const caixasPequenas = document.getElementsByClassName ('caixa-pequena');
const subTabuleiros = document.getElementsByClassName ('sub-tabuleiro');
const divsBloqueio = document.getElementsByClassName('bloqueada');
const divsCorte = document.getElementsByClassName('corte-vitoria')
const caixasGrandes = document.getElementsByClassName('caixa-grande')


// Função recursiva para Adicionar simbolo x ou o na caixa pequena
const adicionarEvento = (caixaP, index = 0) => { 
    if (index === caixaP.length) return true;
    else  {
        const elemento = caixaP[index];
        elemento.addEventListener('click', () => {
            const vez = elemento.classList[2];
            const subTab = elemento.parentNode
            if (vez === 'X') {
                const simboloClone = xSimbolo.cloneNode(true); //com appendchild o X ou o O são tranferidos para a proxima casa selecionada e não duplicados
                adicionarClasse('x-simbolo')(simboloClone);    //então é criado o simboloclone, para o X ou O ficarem nos lugares após
                elemento.appendChild(simboloClone);            //a próxima escolha
                mudaVezX(caixasPequenas);
                removerClasse(elemento.classList[2])(elemento)
                adicionarClasse('X-add')(elemento);            //identifica um quadrante selecionado
                vitoriaParcial(subTab);           // verificação de vitória parcial, analizando as 8 combinações de vitória possíveis
                
                tracoVitoria(elemento)(vitoriaParcial(subTab)) 
                bloqueiaTab(elemento);     
                liberaTabs(caixasGrandes)                   

            } else if (vez === 'O'){
                const simboloClone = oSimbolo.cloneNode(true);
                adicionarClasse('o-simbolo')(simboloClone);
                elemento.appendChild(simboloClone);
                mudaVezO(caixasPequenas);
                removerClasse(elemento.classList[2])(elemento);
                adicionarClasse('O-add')(elemento);             // identifica um quadrante selecioando 
                vitoriaParcial(subTab);                         // verificação de vitória parcial, analizando as 8 combinações de vitória possíveis
    
                tracoVitoria(elemento)(vitoriaParcial(subTab))  
                bloqueiaTab(elemento);   
                liberaTabs(caixasGrandes)                        
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
    btReiniciar.style.display = 'none';
})

// "Ouve o evento click no botão de fechar"
btFechar.addEventListener('click', () =>{
    regras.scrollTo({top: 0});
    removerClasse('ativo')(principal);
    removerClasse('ativo')(info);
    btInstrucao.style.display = 'inline';
    btReiniciar.style.display = 'inline';
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
        return 1
    } else if (simbolos.c4 === simbolos.c5 && simbolos.c4 === simbolos.c6 && simbolos.c4 !== "") {
        return 2
    } else if (simbolos.c7 === simbolos.c8 && simbolos.c7 === simbolos.c9 && simbolos.c7 !== "") {
        return 3
    } else if (simbolos.c1 === simbolos.c4 && simbolos.c1 === simbolos.c7 && simbolos.c1 !== "") {
        return 4
    } else if (simbolos.c2 === simbolos.c5 && simbolos.c2 === simbolos.c8 && simbolos.c2 !== "") {
        return 5
    } else if (simbolos.c3 === simbolos.c6 && simbolos.c3 === simbolos.c9 && simbolos.c3 !== "") {
        return 6
    } else if (simbolos.c1 === simbolos.c5 && simbolos.c1 === simbolos.c9 && simbolos.c1 !== "") {
        return 7
    } else if (simbolos.c3 === simbolos.c5 && simbolos.c3 === simbolos.c7 && simbolos.c3 !== "") {
        return 8
    } else if (temSimbolo(caixinhas) === true) return false;
    else return null;
};

const xAnima1 = xSimbolo.cloneNode();
xAnima1.style.rotate = '45deg'
xAnima1.style.position = 'absolute'
xAnima1.style.zIndex = '4'
xAnima1.style.height = '45px'
const xAnima2 = xSimbolo.cloneNode();
xAnima2.style.rotate = '-45deg'
xAnima2.style.position = 'absolute'
xAnima2.style.zIndex = '3'
xAnima2.style.height = '45px'
const oAnima = document.createElement ('svg');

const tracoVitoria = (caixinha) => (tipoVitoria) => {
    const tabuleirinho = caixinha.parentElement;
    const caixaGrande = tabuleirinho.parentElement;
    const traco = caixaGrande.children[1];
    const animacaoX = () => {
        setTimeout(() => {
        xAnima1.style.animation = 'x 2s ease-out forwards'
        xAnima2.style.animation = 'x 2s ease-out 0.7s forwards'
        caixaGrande.appendChild(xAnima1.cloneNode())
        caixaGrande.appendChild(xAnima2.cloneNode())}, 3500)
    }
    if (tipoVitoria < 9 && tipoVitoria !== null){
        switch (tipoVitoria) {
            case 1:
                traco.style.translate = '0px -58px'
                traco.style.animation = 'tracoHorizVert 3.2s ease-out forwards'
                adicionarClasse('X-vitoria')(caixaGrande)
                animacaoX()
                break;
            case 2:
                traco.style.animation = 'tracoHorizVert 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 3:
                traco.style.translate = '0px 58px'
                traco.style.animation = 'tracoHorizVert 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 4:
                traco.style.rotate = '90deg'
                traco.style.translate = '-58px 0px'
                traco.style.animation = 'tracoHorizVert 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 5:
                traco.style.rotate = '90deg'
                traco.style.translate = '0px 0px'
                traco.style.animation = 'tracoHorizVert 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 6:
                traco.style.rotate = '90deg'
                traco.style.translate = '58px 0px'
                traco.style.animation = 'tracoHorizVert 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 7:
                traco.style.rotate = '45deg'
                traco.style.animation = 'tracoDiagonal 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case 8:
                traco.style.rotate = '-45deg'
                traco.style.animation = 'tracoDiagonal 3s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 2s ease-out 1.2s forwards'
                animacaoX()
                break;
            case false:
                tabuleirinho.style.animation = 'velha 2s ease-out forwards'
                tabuleirinho.style.cursor = 'not-allowed'
                adicionarClasse('velha')(caixaGrande)
                break;
        }
    }
}

// btReiniciar.addEventListener('click', () =>{
//     reiniciar(caixasPequenas)
// })

// const reiniciar = (elemento, index = 0) => {
//     if (index === elemento.length) return true;
//     else {
//         removerClasse('X-add')(elemento[index]);
//         removerClasse('O-add')(elemento[index]);
//         removerClasse('O')(elemento[index]);    
//         adicionarClasse('X')(elemento[index]);
//         liberaTabs(divsBloqueio);
//         elemento[index].innerHTML = "";
//         return reiniciar(elemento,index + 1);
//     };
// };

const liberaTabs = (tabuleiro, index = 0) => {
    const tabAtual = tabuleiro[index];
    if (index === tabAtual.length) return undefined;
    else {
        if (tabAtual.classList[1] !== 'X-vitoria') {
            tabAtual.style.animation = 'tiraBloq 2s ease-out forwards'
        }
        return liberaTabs(tabuleiro, index + 1);
    };
};

const bloqueiaTab = (caixinha, index = 0) => {
    const paiCaixinha = caixinha.parentElement
    const tabAtual = subTabuleiros[index];
    const posicaoCaixinha = caixinha.classList[1];
    const posicaoTabuleiro = tabAtual.classList[1];
    const divAtual = divsBloqueio[index];
    const paiAtual = tabAtual.parentElement
    if (index === subTabuleiros.length) return undefined;
    else {
        if (vitoriaParcial(paiCaixinha) !== null && vitoriaParcial(paiCaixinha) !== false && typeof vitoriaParcial(tabAtual) !== 'number'){
            if (tabAtual.classList[1] !== 'X-vitoria') {
                tabAtual.style.animation = 'liberaTodos 2s ease-out forwards'
                divAtual.style.display = 'none'
                setInterval(() => {
                    paiCaixinha.style.display = 'none'
                }, 5000)
            }
            paiCaixinha.style.animation = 'someTab 1s ease-out 3.1s forwards'
        } else if (posicaoCaixinha !== posicaoTabuleiro && typeof vitoriaParcial(tabAtual) !== 'number') {
            tabAtual.style.animation = 'addBloq 1s ease-out forwards'
            divAtual.style.display = 'inline'
        } else if (posicaoCaixinha === posicaoTabuleiro && vitoriaParcial(tabAtual) !== false) {
            tabAtual.style.animation = 'tiraBloq 1s ease-out forwards'
            paiCaixinha.style.opacity = '100%'
            divAtual.style.display = 'none'
        };
        return bloqueiaTab(caixinha, index + 1);
    };
};