from flask import Flask, request, jsonify, session
import os
import dotenv
import json
import utils
import post
from flask_cors import CORS
from flask_session import Session
from composio import ComposioToolSet

dotenv.load_dotenv()

app = Flask(__name__)

ENTITY_IDS = []


USERNAME = os.getenv("MEME_USER")
PASSWORD = os.getenv("MEME_PASS")

CORS(app)

def create_meme_from_prompt(user_prompt: str):
    try:
        template_name = utils.get_right_template(user_prompt)['result']
        print('Template: ', template_name)

        result = utils.get_meme_data_by_name(template_name)
        result = json.loads(result)

        template_id = result['id']
        template_name = result['name']
        box_count = result['box_count']

        result = utils.get_meme_strings(user_prompt, box_count, template_name)['result']
        result1 = json.loads(result)
        print('Meme Strings: ', result1)

        meme = utils.create_meme(template_id, USERNAME, PASSWORD, result1)
        print("Meme Created:", meme)
        return meme
    except Exception as e:
        print(f"Error creating meme: {e}")
        return None

@app.route('/api/auth', methods=['POST'])
def sign_in(): 
    data = request.get_json()
    entity_id = data.get("username")
    redirect_url = data.get("redirect_url")

    
    toolset = ComposioToolSet()
    entity = toolset.get_entity(entity_id)

    
    integration = entity.client.integrations.create(
        name="TWITTER_INTEGRATION", 
        app_id="b3a9602b-731b-4044-9c9a-d0137ef5c887", 
        auth_mode="OAUTH2", 
        use_composio_auth=True
    )
    r = entity.initiate_connection("TWITTER", redirect_url=redirect_url, integration=integration)
    
    ENTITY_IDS.append(entity_id)
    return {"auth-url": r.redirectUrl}

@app.route('/api/generate-meme', methods=['POST'])
def generate_meme():

    data = request.get_json()
    print(data)
    user_prompt = data.get("user_prompt")
    if not user_prompt:
        return jsonify({"error": "Missing user_prompt"}), 400
    meme = create_meme_from_prompt(user_prompt)
    if meme is None:
        return jsonify({"error": "Failed to create meme"}), 500 
    print(meme)
    return {"meme": meme}

@app.route('/api/post-meme', methods=['POST'])
def post_meme():

    data = request.get_json()
    meme = data.get("meme")
    user_prompt = data.get("user_prompt")
    entity_id= data.get("entity_id")

    media_id = utils.get_media_id(meme)
    print("Media ID: ", media_id)
    response = post.post_tweet(media_id, user_prompt, entity_id)
    return jsonify({"media_id": media_id, "response": response})

if __name__ == '__main__':
    app.run(debug=True)
