from dotenv import load_dotenv
import os
load_dotenv()
print("Developer Token:", os.getenv("GOOGLE_ADS_DEVELOPER_TOKEN"))
print("Client ID:", os.getenv("GOOGLE_ADS_CLIENT_ID"))
print("Client Secret:", os.getenv("GOOGLE_ADS_CLIENT_SECRET")[:10] if os.getenv("GOOGLE_ADS_CLIENT_SECRET") else "MISSING")
print("Refresh Token:", os.getenv("GOOGLE_ADS_REFRESH_TOKEN")[:20] if os.getenv("GOOGLE_ADS_REFRESH_TOKEN") else "MISSING")
print("Customer ID:", os.getenv("GOOGLE_ADS_LOGIN_CUSTOMER_ID"))
