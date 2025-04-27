const sleep = ms => new Promise(r => setTimeout(r, ms));

let currentDay = 0;

const soldiSpan = document.getElementById("soldi");
const giorniSpan = document.getElementById("giorno");

const prompt = document.getElementById("prompt");
const opzione1Btn = document.getElementById("opzione1");
const conseguenza1 = document.getElementById("conseguenza1");
const opzione2Btn = document.getElementById("opzione2");
const conseguenza2 = document.getElementById("conseguenza2");
const opzione3Btn = document.getElementById("opzione3");
const conseguenza3 = document.getElementById("conseguenza3");



document.addEventListener('DOMContentLoaded', function () {
    main();
});

async function main() {
    doTheDay(calendario[0]);
}

function doTheDay(dayInfo) {
    giorniSpan.textContent = currentDay + 1;
    if (currentDay >= 30 || soldiSpan.textContent < 0) {
        sessionStorage.setItem("soldiFinale", soldiSpan.textContent);
        sessionStorage.setItem("giorniFinale", currentDay);
        window.location.href = "./endscreen.html"
        return;
    }
    currentDay += 1;
    runDailyEvents();
    setupDay(dayInfo);
}

function setupDay(dayInfo) {

    prompt.textContent = dayInfo.prompt;

    if (currentDay == 2) {
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

}

/**
 * 
 * @param {string} amount 
 */
function doConseguenza(amount) {
    soldiSpan.textContent = Math.round((Number(soldiSpan.textContent) + Number(amount)))
}

opzione1Btn.addEventListener("click", (e) => {
    buttonReactOnClick(conseguenza1.textContent.replace("€", ""));
})
opzione2Btn.addEventListener("click", (e) => {
    buttonReactOnClick(conseguenza2.textContent.replace("€", ""));
})
opzione3Btn.addEventListener("click", (e) => {
    buttonReactOnClick(conseguenza3.textContent.replace("€", ""));
})

function buttonReactOnClick(quantitàDiSoldi) {
    doConseguenza(quantitàDiSoldi)
    doTheDay(calendario[currentDay]);
}