import typing as t
from composio_openai import ComposioToolSet, action, Action
from openai import OpenAI
import base64

from dotenv import load_dotenv
load_dotenv()

openai_client = OpenAI()
toolset = ComposioToolSet(entity_id="default")


@action(toolname="twitter")
def create_draft(
    image_base64: str,
    execute_request: t.Callable,
) -> dict:
    """
    Create a draft reply to a specific Gmail thread

    :param thread_id: The ID of the thread to which the reply is to be drafted
    :param message_body: The content of the draft reply
    :return draft: The created draft details
    """
    
    # request_body = {
    #     "message": {
    #         "media_data": base64.urlsafe_b64encode(
    #             f"Content-type: text/plain; charset=UTF-8\n\n{message_body}".encode(
    #                 "utf-8"
    #             ),
    #         "media_category" : "tweet_image",
    #         ).decode("utf-8"),
    #     }
    # }
    request_body = {
            "media_category": "tweet_image",
            "media_data": image_base64,
    }

    response = execute_request(f"https://upload.twitter.com/1.1/media/upload.json", "post", request_body, None)
    return response.get("data", {})


tools = toolset.get_tools(actions=[create_draft])

toolset.execute_action(
    action=create_draft,
    params={
        "image_base64": ""
    },
    entity_id="default",
)

# task = " post this "

# response = openai_client.chat.completions.create(
# model="gpt-4o-mini",
# tools=tools,
# messages=
#     [
#         {"role": "system", "content": "You are a helpful assistant."},
#         {"role": "user", "content": task},
#     ],
# )

# result = toolset.handle_tool_calls(response)
# print(result)