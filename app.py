from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Flask App Setup
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Allow React (Vite) requests

# MongoDB Setup
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client["hairCoaction"]
users_collection = db["users"]

# Health Check
@app.route("/")
def home():
    return "✅ Flask API is up and running!"

# Add new user (prevent duplicates)
@app.route("/api/users", methods=["POST"])
def add_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")

    if not name or not email:
        return jsonify({"error": "Name and email are required."}), 400

    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User with this email already exists."}), 409

    user = {"name": name, "email": email}
    users_collection.insert_one(user)

    return jsonify({"message": "User added successfully!"}), 201

# Get all users
@app.route("/api/users", methods=["GET"])
def get_users():
    users = list(users_collection.find({}, {"_id": 0}))  # Exclude MongoDB _id
    return jsonify(users), 200

# Run Server
if __name__ == "__main__":
    app.run(port=5000, debug=True)
