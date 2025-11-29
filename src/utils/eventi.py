class Eventi:
    def __init__(self, id:int|None, tipo: str|None, descrizione:str|None, prompt:str|None, 
                periodo:list[int]|None, effetto:str|None, prossimoGiorno:int|None) -> None:
        self.id = id
        self.tipo = tipo
        self.descrizione = descrizione
        self.prompt = prompt if prompt is not None else 3
        self.periodo = periodo
        self.effetto = effetto
        self.prossimoGiorno = prossimoGiorno