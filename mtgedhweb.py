import requests
import json
import io
from PIL import Image

def IsCommander(card):
    if ("Legendary Creature" in card["type_line"] or "can be your commander." in card["oracle_text"]):
        return True
    return False
    
def IsDoubleFaced(card):
    if "card_faces" in card:
        return True
    return False

def IsPartner(card):
    if "Partner" in card["keywords"]:
        return True
    return False

def GetCards(payload):
    r = requests.get('https://api.scryfall.com/cards/search', params=payload)
    json_obj = r.json()

    if (not json_obj["object"] == "list"):
        return []

    buffer = []
    for card in json_obj["data"]:
        if IsCommander(card):
            buffer.append(card)

    return buffer

def Id(card):
    return card["id"]

def Name(card):
    return card["name"]

def ManaCost(card):
    if IsDoubleFaced(card):
        return card["card_faces"][0]["mana_cost"].replace("{", "").replace("}", "")
    else:
        return card["mana_cost"].replace("{", "").replace("}", "")

def ImageURI(card):
    return card["image_uris"]["normal"]

while True:
    print("Gimme a card name: ")
    name = input()
    payload = {'q': name}
    data = GetCards(payload)
    
    print()

    if data == []:
        print("No cards were found")
        pass

    for card in data:
        print(Id(card))
        print(Name(card))
        print(ManaCost(card))
        if (IsPartner(card)):
            print("Partner")

        response = requests.get(ImageURI(card), stream=True)
        response.raw.decode_content = True
        image_data = io.BytesIO(response.raw.read())
        image = Image.open(image_data)
        image.show()

        print()
