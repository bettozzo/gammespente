//********************
//*****Variabili******
//********************

const soldiSpan = document.getElementById("soldi");
const giorniSpan = document.getElementById("giorno");


let currentDay = undefined;
let totalAmountOfDays = calendario.length;
let costoSpesa = undefined;

const listaGiorniConFlag = [0, 2, 3, 5, 6, 11, 14, 22, 27, 28, 29].sort(function (a, b) {
    return a - b;
});
let flags = {
    lavoroConContratto: undefined,
    userHaSceltoSpesa: undefined,
    userUsaLavatriceAGettoni: undefined,
    userPagaRataArmadio: undefined,
    userHaUnCane: undefined,
    userPulisceScale: undefined,
    userConsegnaCibo: undefined,
    userFuma: undefined,
    paccoCibo: undefined,

    eseguitoPrimaPreventiva: undefined,
    eseguitoSecondaPreventiva: undefined
    //todo terza
}

function getFlagValueFromDay(day) {
    switch (day) {
        case 0: return flags["lavoroConContratto"]
        case 2: return flags["userHaSceltoSpesa"]
        case 3: return flags["eseguitoPrimaPreventiva"]
        case 5: return flags["eseguitoSecondaPreventiva"]
        case 6: return flags["userUsaLavatriceAGettoni"]
        case 11: return flags["userPagaRataArmadio"]
        case 14: return flags["userHaUnCane"]
        case 22: return flags["userPulisceScale"]
        case 27: return flags["userConsegnaCibo"]
        case 28: return flags["userFuma"]
        case 29: return flags["paccoCibo"]
        default: return undefined
    }
}

function getAllFlagsOfDay(dayToCheck) {
    let flagsBeforeThisDay = -1;
    while (flagsBeforeThisDay == -1) {
        flagsBeforeThisDay = listaGiorniConFlag.findIndex(
            val => val == dayToCheck + 1
        );
        dayToCheck -= 1;
    }

    let sliced = Object.fromEntries(Object.entries(flags).slice(0, flagsBeforeThisDay));
    return Object.values(sliced)
}

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