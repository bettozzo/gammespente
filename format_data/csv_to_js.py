import csv
import json
import pathlib


PROJECT_ROOT = pathlib.Path(__file__).parent.parent.resolve()

def parse_csv(file_path: str) -> list[list[str]]:
    with open(file_path, newline='\n', encoding="utf-8") as csvfile:
        return list(csv.reader(csvfile, delimiter=',',))

def save_to_json(file: list[list[str]]):
    json_data = list()
    headers = rename_headers(file[0])
    for row in file[1:]:
        data = dict()
        for (i, field) in enumerate(row):
            try:
                data[headers[i]] = field
            except:
                pass
        json_data.append(data)
    with open(f"{PROJECT_ROOT}\\src\\js\\data.js",mode="w", encoding="utf-8" ) as f:
        f.write(f"const calendario = {json.dumps(json_data, indent=4)}")

def rename_headers(headers: list[str]) -> list[str]:
    new_headers = ["fase", "tipo", "numero", "prompt", "scelta1", "conseguenza1", "scelta2", "conseguenza2", "scelta3", "conseguenza3"]
    return new_headers

if __name__ == "__main__":
    file = parse_csv(f"{PROJECT_ROOT}\\format_data\\data.csv")
    save_to_json(file)