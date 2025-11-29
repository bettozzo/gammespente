import json
from utils import Eventi, Giornata, Scelta
import game

def load_JSON(path:str) -> list:
    results: list[Eventi|Giornata] = []
    parsed:list[dict] = []
    with open(path, mode="r") as f:
        parsed = json.load(f)

    for p in parsed:
        ### Parse eventi.json
        if p.get("id", None) :
            id = p.get("id", None)
            tipo = p.get("tipo", None)
            descrizione = p.get("descrizione", None)
            prompt = p.get("prompt", None)
            periodo = p.get("periodo", None)
            effetto = p.get("effetto", None)
            prossimoGiorno = p.get("prossimoGiorno", None)
            evento = Eventi(id, tipo,descrizione,prompt, periodo, effetto, prossimoGiorno)
            results.append(evento)
        else: ### Parse calendario.json
            tipo = p.get("tipo", None)
            numero = p.get("numero", None)
            prompt = p.get("prompt", None)
            tmp_scelta1 = p.get("scelta1", None) if p.get("scelta1", None) is not "" else None
            tmp_conseguenza1 = p.get("conseguenza1", None) if p.get("conseguenza1", None) is not "" else None
            tmp_scelta2 = p.get("scelta2", None) if p.get("scelta2", None) is not "" else None
            tmp_conseguenza2 = p.get("conseguenza2", None) if p.get("conseguenza2", None) is not "" else None
            tmp_scelta3 = p.get("scelta3", None) if p.get("scelta3", None) is not "" else None
            tmp_conseguenza3 = p.get("conseguenza3", None) if p.get("conseguenza3", None) is not "" else None
            scelta1 = Scelta(tmp_scelta1, tmp_conseguenza1)
            scelta2 = Scelta(tmp_scelta2, tmp_conseguenza2)
            scelta3 = Scelta(tmp_scelta3, tmp_conseguenza3)
            giornata = Giornata(tipo, numero, prompt, scelta1, scelta2, scelta3)
            results.append(giornata)
            
    return results

eventi:list[Eventi] = load_JSON("./src/assets/eventi.json")
calendario:list[Giornata] = load_JSON("./src/assets/calendario.json")
game.start_game(calendario, eventi)
