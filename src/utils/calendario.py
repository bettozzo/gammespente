from scelta import Scelta


class Calendario:

    def __init__(self,tipo :str, numero:int, prompt:str, scelta1:Scelta, scelta2:Scelta, scelta3:Scelta) -> None:
        self.tipo =tipo
        self.numero = numero
        self.prompt = prompt
        self.scelta1=scelta1
        self.scelta2=scelta2
        self.scelta3=scelta3
