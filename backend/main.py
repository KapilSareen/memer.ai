import requests
import csv
import os
import dotenv

dotenv.load_dotenv()

def fetch_memes():
    url = "https://api.imgflip.com/get_memes"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data["success"]:
            return data["data"]["memes"]
    return []

def save_to_csv(memes, filename="memes.csv"):
    with open(filename, mode="w", newline="", encoding="utf-8") as file:
        writer = csv.writer(file)
        writer.writerow(["id", "name", "url", "width", "height", "box_count"])
        
        for meme in memes:
            writer.writerow([meme["id"], meme["name"], meme["url"], meme["width"], meme["height"], meme["box_count"]])
    
    print(f"Data saved to {filename}")

def fetch():
    memes = fetch_memes()
    if memes:
        save_to_csv(memes)
    else:
        print("Failed to fetch memes.")


def get_meme_by_name(filename="memes.csv"):
    memes = []
    with open(filename, mode="r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            memes.append(row["name"])
    return memes


def get_meme_data_by_name(name, filename="memes.csv"):
    with open(filename, mode="r", newline="", encoding="utf-8") as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row["name"].lower() == name.lower():
                return row 
    return None 

def create_meme(template_id, username, password, boxes):
    url = "https://api.imgflip.com/caption_image"
    
    payload = {
        "template_id": template_id,
        "username": username,
        "password": password
    }
    
    for i, box in enumerate(boxes):
        payload[f"boxes[{i}][text]"] = box["text"]
    
    response = requests.post(url, data=payload)
    
    if response.status_code == 200:
        data = response.json()
        if data.get("success"):
            print("Meme created successfully!")
            print("Meme URL:", data["data"]["url"])
        else:
            print("Error:", data.get("error_message", "Unknown error"))
    else:
        print("Failed to connect to API. Status code:", response.status_code)


meme_names = get_meme_by_name()
print(meme_names)


meme_name = "Megamind peeking"
meme_data = get_meme_data_by_name(meme_name)
print(meme_data)


USERNAME = os.getenv("MEME_USER")
PASSWORD = os.getenv("MEME_PASS")
TEMPLATE_ID = "370867422"

BOXES = [
    {"text": "Abhinav ki gand"},
    {"text": "Swastic ki gand"},
]

create_meme(TEMPLATE_ID, USERNAME, PASSWORD, BOXES)
