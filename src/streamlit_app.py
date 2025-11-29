import streamlit as sl
import json
from utils import Eventi

def load_JSON(path:str) -> list:
    results: list[dict] = []
    parsed:list[dict] = []
    with open(path, mode="r") as f:
        parsed = json.load(f)

    for p in parsed:
        #parse eventi.json
        if p.get(["id"], None) is not None:
            id = p.get(["id"], None)
            tipo = p.get(["tipo"], None)
            descrizione = p.get(["descrizione"], None)
            prompt = p.get(["prompt"], None)
            periodo = p.get(["periodo"], None)
            effetto = p.get(["effetto"], None)
            prossimoGiorno = p.get(["prossimoGiorno"], None)
            evento = Eventi(id, tipo,descrizione,prompt, periodo, effetto, prossimoGiorno)
            
        else:
            return parsed

    return parsed

with sl.container():
    sl.text(json.dumps(load_JSON("./src/assets/eventi.json"), indent=4))