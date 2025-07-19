


from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient,  errors

app = Flask(__name__)
CORS(app)

# uri = "mongodb+srv://learnaitechtrove:1w7pHGOvfiSKAxYm@prakriti-0.tjvlmzt.mongodb.net/?retryWrites=true&w=majority&appName=Prakriti-0"
import os
mongo_uri = os.environ.get("MONGO_URI")
try:
    client = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000)
    db = client["mydb"]
    collection = db["qna"]
except errors.ServerSelectionTimeoutError as err:
    print("Failed to connect to MongoDB:", err)
    collection = None  
    
served_questions_id = set()

def fetch_data():
    global served_questions_id
    if collection is None:
        return None
        

    try:
        pipeline = [
            {"$match": {"_id": {"$nin": list(served_questions_id)}}}, 
            {"$sample": {"size": 1}}
        ]
        random_entries = list(collection.aggregate(pipeline))
        if not random_entries:
            print('No data')
            return None
            

        entry = random_entries[0]
        served_questions_id.add(entry['_id'])
        if (len(served_questions_id) >= 20):
            served_questions_id.clear()
        return entry
        

    except Exception as e:
        print(f'Error fetching random data: {e}')
        return None

@app.route("/api/random_unique", methods=["GET"])
def random_unique():
    entry = fetch_data()
    if entry is None:
        return jsonify({"message": "No new entries available"}), 404

    # Remove _id (or convert it to string) for JSON serialization
    entry["_id"] = str(entry["_id"])
    return jsonify(entry)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
