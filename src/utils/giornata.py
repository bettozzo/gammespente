import json
from utils.scelta import Scelta


class Giornata:
    def __init__(self,tipo :str|None, numero:int|None, prompt:str|None, scelta1:Scelta, scelta2:Scelta, scelta3:Scelta) -> None:
        self.tipo =tipo
        self.numero = numero
        self.prompt = prompt
        self.scelta1=scelta1 if scelta1.scelta is not None else None
        self.scelta2=scelta2 if scelta2.scelta is not None else None
        self.scelta3=scelta3 if scelta3.scelta is not None else None
        self.scelte_list:list[Scelta] = [s for s in [self.scelta1, self.scelta2, self.scelta3] if s is not None]
        self.numero_di_scelte = len(self.scelte_list)

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True)
