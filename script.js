let audio;
let isPlaying = true;
let transcript = "";
let recognition; // Variável global para o reconhecimento de voz

//Esse código JavaScript está usando o método document.getElementById() para acessar elementos no DOM (Modelo de Objeto de Documento) 
//com base em seus IDs.
//Esse trecho de código comanda as paginas do site
document.getElementById('play-button').addEventListener('click', function () {
    const audioFile = document.getElementById('audio-file').files[0];
    if (audioFile) {
        document.getElementById('initial-page').style.display = 'none';
        document.getElementById('player-page').style.display = 'block';
//Esse código em JavaScript cria um elemento de áudio e o reproduz. 
        audio = new Audio(URL.createObjectURL(audioFile));
        audio.play();
//Esse código está adicionando um ouvinte de eventos ao elemento de áudio HTML5.
        audio.addEventListener('timeupdate', function () {
            const progressBar = document.getElementById('progress-bar');
            const timeDisplay = document.getElementById('time-display');
            const currentTime = audio.currentTime;
            const duration = audio.duration;
//Esse código está relacionado a uma barra de progresso (ou “progress bar”) em algum contexto de reprodução de mídia. 
         progressBar.value = (currentTime / duration) * 100;
            timeDisplay.textContent = formatTime(currentTime) + ' / ' + formatTime(duration);
        });
//Esse trecho de código está relacionado ao evento de finalização (“ended”) de um elemento de áudio em uma página da web. 
        audio.addEventListener('ended', function () {
            document.getElementById('player-page').style.display = 'none';
            document.getElementById('end-page').style.display = 'block';
            if (recognition) recognition.stop();
            saveTranscript();
        });
    }
});
//esse código controla a reprodução e pausa de um áudio associado ao botão com ID 'play-stop-button'
        audio = document.getElementById('audioPlayer');
        const playStopButton = document.getElementById('play-stop-button');
         isPlaying = false;

        playStopButton.addEventListener('click', function () {
            if (isPlaying) {
                audio.pause();
                audio.currentTime = 0; // Volta o áudio ao início quando pausado
                this.textContent = '▶️';
            } else {
                audio.play();
                this.textContent = '⏸️';
            }
            isPlaying = !isPlaying;
});
//esse código permite que o usuário clique no botão com ID 'mic-button' 
//para iniciar o reconhecimento de fala em português e exibir as transcrições 
document.getElementById('mic-button').addEventListener('click', function () {
    if (!recognition) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.interimResults = true;
        recognition.continuous = true;
        recognition.lang = 'pt-BR';

        recognition.onresult = function(event) {
            const transcriptResult = event.results[event.results.length - 1][0].transcript.trim();

            // Evitar repetição
            if (!transcript.endsWith(transcriptResult)) {
                transcript += transcriptResult + " ";
                document.getElementById('lyrics-display').textContent = transcript;
            }
        };

        recognition.start();
    }
});
//esse código controla a interface de áudio e a exibição de elementos na página com base no clique do botão. 
document.getElementById('yes-button').addEventListener('click', function () {
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('player-page').style.display = 'block';
    audio.currentTime = 0;
    audio.play();
    isPlaying = true;
    document.getElementById('play-stop-button').textContent = -'⏸️';
});

document.getElementById('no-button').addEventListener('click', function () {
    document.getElementById('end-page').style.display = 'none';
    document.getElementById('initial-page').style.display = 'block';
    document.getElementById('audio-file').value = "";
    audio.pause();
});
// esse trecho de código é para adicionar um evento no botão microfone
function saveTranscript() {
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transcription.txt";
    link.click();
}
//esse trecho de código formata o tempo para a fgala ser transcrita
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return minutes + ':' + (secondsLeft < 10 ? '0' : '') + secondsLeft;
}

        const button = document.getElementById('microphone-button');
        const stopButton = document.getElementById('stop-button');
        const saveButton = document.getElementById('save-button');
        const clearButton = document.getElementById('clear-button');
        const result = document.getElementById('result');

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if ('SpeechRecognition' in window) {
            const recognition = new SpeechRecognition();
            recognition.lang = 'pt-BR';
            recognition.continuous = true;
            recognition.interimResults = true;

            button.addEventListener('click', () => {
                recognition.start();
            });

            stopButton.addEventListener('click', () => {
                recognition.stop();
            });

            recognition.onresult = (event) => {
                let interimTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        result.value += transcript + '\n';
                    } else {
                        interimTranscript += transcript;
                    }
                }
            };
            recognition.onerror = (event) => {
                console.error(event.error);
            };

            recognition.onend = () => {
                console.log('Reconhecimento de fala encerrado.');
            };

            saveButton.addEventListener('click', () => {
                const blob = new Blob([result.value], { type: 'text/plain' });
                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob);
                anchor.download = 'transcricao.txt';
                document.body.appendChild(anchor);
                anchor.click();
                document.body.removeChild(anchor);
            });

            clearButton.addEventListener('click', () => {
                result.value = '';
            });
        } else {
            console.error('A API de Reconhecimento de Fala não é suportada neste navegador.');
        }

        