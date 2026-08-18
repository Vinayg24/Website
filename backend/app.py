import os
import json
import random
from datetime import datetime, date
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configuration from Environment Variables
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', '')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', '')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', '')

ADMIN_EMAIL = os.getenv('ADMIN_EMAIL', '')
DATA_FILE = os.path.join(os.path.dirname(__file__), 'data', 'enquiries.json')

os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, 'w') as f:
        json.dump([], f)

def generate_enquiry_id():
    year = datetime.now().year
    digits = random.randint(1000, 9999)
    return f"SRK-{year}-{digits}"

@app.route('/api/enquiries', methods=['POST'])
@app.route('/api/contact', methods=['POST'])
def create_enquiry():
    try:
        data = request.get_json() or {}
        name = (data.get('name') or '').strip()
        phone = (data.get('phone') or '').strip()
        email = (data.get('email') or '').strip()
        service = (data.get('service') or '').strip()
        event_date = (data.get('date') or '').strip()
        location = (data.get('location') or '').strip()
        message = (data.get('message') or '').strip()

        # Validation
        if not name or len(name) < 2:
            return jsonify({'success': False, 'error': 'Please enter a valid name (minimum 2 characters).'}), 400
        if not phone or len(''.join(filter(str.isdigit, phone))) < 7:
            return jsonify({'success': False, 'error': 'Please enter a valid phone number (min 7 digits).'}), 400
        if not email or '@' not in email or '.' not in email:
            return jsonify({'success': False, 'error': 'Please enter a valid email address.'}), 400
        if not service:
            return jsonify({'success': False, 'error': 'Please select a service.'}), 400

        if event_date:
            try:
                parsed_date = datetime.strptime(event_date, '%Y-%m-%d').date()
                if parsed_date < date.today():
                    return jsonify({'success': False, 'error': 'Event date cannot be in the past.'}), 400
            except ValueError:
                pass

        enquiry_id = generate_enquiry_id()
        created_at = datetime.now().isoformat()

        enquiry_record = {
            'id': f"enq_{int(datetime.now().timestamp())}",
            'enquiry_id': enquiry_id,
            'name': name,
            'phone': phone,
            'email': email,
            'service': service,
            'date': event_date,
            'location': location,
            'message': message,
            'created_at': created_at,
            'status': 'New',
            'source': 'Website',
            'ip_address': request.remote_addr,
            'user_agent': request.headers.get('User-Agent', '')
        }

        # Save to database file
        try:
            with open(DATA_FILE, 'r+') as f:
                records = json.load(f)
                records.insert(0, enquiry_record)
                f.seek(0)
                json.dump(records, f, indent=2)
        except Exception as e:
            print(f"Error saving to database: {e}")

        # Send Email Notification with Reply-To
        try:
            import smtplib
            from email.mime.text import MIMEText
            from email.mime.multipart import MIMEMultipart

            # 1. Admin Email Notification (with Reply-To)
            msg_admin = MIMEMultipart()
            msg_admin['Subject'] = f"New Website Enquiry - {name}"
            msg_admin['From'] = app.config['MAIL_DEFAULT_SENDER']
            msg_admin['To'] = ADMIN_EMAIL
            msg_admin['Reply-To'] = email

            body = f"""New Enquiry Received:
Enquiry ID: {enquiry_id}
Customer Name: {name}
Phone: {phone}
Email: {email}
Service: {service}
Event Date: {event_date}
Location: {location}
Time: {created_at}

Message:
{message}
"""
            msg_admin.attach(MIMEText(body, 'plain'))

            with smtplib.SMTP(app.config['MAIL_SERVER'], app.config['MAIL_PORT']) as server:
                server.starttls()
                server.login(app.config['MAIL_USERNAME'], app.config['MAIL_PASSWORD'])
                server.send_message(msg_admin)

                # 2. Customer Auto-Reply
                msg_user = MIMEMultipart()
                msg_user['Subject'] = "Thank You for Contacting Shree Radha Krishna Studio"
                msg_user['From'] = app.config['MAIL_DEFAULT_SENDER']
                msg_user['To'] = email

                user_body = f"""Dear {name},

Thank you for contacting Shree Radha Krishna Studio.
Your enquiry (ID: {enquiry_id}) for {service} has been received successfully.

Our team will contact you shortly.

Studio Contact:
• Phone: +91 9460142572
• WhatsApp: https://wa.me/919460142572
• Email: {ADMIN_EMAIL}
"""
                msg_user.attach(MIMEText(user_body, 'plain'))
                server.send_message(msg_user)

            print(f"[FLASK SMTP SUCCESS] Emails sent for {enquiry_id}")
        except Exception as mail_err:
            print(f"[FLASK SMTP EXCEPTION] Saved enquiry to database, email sending failed: {mail_err}")

        return jsonify({
            'success': True,
            'message': 'Enquiry submitted successfully',
            'enquiryId': enquiry_id
        }), 201

    except Exception as err:
        print(f"Error in create_enquiry: {err}")
        return jsonify({'success': False, 'error': 'Server error occurred'}), 500

# Guarantee Flask ALWAYS returns JSON even for 404/500 errors
@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'success': False, 'error': 'API route not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'success': False, 'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
