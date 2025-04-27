const giorniSpan = document.getElementById("giorno");
const soldiSpan = document.getElementById("soldi");

const giorniValue = sessionStorage.getItem("giorniFinale");
const soldiValue = sessionStorage.getItem("soldiFinale");

giorniSpan.textContent = giorniValue ? giorniValue : "Errore";
soldiSpan.textContent = soldiValue ? soldiValue : "Errore";