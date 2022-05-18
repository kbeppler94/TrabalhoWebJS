(function () {
    var matches = 0; //contador de acertos, ao chegar em 6 o jogo termina

    var images = []; //array que armazenará os objetos com src e id de 1 a 6

    var flippedCards = []; //array que armazena as cartas viradas

    var imgMatchSign = document.querySelector("#imgMatchSign"); //imagem a ser exibida em caso de acerto

    for (var i = 0; i < 12; i++) { //atribui as imagens as peças
        var img = {  //cria um objeto img com src e um id
            src: "Imagens/" + i + ".jpg",
            id: i % 6
        };
        images.push(img); //insere o objeto criado no array
    }

    // --> Criação do timer e da variável de controle para parar o contador de tempo
    var gameOn = false;
    var timer = [];
    timer.text = document.createElement('div');
    timer.text.innerHTML = "TEMPO: 0";
    timer.text.style.color = "#fff";
    document.body.appendChild(timer.text);

    // --> Criação da variável para controlar o número de tentativas
    var tentativas = [];
    tentativas.num = 0;
    tentativas.text = document.createElement('div');
    tentativas.text.innerHTML = "TENTATIVAS: 0";
    tentativas.text.style.color = "#fff";
    document.body.appendChild(tentativas.text);


    startGame(); //chama a função que inicia o jogo

    function startGame() { //função que inicia o jogo
        matches = 0;  //zera o contador de acertos

        flippedCards = []; //zera o array de peças viradas
        images = randomSort(images);  //embaralha o array de imagens 

        //lista de elementos div com as classes "back" e "front"
        var frontFaces = document.getElementsByClassName("front");
        var backFaces = document.getElementsByClassName("back");

        for (var i = 0; i < 12; i++) { //posiciona as peças e adiciona o evento click 
            //limpa as peças marcadas 
            frontFaces[i].classList.remove("flipped", "match");
            backFaces[i].classList.remove("flipped", "match");

            var card = document.querySelector("#card" + i); //posiciona as peças no tabuleiro
            card.style.left = i % 6 === 0 ? `${5}px` : `${i % 6 * 200 + 5}px`;
            card.style.top = i < 6 ? 5 + "px" : `${150}px`;

            card.addEventListener("click", flipCard, false); //adiciona às peças o evento click e chama a função que vira as peças

            //adiciona as imagens às peças
            frontFaces[i].style.background = "url('" + images[i].src + "')";
            frontFaces[i].setAttribute("id", images[i].id);

        }

        // --> Chamada da função que inicia o timer
        var button = document.getElementById('iniciar')
        button.addEventListener('click', function () {
            setTimer()
        })
    }


    function randomSort(oldArray) { //função que embaralha as peças recebendo um array de peças por parametro
        var newArray = []; //cria uma array vazio 
        //executa enquanto o novo array não atingir o mesmo número de elementos do array passado por parâmetro
        while (newArray.length !== oldArray.length) {
            //cria uma var i que recebe um número aleatório entre 0 e o número de elementos no array -1
            var i = Math.floor(Math.random() * oldArray.length);
            //verifica se o elemento indicado pelo i já existe no novo array
            if (newArray.indexOf(oldArray[i]) < 0) {
                newArray.push(oldArray[i]); //caso não exista, é inserido 
            }
        }
        return newArray; //retorna o novo array que possui os elementos do old array embaralhados
    }

    function flipCard() { //função que vira as peças
        if (flippedCards.length < 2) { //verifica se o número de peças viradas é menor que dois 
            var faces = this.getElementsByClassName("face"); //pega as faces da peça clicada

            if (faces[0].classList.length > 2) { //confere se a peça já esta virada, impedindo que a mesma seja virada duas vezes
                return;
            }

            //adiciona a classe "flipped" às faces da peça para que sejam viradas
            faces[0].classList.toggle("flipped");
            faces[1].classList.toggle("flipped");

            flippedCards.push(this); //adiciona a peça clicada ao array de peças viradas (flippedCards)

            if (flippedCards.length === 2) { //verifica se o número de peças no array de peças viradas (flippedCards) é igual a 2 
                setTimeout(() => {  // Adicionando timeout para as peças virarem sozinhas
                    flipCard();
                }, 1500)

                // --> Contabilizando uma tentativa
                tentativas.num++;
                tentativas.text.innerHTML = "TENTATIVAS: " + tentativas.num;

                //compara o id das peças viradas para ver se houve um acerto
                if (flippedCards[0].childNodes[3].id === flippedCards[1].childNodes[3].id) {
                    //em caso de acerto adiciona a classe match a todas as faces das duas peças presentes no array flippedCards
                    flippedCards[0].childNodes[1].classList.toggle("match");
                    flippedCards[0].childNodes[3].classList.toggle("match");
                    flippedCards[1].childNodes[1].classList.toggle("match");
                    flippedCards[1].childNodes[3].classList.toggle("match");

                    matchCardSign(); //chama a função que exibe a mensagem match

                    matches++; //incrementa o contador de acertos

                    flippedCards = []; //limpa o array de cartas viradas

                    if (matches === 6) { //verifica se o contador de acertos chegou a seis
                        gameOver(); //caso haja seis acertos, chama a função que finaliza o jogo
                    }
                }
            }

        } else {
            //caso existam 2 peças no array flippedCards, o terceiro click em qualquer peça remove a classe flipped das peças deste array
            flippedCards[0].childNodes[1].classList.toggle("flipped");
            flippedCards[0].childNodes[3].classList.toggle("flipped");
            flippedCards[1].childNodes[1].classList.toggle("flipped");
            flippedCards[1].childNodes[3].classList.toggle("flipped");

            flippedCards = []; // limpa o array de cartas viradas
        }
    }

    function gameOver() { //função do fim de jogo
        // --> Interrupção da contagem de tempo e limpeza do Intervalo
        gameOn = false;
        clearInterval(timer.click);
        swal({                     //declaração da mensagem de fim de jogo
            title: 'PARABÉNS, VOCÊ VENCEU!!'
                + "\n" + tentativas.text.innerHTML
                + "\n" + timer.text.innerHTML + ' segundos',
            type: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: "#FFA500"
        });
    }

    function matchCardSign() {  //função que gera o sinal de match ("acerto")
        imgMatchSign.style.zIndex = 1; // joga a mensagem de acerto para o primeiro plano ("tabuleiro")
        imgMatchSign.style.top = 60 + "px"; //move a mensagem para cima
        imgMatchSign.style.opacity = 0; //deixa a mensagem transparente
        setTimeout(function () { //define o intervalo da aparição do match
            imgMatchSign.style.zIndex = -1;
            imgMatchSign.style.top = 160 + "px";
            imgMatchSign.style.opacity = 1;
        }, 1500);
    }


    function setTimer() { //função que inicia o timer
        gameOn = true;

        timer.text.innerHTML = "TEMPO: 0"; //zera o timer 
        var seconds = 0;

        timer.click = setInterval(function () { //Acrescenta os segundos ao timer e define o intervalo destes
            if (gameOn) {
                seconds++;
                timer.text.innerHTML = "TEMPO: " + seconds;
            }
        }, 1000);

        // --> Zera as tentativas contabilizadas
        tentativas.num = 0;
        tentativas.text.innerHTML = "TENTATIVAS: 0";
    }

}())
