import os
import dotenv
import json
import utils
import post

dotenv.load_dotenv()

USERNAME = os.getenv("MEME_USER")
PASSWORD = os.getenv("MEME_PASS")

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

        media_id = utils.get_media_id(meme)
        print("Media ID: ", media_id)

        return  media_id

    except Exception as e:
        print(f"Error creating meme: {e}")
        return  None

user_prompt = "make a meme on cows"
media_id=create_meme_from_prompt(user_prompt)

response=post.post_tweet(media_id, user_prompt)
print(response)
