# This is an EXAMPLE Python backend script.
# NOTE: This environment only runs Node.js/TypeScript.
# This script is provided for reference if you wish to deploy a Python backend elsewhere.

from flask import Flask, jsonify, request
from flask_cors import CORS
import datetime
import random

app = Flask(__name__)
CORS(app)

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "message": "Python Backend is running!"})

@app.route('/api/verify', methods=['POST'])
def verify_certificate():
    data = request.json
    app_no = data.get('applicationNumber')
    
    if not app_no:
        return jsonify({"error": "Application number is required"}), 400
        
    return jsonify({
        "verified": True,
        "applicationNumber": app_no,
        "timestamp": datetime.datetime.now().isoformat(),
        "status": "APPROVED",
        "officer": "ACP, City SB",
        "verificationId": f"VERIFIED-{random.randint(10000, 99999)}"
    })

if __name__ == '__main__':
    app.run(port=5000)
