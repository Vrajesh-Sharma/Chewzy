from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
CORS(app)

# ✅ Health Check Endpoint
@app.route('/alive', methods=['GET'])
def alive():
    return jsonify({"status": "ok"}), 200

# ✅ AI Response Endpoint
@app.route('/AIResponse/contactReply', methods=['POST'])
def send_ai_email():
    try:
        data = request.json
        email = data.get('email')
        text = data.get('text')
        subject = data.get('subject') or "Thanks for Contacting Chewzy"

        if not email or not text or not subject:
            return jsonify({'error': 'Missing email, subject, or text'}), 400

        sender_email = os.getenv('EMAIL_ADDRESS')
        sender_password = os.getenv('EMAIL_PASSWORD')

        if not sender_email or not sender_password:
            return jsonify({'error': 'SMTP credentials not set'}), 500

        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(text, 'plain'))

        # Send email using Gmail SMTP
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()

        return jsonify({'message': 'Email sent successfully'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)