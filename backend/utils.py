import requests
import tweepy
import os
import dotenv
import os
import dotenv
from mira_sdk import MiraClient, Flow
import json
import requests
import csv

dotenv.load_dotenv()

API_KEY = os.getenv("TWITTER_API_KEY")
API_KEY_SECRET = os.getenv("TWITTER_API_KEY_SECRET")
ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")
ACCESS_TOKEN_SECRET = os.getenv("ACCESS_TOKEN_SECRET")


def validate_api_credentials():
    missing = [
        key for key, value in {
            "API_KEY": API_KEY,
            "API_KEY_SECRET": API_KEY_SECRET,
            "ACCESS_TOKEN": ACCESS_TOKEN,
            "ACCESS_TOKEN_SECRET": ACCESS_TOKEN_SECRET
        }.items() if not value
    ]
    if missing:
        raise ValueError(f"Missing API credentials: {', '.join(missing)}")

def download_image(image_url):
    try:
        response = requests.get(image_url, timeout=10)
        response.raise_for_status()
        image_path = "temp_image.jpg"
        
        with open(image_path, "wb") as file:
            file.write(response.content)

        return image_path
    except requests.exceptions.RequestException as e:
        raise Exception(f"Error fetching image: {e}")

def get_media_id(image_url):
    try:
        validate_api_credentials()
        image_path = download_image(image_url)

        # Authenticate with Twitter API using OAuth 1.0a
        auth = tweepy.OAuthHandler(API_KEY, API_KEY_SECRET)
        auth.set_access_token(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
        api = tweepy.API(auth, wait_on_rate_limit=True)

        # Upload image
        media = api.media_upload(image_path)
        os.remove(image_path)

        return {"media_id": media.media_id_string}
    
    except Exception as e:
        return {"error": str(e)}
    
def get_right_template(user_prompt):
    """
    Tests a meme flow by sending available templates and user prompt as input.

    :param available_templates: List of available meme template names.
    :param user_prompt: A string describing the desired meme.
    :return: Response from Mira API.
    """

    client = MiraClient(config={"API_KEY": os.getenv("API_KEY")})    
    flow1 = "v1p3r/template-decider-1/1.3.0"
    # flow1= Flow(source="flow1.yaml")

    input_dict = {
        "user-prompt": user_prompt
    }

    response = client.flow.execute(flow1, input_dict)
    return response

def get_meme_data_by_name(name, filename="memes.csv"):
    try:
        with open(filename, mode="r", newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                if row["name"].strip().lower() == name.strip().lower():
                    return json.dumps(row, ensure_ascii=False)
    except FileNotFoundError:
        return json.dumps({"error": f"File '{filename}' not found."})  
    except KeyError:
        return json.dumps({"error": "Invalid CSV format. 'name' column missing."})
    return json.dumps({"error": "Meme template not found."})

def get_meme_strings(user_prompt, box_count, template_name):
    """
    Tests a meme flow by sending user prompt and template id as input.

    :param user_prompt: A string describing the desired meme.
    :param template_id: The ID of the meme template.
    :return: Response from Mira API.
    """

    client = MiraClient(config={"API_KEY": os.getenv("API_KEY")})
    flow2 = "v1p3r/meme-generator-1/1.3.0"
    # flow2= Flow(source="flow2.yaml")
    input_dict = {
        "user-prompt": user_prompt,
        "box-count": box_count,
        "template-name": template_name
    }

    response = client.flow.execute(flow2, input_dict)
    return response


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
            return data["data"]["url"]
        else:
            print("Error:", data.get("error_message", "Unknown error"))
    else:
        print("Failed to connect to API. Status code:", response.status_code)
