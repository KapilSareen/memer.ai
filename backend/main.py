from flask import Flask, request, jsonify
import os
import dotenv
import json
import utils
import post
from flask_cors import CORS

dotenv.load_dotenv()

app = Flask(__name__)

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

@app.route('/generate-meme', methods=['POST'])
def generate_meme():
    data = request.get_json()
    print(data)
    user_prompt = data.get("user_prompt")
    if not user_prompt:
        return jsonify({"error": "Missing user_prompt"}), 400
    meme = create_meme_from_prompt(user_prompt)
    if meme is None:
        return jsonify({"error": "Failed to create meme"}), 500 
    return meme

@app.route('/post-meme', methods=['POST'])
def post_meme():
    data= request.get_json()
    meme= data.get("meme")
    user_prompt= data.get("user_prompt")
    media_id = utils.get_media_id(meme)
    print("Media ID: ", media_id)
    response = post.post_tweet(media_id, user_prompt)
    return jsonify({"media_id": media_id, "response": response})

if __name__ == '__main__':
    app.run(debug=True)
