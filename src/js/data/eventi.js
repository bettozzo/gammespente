const eventi = [
    {
        "id": 1,
        "tipo": "Random",
        "descrizione": "Malattia",
        "prompt": "Sei malato :(",
        "periodo": [
            1,
            2,
            3,
            4,
            5
        ],
        "effetto": "?",
        "prossimoGiorno": 1
    },
    {
        "id": 2,
        "tipo": "Regolare",
        "descrizione": "Spesa",
        "prompt": "Hai fatto 'a spesa",
        "periodo": [
            7
        ],
        "effetto": "?",
        "prossimoGiorno": 2
    },
    {
        "id": 3,
        "tipo": "Conseguenza1",
        "descrizione": "Carie dentali",
        "prompt": "Hai le carie. La spesa per il dentista \u00e8 cara, anche se non amata",
        "periodo": null,
        "effetto": "-250\u20ac",
        "prossimoGiorno": 7
    },
    {
        "id": 4,
        "tipo": "Conseguenza2",
        "descrizione": "Multa RC auto",
        "prompt": "Hai preso 'na multa per eccesso di velocit\u00e0. Ammazza se piotti.",
        "periodo": null,
        "effetto": "-600\u20ac",
        "prossimoGiorno": 7
    },
    {
        "id": 5,
        "tipo": "Conseguenza3",
        "descrizione": "Mal di schiena",
        "prompt": "Hai mal di schiena alla schiena.",
        "periodo": null,
        "effetto": "-150\u20ac",
        "prossimoGiorno": 7
    },
    {
        "id": 6,
        "tipo": "Regolare",
        "descrizione": "Lavatrice",
        "prompt": "Giorno di bucato. Aggettivo che, tra l'altro, si addice alle tue mani!!",
        "periodo": [
            7
        ],
        "effetto": "-7\u20ac",
        "prossimoGiorno": 6
    },
    {
        "id": 7,
        "tipo": "Regolare",
        "descrizione": "Rata armadio",
        "prompt": "Hai pagato n'arta rata per l'anta dell'armadio",
        "periodo": [
            7
        ],
        "effetto": "-20\u20ac",
        "prossimoGiorno": 11
    },
    {
        "id": 8,
        "tipo": "Regolare",
        "descrizione": "Cane",
        "prompt": "Mentre imprechi questo mondo cane, ti ricordi del tuo e li compri del cibo",
        "periodo": [
            7
        ],
        "effetto": "-10\u20ac",
        "prossimoGiorno": 14
    },
    {
        "id": 9,
        "tipo": "Regolare",
        "descrizione": "Lavoro scale",
        "prompt": "Hai pulite delle scale (intese come insieme di gradini)",
        "periodo": [
            7
        ],
        "effetto": "50\u20ac",
        "prossimoGiorno": 22
    },
    {
        "id": 10,
        "tipo": "Regolare",
        "descrizione": "Lavoro fattorino",
        "prompt": "Hai consegnato del cibo. Che poi l'importante \u00e8 sempre quello: Mangiare",
        "periodo": [
            7
        ],
        "effetto": "40\u20ac",
        "prossimoGiorno": 27
    },
    {
        "id": 11,
        "tipo": "Regolare",
        "descrizione": "Vizio del fumo",
        "prompt": "Fumi, ma non mentre preghi. Morirai prima, ma andrai in paradiso. O forse no.",
        "periodo": [
            1
        ],
        "effetto": "-2\u20ac",
        "prossimoGiorno": 28
    },
    {
        "id": 12,
        "tipo": "Regolare",
        "descrizione": "Pacco alimentare",
        "prompt": "Hai preso un pacco, ma ti \u00e8 arrivato ",
        "periodo": [
            7
        ],
        "effetto": "-5\u20ac",
        "prossimoGiorno": 29
    }
]