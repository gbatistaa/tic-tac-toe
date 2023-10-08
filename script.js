// Atribuição de constantes dos elementos virtuais 
const xSimbolo = document.createElement('div');
const oSimbolo = document.createElement('div');

// Selecionando os elementos HTML e atribuindo a constantes
const principal = document.getElementById('principal');
const tabuleiroPrincipal = document.getElementById('tabuleiro-principal')
const info = document.getElementById('info');
const btInstrucao = document.getElementById('botao-instrucao');
const btFechar = document.getElementById('botao-fechar');
const btReiniciar = document.getElementById('botao-reiniciar');
const regras = document.getElementById('info');
const caixasPequenas = document.getElementsByClassName('caixa-pequena');
const subTabuleiros = document.getElementsByClassName('sub-tabuleiro');
const divsBloqueio = document.getElementsByClassName('bloqueada');
const divsCorte = document.getElementsByClassName('corte-vitoria')
const caixasGrandes = document.getElementsByClassName('caixa-grande')

// Função recursiva para Adicionar simbolo x ou o na caixa pequena
const adicionarEvento = (caixaP, index = 0) => {
    if (index === caixaP.length) return true;
    else {
        const caixinha = caixaP[index];
        const caixona = caixinha.parentElement.parentElement[index]
        caixinha.addEventListener('click', () => {
            const vez = caixinha.classList[2];
            const subTab = caixinha.parentNode
            if (vez === 'X') {
                const simboloClone = xSimbolo.cloneNode(true); //com appendchild o X ou o O são tranferidos para a proxima casa selecionada e não duplicados
                adicionarClasse('x-simbolo')(simboloClone);    //então é criado o simboloclone, para o X ou O ficarem nos lugares após
                caixinha.appendChild(simboloClone);            //a próxima escolha
                mudaVezX(caixasPequenas);
                removerClasse(caixinha.classList[2])(caixinha)
                adicionarClasse('X-add')(caixinha);             //identifica um quadrante selecionado
                // verificação de vitória parcial, analizando as 8 combinações de vitória possíveis
                tracoVitoria(caixinha)(vitoriaParcial(subTab));
                //bloqueiaTab(caixinha);
                //liberaTabs(caixasGrandes);                

            } else if (vez === 'O') {
                const simboloClone = oSimbolo.cloneNode(true);
                adicionarClasse('o-simbolo')(simboloClone);
                caixinha.appendChild(simboloClone);
                mudaVezO(caixasPequenas);
                removerClasse(caixinha.classList[2])(caixinha);
                adicionarClasse('O-add')(caixinha);             // identifica um quadrante selecioando 
                // verificação de vitória parcial, analizando as 8 combinações de vitória possíveis
                tracoVitoria(caixinha)(vitoriaParcial(subTab))
                //bloqueiaTab(caixinha);
                //liberaTabs(caixasGrandes)                        
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
        if (objClasse[index].classList.contains('X-add') === false && objClasse[index].classList.contains('O-add') === false) {
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
        if (objClasse[index].classList.contains('O-add') === false && objClasse[index].classList.contains('X-add') === false) {
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
        return criaArray(classe, index + 1, [...array, vetor]);
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
btFechar.addEventListener('click', () => {
    regras.scrollTo({ top: 0 });
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
        c9: caixinhas[8].innerHTML
    };

    const classeC1 = caixinhas[0].classList;
    const classeC2 = caixinhas[1].classList;
    const classeC3 = caixinhas[2].classList;
    const classeC4 = caixinhas[3].classList;
    const classeC7 = caixinhas[6].classList;

    if (simbolos.c1 === simbolos.c2 && simbolos.c1 === simbolos.c3 && simbolos.c1 !== "") {
        if (classeC1.contains('X-add')) {
            return 1;
        } else if (classeC1.contains('O-add')) {
            return -1;
        }
    } else if (simbolos.c4 === simbolos.c5 && simbolos.c4 === simbolos.c6 && simbolos.c4 !== "") {
        if (classeC4.contains('X-add')) {
            return 2;
        } else if (classeC4.contains('O-add')) {
            return -2;
        }
    } else if (simbolos.c7 === simbolos.c8 && simbolos.c7 === simbolos.c9 && simbolos.c7 !== "") {
        if (classeC7.contains('X-add')) {
            return 3;
        } else if (classeC7.contains('O-add')) {
            return -3;
        }
    } else if (simbolos.c1 === simbolos.c4 && simbolos.c1 === simbolos.c7 && simbolos.c1 !== "") {
        if (classeC1.contains('X-add')) {
            return 4;
        } else if (classeC1.contains('O-add')) {
            return -4;
        }
    } else if (simbolos.c2 === simbolos.c5 && simbolos.c2 === simbolos.c8 && simbolos.c2 !== "") {
        if (classeC2.contains('X-add')) {
            return 5;
        } else if (classeC2.contains('O-add')) {
            return -5;
        }
    } else if (simbolos.c3 === simbolos.c6 && simbolos.c3 === simbolos.c9 && simbolos.c3 !== "") {
        if (classeC3.contains('X-add')) {
            return 6;
        } else if (classeC3.contains('O-add')) {
            return -6;
        }
    } else if (simbolos.c1 === simbolos.c5 && simbolos.c1 === simbolos.c9 && simbolos.c1 !== "") {
        if (classeC1.contains('X-add')) {
            return 7;
        } else if (classeC1.contains('O-add')) {
            return -7;
        }
    } else if (simbolos.c3 === simbolos.c5 && simbolos.c3 === simbolos.c7 && simbolos.c3 !== "") {
        if (classeC3.contains('X-add')) {
            return 8;
        } else if (classeC3.contains('O-add')) {
            return -8;
        }
    } else if (temSimbolo(caixinhas) === true) return false;
    else return null;
};


// Função que analisa qual tipo de vitória, e realiza a animação do traço
const tracoVitoria = (caixinha) => (tipoVitoria) => {
    const tabuleirinho = caixinha.parentElement;
    const caixaGrande = tabuleirinho.parentElement;
    const bloqueioAtual = caixaGrande.children[0]
    const traco = caixaGrande.children[1];
    const animacaoX = () => {
        setTimeout(() => {
            xAnima1.style.animation = 'x 1s ease-out forwards'
            xAnima2.style.animation = 'x 1s ease-out 0.5s forwards'
            caixaGrande.appendChild(xAnima1.cloneNode())
            caixaGrande.appendChild(xAnima2.cloneNode())
            tabuleirinho.style.display = 'none'
        }, 1900)
    }
    const colocaO = () => {
        setTimeout(() => {
            const divContemBola = document.createElement('div')
            adicionarClasse('circle-container')(divContemBola);

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('circulo');

            const oAnima = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            oAnima.setAttribute('cx', '50%');
            oAnima.setAttribute('cy', '50%');
            oAnima.setAttribute('r', '32.5%');

            svg.appendChild(oAnima)
            divContemBola.appendChild(svg)
            const cloneBola = divContemBola.cloneNode(true)
            caixaGrande.appendChild(cloneBola)
            tabuleirinho.style.display = 'none'
        }, 1700)
    }
    if ((tipoVitoria < 9 || tipoVitoria === false) && tipoVitoria !== null) {
        bloqueioAtual.style.display = 'inline';
        switch (tipoVitoria) {
            case 1:
                traco.style.translate = '0% -580%'
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 2:
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 3:
                traco.style.translate = '0% 580%'
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 4:
                traco.style.translate = '-580% 0%'
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 5:
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 6:
                traco.style.translate = '580% 0%'
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 7:
                traco.style.rotate = '45deg'
                traco.style.animation = 'tracoDiagonal 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1.5s ease-out 1s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case 8:
                traco.style.rotate = '-45deg'
                traco.style.animation = 'tracoDiagonal 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1.5s ease-out 1s forwards'
                animacaoX()
                adicionarClasse('X-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -1:
                traco.style.translate = '0% -580%'
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -2:
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -3:
                traco.style.translate = '0% 580%'
                traco.style.animation = 'tracoHoriz 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -4:
                traco.style.translate = '-58px 0px'
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -5:
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -6:
                traco.style.translate = '58px 0px'
                traco.style.animation = 'tracoVert 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1s ease-out 1.2s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -7:
                traco.style.rotate = '45deg'
                traco.style.animation = 'tracoDiagonal 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1.5s ease-out 1s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case -8:
                traco.style.rotate = '-45deg'
                traco.style.animation = 'tracoDiagonal 1.5s ease-out forwards'
                tabuleirinho.style.animation = 'someTab 1.5s ease-out 1s forwards'
                colocaO()
                adicionarClasse('O-vitoria')(caixaGrande)
                tracoVitoriaFinal(caixaGrande)(vitoriaFinal(caixasGrandes))
                break;
            case false:
                tabuleirinho.style.animation = 'velha 1.5s ease-out forwards'
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

//função recursiva para caso o subtabuleiro não possua vitoria(X ou O) ou empate(velha) retire o bloqueio de clique e aumente a opacidade
const liberaTabs = (subTabuleiros, index = 0) => {
    const tabAtual = subTabuleiros[index];
    const bloqueioAtual = divsBloqueio[index];
    const caixaGrandeAtual = tabAtual.parentElement;
    if (index === tabAtual.length) return undefined;
    else {
        if (caixaGrandeAtual.classList.contains('X-vitoria') === false && caixaGrandeAtual.classList.contains('O-vitoria') === false && caixaGrandeAtual.classList.contains('velha') === false) {
            tabAtual.style.animation = 'tiraBloq 2s ease-out forwards';
            bloqueioAtual.style.display = 'none'
        }
        return liberaTabs(subTabuleiros, index + 1);
    };
};

//função recursiva para identificar qual a casa do subtabuleiro jogada e bloquear as demais casas nas suas respectivas maiores(tabuleiro normal)
const bloqueiaTab = (caixinha, index = 0) => {
    const subTabClicado = caixinha.parentElement; // É o subtabuleiro da caixinha clicada, que acionou o evento de click

    const caixaGrandeClicada = subTabClicado.parentElement // É a caixa grande na qual a caixinha clicada pertence

    const subTabAtual = subTabuleiros[index]; // É o subtabuleiro analisado pela recursividade (todos, um por um)

    const caixaGrandeAtual = subTabAtual.parentElement; // É a caixa grande analisadas pela recursividade uma a uma

    const posicaoCaixinha = caixinha.classList[1]; // É classe correspondente a posição da caixinha clicada

    const posicaoTabuleiro = subTabAtual.classList[1]; // É a posição do subtabuleiro analisado pela recursividade (um por um)

    const posicaoTabuleiroClicado = subTabClicado.classList[1]; // É a posição do subtabuleiro da caixinha clicada

    const bloqueioAtual = divsBloqueio[index]; // É a div de bloqueio analisada pela recursividade uma a uma

    if (index === subTabuleiros.length) return undefined;
    else {
        if (vitoriaFinal(caixasGrandes) === null) {
            if (typeof vitoriaParcial(subTabClicado) === "number" && typeof vitoriaParcial(subTabAtual) === "number") {
                if (caixaGrandeClicada.classList[1] === 'X-vitoria') {
                    bloqueioAtual.style.display = 'inline'
                    setTimeout(() => {
                        subTabClicado.style.display = 'none'
                    }, 5000)
                } if (posicaoCaixinha === posicaoTabuleiroClicado || posicaoCaixinha === posicaoTabuleiro) {
                    liberaTabs(subTabuleiros);
                };

                // Condição ativada na recursividade quando a posição da caixinha clicada for diferente do subtabuleiro analisado
                // e também nesse subtabuleiro não tiver vitória ocorrida
            } else if (posicaoCaixinha !== posicaoTabuleiro && typeof vitoriaParcial(subTabAtual) !== 'number') {
                subTabAtual.style.animation = 'addBloq 1s ease-out forwards';
                bloqueioAtual.style.display = 'inline';

                // Condição acionada quando a posição da caixinha clicada for igual a posição do tabuleiro analisado pelo recursividade
                // E quando o subtabuleiro analisado está no meio do jogo
            } else if (posicaoCaixinha === posicaoTabuleiro && vitoriaParcial(subTabAtual) === null) {
                subTabAtual.style.animation = 'tiraBloq 1s ease-out forwards'
                subTabClicado.style.opacity = '100%'
                bloqueioAtual.style.display = 'none'

            } else if (posicaoCaixinha === posicaoTabuleiro) {
                if (caixaGrandeAtual.classList.contains('X-vitoria') || caixaGrandeAtual.classList.contains('O-vitoria') || caixaGrandeAtual.classList.contains('velha')) {
                    liberaTabs(subTabuleiros);
                };
            };
        } else {
            bloqueiaFinal();
        };
        // Condição ativada se ocorrer vitória no subtabuleiro clicado:
        return bloqueiaTab(caixinha, index + 1);
    };
};
const temSimboloFinal = (caixonas, index = 0) => {
    const caixonaAtual = caixonas[index]
    if (caixonaAtual.classList.contains('X-vitoria') || caixonaAtual.classList.contains('O-vitoria') || caixonaAtual.classList.contains('velha')) {
        if (index === caixonas.length - 1) return true
        else return temSimboloFinal(caixonas, index + 1,);
    } else {

    }
}

const vitoriaFinal = (caixonas) => {
    const classeC1 = caixonas[0].classList[2];
    const classeC2 = caixonas[1].classList[2];
    const classeC3 = caixonas[2].classList[2];
    const classeC4 = caixonas[3].classList[2];
    const classeC5 = caixonas[4].classList[2];
    const classeC6 = caixonas[5].classList[2];
    const classeC7 = caixonas[6].classList[2];
    const classeC8 = caixonas[7].classList[2];
    const classeC9 = caixonas[8].classList[2];

    if (classeC1 === classeC2 && classeC1 === classeC3 && classeC1 !== undefined) {
        if (classeC1 === 'X-vitoria') {
            return 1;
        } else if (classeC1 === 'O-vitoria') {
            return -1;
        }
    } else if (classeC4 === classeC5 && classeC4 === classeC6 && classeC4 !== undefined) {
        if (classeC4 === 'X-vitoria') {
            return 2;
        } else if (classeC4 === 'O-vitoria') {
            return -2;
        }
    } else if (classeC7 === classeC8 && classeC7 === classeC9 && classeC7 !== undefined) {
        if (classeC7 === 'X-vitoria') {
            return 3;
        } else if (classeC7 === 'O-vitoria') {
            return -3;
        }
    } else if (classeC1 === classeC4 && classeC1 === classeC7 && classeC1 !== undefined) {
        if (classeC1 === 'X-vitoria') {
            return 4;
        } else if (classeC1 === 'O-vitoria') {
            return -4;
        }
    } else if (classeC2 === classeC5 && classeC2 === classeC8 && classeC2 !== undefined) {
        if (classeC2 === 'X-vitoria') {
            return 5;
        } else if (classeC2 === 'O-vitoria') {
            return -5;
        }
    } else if (classeC3 === classeC6 && classeC3 === classeC9 && classeC3 !== undefined) {
        if (classeC3 === 'X-vitoria') {
            return 6;
        } else if (classeC3 === 'O-vitoria') {
            return -6;
        }
    } else if (classeC1 === classeC5 && classeC1 === classeC9 && classeC1 !== undefined) {
        if (classeC1 === 'X-vitoria') {
            return 7;
        } else if (classeC1 === 'O-vitoria') {
            return -7;
        }
    } else if (classeC3 === classeC5 && classeC3 === classeC7 && classeC3 !== undefined) {
        if (classeC3 === 'X-vitoria') {
            return 8;
        } else if (classeC3 === 'O-vitoria') {
            return -8;
        }
    } else if (temSimboloFinal(caixonas) === true) return false;
    else return null;
};

//função que verifica qual foi o tipo de vitoria ou empate, utilizando os casos da função vitoriaFinal
const tracoVitoriaFinal = (caixona) => (tipoVitoria) => {
    const tabuleirao = caixona.parentElement;
    const principal = tabuleirao.parentElement;
    const tracao = principal.children[0];
    const animacaoXzao = () => {
        setTimeout(() => {
            xAnima1.style.animation = 'xFinal 2.5s ease-out forwards'
            xAnima1.style.translate = '0 -50%'
            xAnima2.style.animation = 'xFinal 2.5s ease-out 1s forwards'
            xAnima2.style.translate = '0 -50%'
            principal.appendChild(xAnima1.cloneNode())
            principal.appendChild(xAnima2.cloneNode())
            tabuleirao.style.display = 'none'
        }, 10100)
    }
    const colocaOzao = () => {
        setTimeout(() => {
            const divContemBola = document.createElement('div')
            adicionarClasse('circle-container2')(divContemBola);

            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('circulao');

            const oAnima = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            oAnima.setAttribute('cx', '50%');
            oAnima.setAttribute('cy', '50%');
            oAnima.setAttribute('r', '37.86%');

            svg.appendChild(oAnima)
            divContemBola.appendChild(svg)
            const cloneBola = divContemBola.cloneNode(true)
            principal.appendChild(cloneBola)
        }, 9400)
    }

    //antes de entrar no switch case, a função verifica se o jogo ja acabou ou se deu velha, e se o jogo não estiver mais acontecendo 
    if ((tipoVitoria < 9 || tipoVitoria === false) && tipoVitoria !== null) {
        tabuleiroPrincipal.style.cursor = 'not allowed';
        switch (tipoVitoria) {
            case 1:
                tracao.style.translate = '0% 530%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 4s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 2:
                tracao.style.translate = '0% 1750%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 3:
                tracao.style.translate = '0% 2950%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 4:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '-240px 350px'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 5:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '0% 1750%'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 6:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '240px 350px'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 7:
                tracao.style.translate = '0% 1750%'
                tracao.style.rotate = '45deg'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoDiagFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case 8:
                tracao.style.translate = '0% 1750%'
                tracao.style.rotate = '-45deg'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoDiagFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 9s forwards'
                animacaoXzao()
                adicionarClasse('X-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -1:
                tracao.style.translate = '0% 530%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -2:
                tracao.style.translate = '0% 1750%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -3:
                tracao.style.translate = '0% 2950%'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoHorizFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -4:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '-240px 350px'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -5:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '0% 1750%'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -6:
                tracao.style.rotate = '90deg'
                tracao.style.height = '20px'
                tracao.style.translate = '245px 350px'
                tracao.style.animation = 'tracoVertFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -7:
                tracao.style.translate = '0% 1750%'
                tracao.style.rotate = '45deg'
                tracao.style.height = '20px'
                tracao.style.animation = 'tracoDiagFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case -8:
                tracao.style.translate = '0% 1750%'
                tracao.style.height = '20px'
                tracao.style.rotate = '-45deg'
                tracao.style.animation = 'tracoDiagFinal 5s ease-out 3s forwards'
                tabuleirao.style.animation = 'someTab 1s ease-out 8s forwards'
                colocaOzao()
                adicionarClasse('O-vitoria-final')(tabuleiroPrincipal)
                bloqueiaFinal()
                break;
            case false:
                tabuleirao.style.animation = 'velha 2s ease-out 2.5s forwards'
                tabuleirao.style.cursor = 'not-allowed'
        }
    }
}

const bloqueiaFinal = (index = 0) => {
    console.log(index);
    const subTabAtual = subTabuleiros[index]
    const bloqueioAtual = divsBloqueio[index];
    if (index === 9) return undefined;
    else {
        subTabAtual.style.animation = 'addBloq 1s ease-out forwards';
        bloqueioAtual.style.display = 'inline';
        return bloqueiaFinal(index + 1)
    }
}
