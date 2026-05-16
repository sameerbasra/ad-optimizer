from dotenv import load_dotenv
import os
load_dotenv()

from google.ads.googleads.client import GoogleAdsClient

try:
    client = GoogleAdsClient.load_from_dict({
        "developer_token": os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"),
        "client_id": os.getenv("GOOGLE_ADS_CLIENT_ID"),
        "client_secret": os.getenv("GOOGLE_ADS_CLIENT_SECRET"),
        "refresh_token": os.getenv("GOOGLE_ADS_REFRESH_TOKEN"),
        "login_customer_id": os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"),
        "use_proto_plus": True
    })
    customer_service = client.get_service("CustomerService")
    customers = customer_service.list_accessible_customers()
    print("SUCCESS:", customers.resource_names)
except Exception as e:
    print("ERROR:", str(e))
