import csv
import json
import pathlib
from typing import Any

PROJECT_ROOT = pathlib.Path(__file__).parent.parent.resolve()
SAVE_PATH = f"{PROJECT_ROOT}\\src\\js\\data"

def parse_csv(file_path: str) -> list[list[str]]:
    with open(file_path, newline='\n', encoding="utf-8") as csvfile:
        return list(csv.reader(csvfile, delimiter=',',))

def save_calendario(file: list[list[str]]):
    json_data = list()
    headers =["tipo", "numero", "prompt", "scelta1", "conseguenza1", "scelta2", "conseguenza2", "scelta3", "conseguenza3"]
    for row in file[1:]:
        data:dict[str, Any] = dict()
        for (col, field) in enumerate(row):
            if col >= len(headers):
                break
            try:
                data[headers[col]] = int(field)
            except:
                data[headers[col]] = field
        json_data.append(data)
    with open(f"{SAVE_PATH}\\calendario.js", "w", encoding="utf-8" ) as f:
        f.write(f"const calendario = {json.dumps(json_data, indent=4)}")

def save_eventi(file: list[list[str]]):
    json_data = list()
    headers = ["id", "tipo", "descrizione", "prompt", "periodo", "effetto", "prossimoGiorno"]
    for row in file[1:]:
        data:dict[str, Any] = dict()
        for (col, field) in enumerate(row):
            if col >= len(headers):
                break
            if headers[col] == "periodo":
                if ',' in field:
                    data[headers[col]] = [int(x) for x in field.split(',')]
                    
                elif  int(field) == -1:
                    data[headers[col]] = None
                else:
                    data[headers[col]] = [int(field)]
            else:
                try:
                    data[headers[col]] = int(field)
                except:
                    data[headers[col]] = field
        json_data.append(data)
    with open(f"{SAVE_PATH}\\eventi.js", "w", encoding="utf-8" ) as f:
        f.write(f"const eventi = {json.dumps(json_data, indent=4)}")



if __name__ == "__main__":
    file = parse_csv(f"{PROJECT_ROOT}\\format_data\\data\\calendario.csv")
    save_calendario(file)
    file = parse_csv(f"{PROJECT_ROOT}\\format_data\\data\\eventi.csv")
    save_eventi(file)