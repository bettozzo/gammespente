const prompt = document.getElementById("prompt");
const opzione1Btn = document.getElementById("opzione1");
const conseguenza1 = document.getElementById("conseguenza1");
const opzione2Btn = document.getElementById("opzione2");
const conseguenza2 = document.getElementById("conseguenza2");
const opzione3Btn = document.getElementById("opzione3");
const conseguenza3 = document.getElementById("conseguenza3");


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('totale-giorni').textContent = lastDay;
    currentDay = 0;
    doNextDay(calendario[0]);
});


function doNextDay(dayInfo) {
    giorniSpan.textContent = currentDay;
    runDailyEvents();
    setupDay(dayInfo);
    if (checkIfGameEnded()) {
        sessionStorage.setItem("soldiFinale", soldiSpan.textContent);
        sessionStorage.setItem("giorniFinale", currentDay);
        window.location.href = "./endscreen.html";
    }
    currentDay += 1;
}

function checkIfGameEnded() {
    if (currentDay == lastDay || soldiSpan.textContent < 0) {
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
    const eventsToDo = eventi.filter((evento) => currentDay >= evento.prossimoGiorno)
    for (let i = 0; i < eventsToDo.length; i++) {
        console.log(eventsToDo[i].descrizione + "; " + eventsToDo[i].prossimoGiorno);
    }
    if (eventsToDo.length == 0) {
        return;
    }
    for (let i = 0; i < eventsToDo.length; i++) {
        let event = eventsToDo[i];
        switch (event.tipo) {
            case "Random": break;
            case "Conseguenza": break;
            default: break;
        }
        if (event.effetto == '?') {

        } else {
            console.log("Evento: ", event.id, " ha avuto effetto: ", event.effetto)
        }

    }
    let isDayWithEvent = Math.random() < 0.5;
    if (isDayWithEvent) {
        let event = eventsToDo[0];
        console.log("è capitato: " + event.id + "; " + event.prossimoGiorno);
        event.prossimoGiorno = currentDay + shuffleArray(event.periodo)[0];
    }
    console.log("fine eventi");
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
    if (giorniDaControllarePerFlags.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: lavoroInNero = false; break;
            case 2: costoSpesa = -84; break;
            case 6: userUsaLavatriceAGettoni = 0; break;
            case 11: userPagaRataArmadio = false; break;
            case 22: userPulisceScale = true; break;
            case 27: userConsegnaCibo = true; break;
            case 28: userFuma = true; break;
            case 29: paccoCibo = true; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza1.textContent.replace("€", ""));
})
opzione2Btn.addEventListener("click", (e) => {
    if (giorniDaControllarePerFlags.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: lavoroInNero = true; break;
            case 2: costoSpesa = -105; break;
            case 6: userUsaLavatriceAGettoni = 0; break;
            case 11: userPagaRataArmadio = false; break;
            case 22: userPulisceScale = false; break;
            case 27: userConsegnaCibo = false; break;
            case 28: userFuma = false; break;
            case 29: paccoCibo = false; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza2.textContent.replace("€", ""));
})
opzione3Btn.addEventListener("click", (e) => {
    if (giorniDaControllarePerFlags.includes(dayToCheck)) {
        switch (dayToCheck) {
            case 0: lavoroInNero = undefined; break;
            case 2: costoSpesa = -140; break;
            case 6: userUsaLavatriceAGettoni = -7; break;
            case 11: userPagaRataArmadio = true; break;
            case 22: userPulisceScale = undefined; break;
            case 27: userConsegnaCibo = undefined; break;
            case 28: userFuma = undefined; break;
            case 29: paccoCibo = undefined; break;
            default: console.error("si dovrebbe impostare una flag in questo giorno, ma non si sa quale. Giorno: ", dayToCheck)
        }
    }
    buttonReactOnClick(conseguenza3.textContent.replace("€", ""));
})

function buttonReactOnClick(quantitàDiSoldi) {
    doConseguenza(quantitàDiSoldi)
    doNextDay(calendario[currentDay]);
}