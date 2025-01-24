from mira_sdk import MiraClient, Flow, ComposioConfig

# Initialize Mira client with your API key
client = MiraClient(config={"API_KEY": "sb-6a159959a63d989e2e0bd11f81c3d083"})

# Get your exisitng flow
# version = "1.0.1"
# input_data = {"key": "value"}

# If no version is provided, latest version is used by default
# flow=Flow(source="flow.yaml")
flow = "swasy/meme-url-generator"
# Set up your flow's input parameters
input_dict = {
     "user-prompt": "Artificial intelligence"
}
result = client.flow.execute(flow, input_dict)
print(result)
# Execute flow with Composio integration
# The flow's output will automatically replace {content} in the TASK
response = client.flow.execute(
    flow,
    input_dict,
    ComposioConfig(
        COMPOSIO_API_KEY="0rrgkruuool9sx24cv530pm",
        ACTION="TWITTER_MEDIA_UPLOAD_MEDIA",  # This is the Enum e.g., "TWITTER_POST", "DISCORD_SEND"
        TASK="Upload this image using it's url - {content}",  # {content} is required and gets replaced with flow output
        ENTITY_ID="default"  # Platform-specific identifier
    )
)
print(response)
