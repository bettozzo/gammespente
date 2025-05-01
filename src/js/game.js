const prompt = document.getElementById("prompt");
const opzione1Btn = document.getElementById("opzione1");
const conseguenza1 = document.getElementById("conseguenza1");
const opzione2Btn = document.getElementById("opzione2");
const conseguenza2 = document.getElementById("conseguenza2");
const opzione3Btn = document.getElementById("opzione3");
const conseguenza3 = document.getElementById("conseguenza3");

const bottoneOkGiornataConseguenza = document.getElementById("ok-conseguenza");
const conseguenzaGiornata = document.getElementById("conseguenzaGiornata");



let numeroGiornateDiConseguenza = undefined;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('totale-giorni').textContent = totalAmountOfDays;
    currentDay = 0;
    doNextDay(calendario[0]);
});


function doNextDay(dayInfo) {
    if (checkIfGameEnded()) {
        sessionStorage.setItem("soldiFinale", soldiSpan.textContent);
        sessionStorage.setItem("giorniFinale", currentDay);
        window.location.href = "./endscreen.html";
        return;
    }
    console.log(soldiSpan)
    giorniSpan.textContent = currentDay + 1;
    setupDay(dayInfo);
    runDailyEvents();
}

function checkIfGameEnded() {
    if (currentDay >= totalAmountOfDays || soldiSpan.textContent < 0) {
        return true;
    }
    return false;
}

function setupDay(dayInfo) {
    prompt.textContent = dayInfo.prompt;

    if (currentDay == 1) {
        document.getElementById("div-per-scelta-bottoni").style.display = "none";
        document.getElementById("div-per-conseguenza-giornata").style.display = "none";
        document.getElementById("div-per-scelta-slider").style.display = "inline-block";
        handleSliderInput();
    } else {
        document.getElementById("div-per-scelta-bottoni").style.display = "flex";
        document.getElementById("div-per-conseguenza-giornata").style.display = "none";
        document.getElementById("div-per-scelta-slider").style.display = "none";
        handleNormalInputs(dayInfo);
    }
}

function handleNormalInputs(dayInfo) {
    opzione1Btn.textContent = dayInfo.scelta1;
    conseguenza1.textContent = dayInfo.conseguenza1;
    opzione2Btn.textContent = dayInfo.scelta2;
    conseguenza2.textContent = dayInfo.conseguenza2;
    if (dayInfo.scelta3 != "") {
        document.getElementById("terza-div").style.display = 'block';
        opzione3Btn.textContent = dayInfo.scelta3;
        conseguenza3.textContent = dayInfo.conseguenza3;
    } else {
        document.getElementById("terza-div").style.display = 'none';
    }
}

function handleSliderInput() {
    const buttonToConfirm = document.getElementById("slider-conferma");
    const slider = document.getElementById("slider");

    const minAffitto = -400;
    const maxAffitto = -700;
    const minBenzina = -180;
    const maxBenzina = 0;

    buttonToConfirm.addEventListener("click", (e) => {
        let sliderPercentuale = slider.value / 100;

        const spesaAffitto = (maxAffitto - minAffitto) * sliderPercentuale + minAffitto
        const spesaBenzina = (maxBenzina - minBenzina) * sliderPercentuale + minBenzina
        buttonReactOnClick(spesaAffitto + spesaBenzina)
    })

    slider.oninput = function () {
        const affitto = document.getElementById("spesa-affitto-span");
        const benzina = document.getElementById("spesa-benzina-span");
        let sliderPercentuale = this.value / 100;

        const spesaAffitto = (maxAffitto - minAffitto) * sliderPercentuale + minAffitto
        const spesaBenzina = (maxBenzina - minBenzina) * sliderPercentuale + minBenzina

        benzina.textContent = Math.round(spesaBenzina);
        affitto.textContent = Math.round(spesaAffitto);
        buttonToConfirm.textContent = "Conferma spesa di: " + Math.round(spesaAffitto + spesaBenzina) + "€"
    };
}

function runDailyEvents() {
    const eventsToDo = eventi.filter((evento) => currentDay > evento.prossimoGiorno && !evento.tipo.includes("Conseguenza"))
    if (eventsToDo.length != 0) {
        runNormalEvents(eventsToDo)
    }
    if (listaGiorniSostuituibili.includes(currentDay)) {
        runAllConseguenze()
    }
}

function runNormalEvents(eventsToDo) {
    const dailyFlags = getAllFlagsOfDay(currentDay);
    for (let i = 0; i < eventsToDo.length; i++) {
        let evento = eventsToDo[i];
        let flag = dailyFlags[i];
        if (!flag) {
            continue;
        }
        evento.prossimoGiorno += shuffleArray(evento.periodo)[0]
        if (evento.effetto != '?') {
            showPopUp(evento.prompt, evento.effetto);
            soldiSpan.textContent = Math.round(
                Number(soldiSpan.textContent) + Number(evento.effetto.replace("€", ""))
            )
        } else {
            if (evento.id == 1) { //malattia
                let vienePagato = flags["lavoroConContratto"]
                //todo domanda
                showPopUp(evento.prompt, "Ma non so quanto darti");
                // soldiSpan.textContent = Math.round(
                //     Number(soldiSpan.textContent) + Number(evento.effetto.replace("€", ""))
                // )
            } else if (evento.id == 2) {
                if (flag["userHaSceltoSpesa"]) {
                    showPopUp(evento.prompt, costoSpesa);
                    soldiSpan.textContent = Math.round(Number(soldiSpan.textContent) + costoSpesa)
                }
            }
        }
    }
}
function runAllConseguenze() {
    //La prima volta possibile, scegli quante conseguenze devono capitare
    if (numeroGiornateDiConseguenza == undefined) {
        let numeroPrevenzioniFatte = [
            flags["eseguitoPrimaPreventiva"], flags["eseguitoSecondaPreventiva"], flags["eseguitoTerzaPreventiva"]
        ].filter(Boolean).length;

        switch (numeroPrevenzioniFatte) {
            case 0:
                if (Math.random() <= 0.5) {
                    numeroGiornateDiConseguenza = 1;
                } else {
                    numeroGiornateDiConseguenza = 2;
                }
                break;
            case 1:
                if (Math.random() <= 0.6) {
                    numeroGiornateDiConseguenza = 1;
                } else {
                    numeroGiornateDiConseguenza = 0;
                }
                break;
            case 2:
                if (Math.random() <= 0.4) {
                    numeroGiornateDiConseguenza = 1;
                } else {
                    numeroGiornateDiConseguenza = 0;
                }
                break;
            case 3:
                numeroGiornateDiConseguenza = 0;
                break;
            default: console.error("Troppe giornate preventive")
        }
        numeroPrevenzioniFatte = 1
    }
    if (numeroGiornateDiConseguenza > 0) {
        runConseguenzaGiornata();
        numeroGiornateDiConseguenza -= 1;
    }

}

function runConseguenzaGiornata() {
    document.getElementById("div-per-scelta-bottoni").style.display = "none";
    document.getElementById("div-per-conseguenza-giornata").style.display = "flex";


    for (let i = 0; i < conseguenzeDaFare.length; i++) {
        let evento = conseguenzeDaFare[i];
        if (evento.tipo.includes("Conseguenza1") && !flags["eseguitoPrimaPreventiva"]) {
            prompt.textContent = evento.prompt;
            conseguenzaGiornata.textContent = evento.effetto;
            conseguenzeDaFare.splice(i, 1);
            break;
        } else if (evento.tipo.includes("Conseguenza2") && !flags["eseguitoSecondaPreventiva"]) {
            prompt.textContent = evento.prompt;
            conseguenzaGiornata.textContent = evento.effetto;

            conseguenzeDaFare.splice(i, 1);
            break;
        } else if (evento.tipo.includes("Conseguenza3") && !flags["eseguitoTerzaPreventiva"]) {

            prompt.textContent = evento.prompt;
            conseguenzaGiornata.textContent = evento.effetto;

            conseguenzeDaFare.splice(i, 1);
            break;
        }
    }

}


function showPopUp(prompt, effetto) {
    const windowPopup = document.getElementById("window-evento");
    windowPopup.style.display = "block";
    const closeButton = document.getElementById("close-popup");
    const promptEvento = document.getElementById("prompt-evento");

    promptEvento.textContent = prompt + "\n" + effetto;

    closeButton.onclick = function () {
        windowPopup.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == windowPopup) {
            windowPopup.style.display = "none";
        }
    }
}
/**
 * 
 * @param {string} amount 
 */
function doConseguenzaAzione(amount) {
    soldiSpan.textContent = Math.round((Number(soldiSpan.textContent) + Number(amount)))
}

opzione1Btn.addEventListener("click", (e) => {
    if (listaGiorniConFlag.includes(currentDay)) {
        switch (currentDay) {
            case 0: flags["lavoroConContratto"] = true; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -84;
                break;
            case 3: flags["eseguitoPrimaPreventiva"] = true; break;
            case 5: flags["eseguitoSecondaPreventiva"] = true; break;
            case 6: flags["userUsaLavatriceAGettoni"] = false; break;
            case 7: flags["eseguitoTerzaPreventiva"] = true; break;
            case 11: flags["userPagaRataArmadio"] = false; break;
            case 14: flags["userHaUnCane"] = true;
                costoSpesa += + Number(conseguenza1.textContent.replace("€", ""));
                break;
            case 22: flags["userPulisceScale"] = true; break;
            case 27: flags["userConsegnaCibo"] = true; break;
            case 28: flags["userFuma"] = true; break;
            case 29: flags["paccoCibo"] = true; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", currentDay)
        }
    }
    buttonReactOnClick(conseguenza1.textContent.replace("€", ""));
})


opzione2Btn.addEventListener("click", (e) => {
    if (listaGiorniConFlag.includes(currentDay)) {
        switch (currentDay) {
            case 0: flags["lavoroConContratto"] = false; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -105;
                break;
            case 3: flags["eseguitoPrimaPreventiva"] = false; break;
            case 5: flags["eseguitoSecondaPreventiva"] = false; break;
            case 6: flags["userUsaLavatriceAGettoni"] = false; break;
            case 7: flags["eseguitoTerzaPreventiva"] = false; break;
            case 11: flags["userPagaRataArmadio"] = false; break;
            case 14: flags["userHaUnCane"] = false; break;
            case 22: flags["userPulisceScale"] = false; break;
            case 27: flags["userConsegnaCibo"] = false; break;
            case 28: flags["userFuma"] = false; break;
            case 29: flags["paccoCibo"] = false; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", currentDay)
        }
    }
    buttonReactOnClick(conseguenza2.textContent.replace("€", ""));
})


opzione3Btn.addEventListener("click", (e) => {
    if (listaGiorniConFlag.includes(currentDay)) {
        switch (currentDay) {
            case 0: flags["lavoroConContratto"] = undefined; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -140;
                break;
            case 3: flags["eseguitoPrimaPreventiva"] = undefined; break;
            case 5: flags["eseguitoSecondaPreventiva"] = undefined; break;
            case 6: flags["userUsaLavatriceAGettoni"] = true; break;
            case 7: flags["eseguitoTerzaPreventiva"] = undefined; break;
            case 11: flags["userPagaRataArmadio"] = true; break;
            case 14: flags["userHaUnCane"] = undefined; break;
            case 22: flags["userPulisceScale"] = undefined; break;
            case 27: flags["userConsegnaCibo"] = undefined; break;
            case 28: flags["userFuma"] = undefined; break;
            case 29: flags["paccoCibo"] = undefined; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", currentDay)
        }
    }
    buttonReactOnClick(conseguenza3.textContent.replace("€", ""));
})


bottoneOkGiornataConseguenza.addEventListener("click", (e) => {
    buttonReactOnClick(conseguenzaGiornata.textContent.replace("€", ""));
});

function buttonReactOnClick(quantitàDiSoldi) {
    currentDay += 1;
    doConseguenzaAzione(quantitàDiSoldi)
    doNextDay(calendario[currentDay]);
}