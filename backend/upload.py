import dotenv
import os
from mira_sdk import MiraClient, Flow
from mira_sdk.exceptions import FlowError

dotenv.load_dotenv()

API_KEY = os.getenv('API_KEY')
if not API_KEY:
    raise ValueError("API_KEY not found in environment variables.")

client = MiraClient(config={"API_KEY": API_KEY})

flows = [ "flows/flow3.yaml"]

for flow_file in flows:
    try:
        flow = Flow(source=flow_file)
        client.flow.deploy(flow) 
        print(f"Successfully deployed {flow_file}")
    except FlowError as e:
        print(f"Error deploying {flow_file}: {str(e)}")
