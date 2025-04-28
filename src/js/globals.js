//********************
//*****Variabili******
//********************

const soldiSpan = document.getElementById("soldi");
const giorniSpan = document.getElementById("giorno");


let currentDay = undefined;
let lastDay = calendario.length;


const giorniDaControllarePerFlags = [0, 2, 6, 11, 22, 27, 28, 29]
let lavoroInNero = undefined;
let costoSpesa = undefined;

let userUsaLavatriceAGettoni = undefined;
let userPagaRataArmadio = undefined;
let userPulisceScale = undefined;
let userConsegnaCibo = undefined;
let userFuma = undefined;
let paccoCibo = undefined;



//********************
//******Funzioni******
//********************

const sleep = ms => new Promise(r => setTimeout(r, ms));

function shuffleArray(arr) {
    if (arr.length == 1 || arr.length == 0) {
        return arr
    }
    let shuffledArray = arr;
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}