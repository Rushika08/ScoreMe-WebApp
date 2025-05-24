import firebase_admin
from firebase_admin import credentials, firestore
import os

# Get the absolute path to the service account key
current_dir = os.path.dirname(__file__)
key_path = os.path.abspath(os.path.join(current_dir, "..", "scoreme-4c29f-firebase-adminsdk-fbsvc-4522ba6bd5.json"))

# Initialize the app with credentials
cred = credentials.Certificate(key_path)
firebase_admin.initialize_app(cred)

# Get Firestore client
db = firestore.client()

# Fetch all documents in a collection (e.g., "users")
users_ref = db.collection("users")
docs = users_ref.stream()

# Print the documents
for doc in docs:
    print(f'{doc.id} => {doc.to_dict()}')
