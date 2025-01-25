from mira_sdk import MiraClient, Flow, ComposioConfig
import os
import dotenv

dotenv.load_dotenv()


def post_tweet(id, userprompt):
    client = MiraClient(config={"API_KEY": os.getenv("API_KEY")})

    input_dict = {
        "media-id": id,
        "user-prompt": userprompt
    }

    flow= "v1p3r/tweet-maker"

    response = client.flow.execute(
        flow,
        input_dict,
        ComposioConfig(
            COMPOSIO_API_KEY=os.getenv("COMPOSIO_API_KEY"),
            ACTION="TWITTER_CREATION_OF_A_POST",
            TASK="POST THIS TWEET {content}",  
            ENTITY_ID="default", 
        )
    )
    return response

response=post_tweet("make a meme on donald trump", 1883012549152747521)
print(response)