const prompt = document.getElementById("prompt");
const opzione1Btn = document.getElementById("opzione1");
const conseguenza1 = document.getElementById("conseguenza1");
const opzione2Btn = document.getElementById("opzione2");
const conseguenza2 = document.getElementById("conseguenza2");
const opzione3Btn = document.getElementById("opzione3");
const conseguenza3 = document.getElementById("conseguenza3");

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('totale-giorni').textContent = totalAmountOfDays;
    currentDay = 0;
    doNextDay(calendario[0]);
});


function doNextDay(dayInfo) {
    giorniSpan.textContent = currentDay + 1;
    setupDay(dayInfo);
    runDailyEvents();
    if (checkIfGameEnded()) {
        sessionStorage.setItem("soldiFinale", soldiSpan.textContent);
        sessionStorage.setItem("giorniFinale", currentDay);
        window.location.href = "./endscreen.html";
    }
    currentDay += 1;
}

function checkIfGameEnded() {
    if (currentDay == totalAmountOfDays || soldiSpan.textContent < 0) {
        return true;
    }
    return false;
}

function setupDay(dayInfo) {
    prompt.textContent = dayInfo.prompt;

    if (currentDay == 1) {
        document.getElementById("div-per-scelta-bottoni").style.display = "none";
        document.getElementById("div-per-scelta-slider").style.display = "inline-block";
        handleSliderInput();
    } else {
        document.getElementById("div-per-scelta-bottoni").style.display = "flex";
        document.getElementById("div-per-scelta-slider").style.display = "none";
        handleNormalInputs(dayInfo)
    }
}

function handleNormalInputs(dayInfo) {
    opzione1Btn.textContent = dayInfo.scelta1
    conseguenza1.textContent = dayInfo.conseguenza1
    opzione2Btn.textContent = dayInfo.scelta2
    conseguenza2.textContent = dayInfo.conseguenza2
    if (dayInfo.scelta3 != "") {
        document.getElementById("terza-div").style.display = 'block';
        opzione3Btn.textContent = dayInfo.scelta3
        conseguenza3.textContent = dayInfo.conseguenza3
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
    let dayToCheck = currentDay - 1;
    const eventsToDo = eventi.filter((evento) =>
        dayToCheck > evento.prossimoGiorno
        && evento.tipo != "Conseguenza"
    )
    if (eventsToDo.length == 0) {
        return;
    }
    const dailyFlags = getAllFlagsOfDay(dayToCheck);
    for (let i = 0; i < eventsToDo.length; i++) {
        let event = eventsToDo[i];
        let flag = dailyFlags[i];
        if (!flag) {
            console.log(event.descrizione)
            continue;
        }
        event.prossimoGiorno += shuffleArray(event.periodo)[0]
        if (event.effetto == '?') {

        } else {
            showPopUp(event.prompt);
            //todo fare effetto
            console.log("Evento: ", event.id, " ha avuto effetto: ", event.effetto)
        }
    }
    console.log("fine eventi");
}


function showPopUp(prompt) {
    const windowPopup = document.getElementById("window-evento");
    windowPopup.style.display = "block";
    const closeButton = document.getElementById("close-popup");
    const promptEvento = document.getElementById("prompt-evento");

    promptEvento.textContent = prompt;

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
function doConseguenza(amount) {
    soldiSpan.textContent = Math.round((Number(soldiSpan.textContent) + Number(amount)))
}

opzione1Btn.addEventListener("click", (e) => {
    let dayToCheck = currentDay - 1;
    if (listaGiorniConFlag.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: flags["lavoroConContratto"] = true; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -84;
                break;
            case 3: flags["eseguitoPrimaPreventiva"] = true; break;
            case 5: flags["eseguitoSecondaPreventiva"] = true; break;
            case 6: flags["userUsaLavatriceAGettoni"] = false; break;
            case 11: flags["userPagaRataArmadio"] = false; break;
            case 14: flags["userHaUnCane"] = true;
                costoSpesa += + Number(conseguenza1.textContent.replace("€", ""));
                break;
            case 22: flags["userPulisceScale"] = true; break;
            case 27: flags["userConsegnaCibo"] = true; break;
            case 28: flags["userFuma"] = true; break;
            case 29: flags["paccoCibo"] = true; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza1.textContent.replace("€", ""));
})


opzione2Btn.addEventListener("click", (e) => {
    let dayToCheck = currentDay - 1;
    if (listaGiorniConFlag.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: flags["lavoroConContratto"] = false; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -105;
                break;
            case 3: flags["eseguitoPrimaPreventiva"] = false; break;
            case 5: flags["eseguitoSecondaPreventiva"] = false; break;
            case 6: flags["userUsaLavatriceAGettoni"] = false; break;
            case 11: flags["userPagaRataArmadio"] = false; break;
            case 14: flags["userHaUnCane"] = false; break;
            case 22: flags["userPulisceScale"] = false; break;
            case 27: flags["userConsegnaCibo"] = false; break;
            case 28: flags["userFuma"] = false; break;
            case 29: flags["paccoCibo"] = false; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza2.textContent.replace("€", ""));
})


opzione3Btn.addEventListener("click", (e) => {
    let dayToCheck = currentDay - 1;
    if (listaGiorniConFlag.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: flags["lavoroConContratto"] = undefined; break;
            case 2: flags["userHaSceltoSpesa"] = true;
                costoSpesa = -140;
                break;
            case 6: flags["userUsaLavatriceAGettoni"] = true; break;
            case 11: flags["userPagaRataArmadio"] = true; break;
            case 14: flags["userHaUnCane"] = undefined; break;
            case 22: flags["userPulisceScale"] = undefined; break;
            case 27: flags["userConsegnaCibo"] = undefined; break;
            case 28: flags["userFuma"] = undefined; break;
            case 29: flags["paccoCibo"] = undefined; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza3.textContent.replace("€", ""));
})

function buttonReactOnClick(quantitàDiSoldi) {
    doConseguenza(quantitàDiSoldi)
    doNextDay(calendario[currentDay]);
}