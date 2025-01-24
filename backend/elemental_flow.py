from mira_sdk import MiraClient, Flow
from mira_sdk.exceptions import FlowError

client = MiraClient(config={"API_KEY": "sb-412ad31d84c2ecac35ae7813987c43c2"})     # Initialize client

flow = Flow(source="flow.yaml")                    # Load flow
try:
    client.flow.deploy(flow)                                # Deploy to platform
except FlowError as e:
    print(f"Error occurred: {str(e)}")                      # Handle deployment error
