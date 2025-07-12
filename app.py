import flask
from flask import Flask, render_template_string, request, redirect, url_for, session, flash
import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# In-memory user database (for demo only)
users = []

# HTML template (can be split into separate files for production)
template = '''
<!DOCTYPE html>
<html>
<head>
    <title>Test Web Page Login</title>
    <style>
        body {
            font-family: 'Circular', Arial, sans-serif;
            background: #000;
            margin: 0; padding: 0;
            min-height: 100vh;
        }
        .container {
            max-width: 400px;
            margin: 40px auto;
            background: #000;
            border-radius: 16px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.2);
            padding: 32px 24px 24px 24px;
            color: #fff;
            border: 6px solid #e53935;
        }
        .status-bar {
            background: #e53935;
            color: #000;
            padding: 10px;
            text-align: center;
            font-weight: bold;
            border-radius: 16px 16px 0 0;
        }
        h1 {
            font-size: 2.2em;
            font-weight: 700;
            margin-bottom: 8px;
            letter-spacing: -1px;
        }
        h2 {
            font-size: 1.3em;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .spotify-logo {
            display: block;
            margin: 0 auto 16px auto;
            width: 60px;
        }
        input, button {
            margin: 7px 0;
            padding: 10px;
            width: 100%;
            border-radius: 6px;
            border: none;
            font-size: 1em;
        }
        input {
            background: #282828;
            color: #fff;
        }
        button {
            background: #e53935;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
        }
        button:hover {
            background: #ff5252;
        }
        .error {
            color: #ff4c4c;
            margin-top: 8px;
        }
        .success {
            color: #e53935;
        }
        .prompt {
            font-size: 1.1em;
            margin-bottom: 18px;
            text-align: center;
            color: #b3b3b3;
        }
    </style>
</head>
<body>
    <div class="status-bar">
        {{ time }} | {{ date }}
    </div>
    <div class="container">
        <h1>Test Web Page</h1>
        <div class="prompt">Welcome! Sign in to continue or register to create your Test Web Page account.</div>
        {% if not session.get('user') %}
            {% if not request.args.get('show') or request.args.get('show') == 'login' %}
            <h2>Sign In to Test Web Page</h2>
                <form method="post" action="{{ url_for('login') }}">
                    <input type="text" name="email" placeholder="Enter email (@gmail, @yahoo, @hotmail)" required>
                    <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Sign In</button>
                </form>
                <button onclick="window.location='?show=register'">Register</button>
                <div style="margin-top:8px; font-size:0.95em; color:#b3b3b3; text-align:center;">Press Register if you are new on Test Web Page.</div>
            {% elif request.args.get('show') == 'register' %}
                <h2>Create your Test Web Page account</h2>
                <form method="post" action="{{ url_for('register') }}">
                    <input type="text" name="regEmail" placeholder="Enter email (@gmail, @yahoo, @hotmail)" required>
                    <input type="password" name="regPassword" placeholder="Password" required>
                <button type="submit">Register</button>
                </form>
                <button onclick="window.location='?show=login'">Sign In</button>
            {% endif %}
        {% else %}
            <h2>Welcome to Test Web Page!</h2>
            <p style="font-size:1.1em; color:#e53935;">{{ session['user'] }}</p>
            <form method="post" action="{{ url_for('logout') }}">
                <button type="submit">Logout</button>
            </form>
        {% endif %}
        {% with messages = get_flashed_messages() %}
          {% if messages %}
            <ul>
            {% for message in messages %}
              <li class="error">{{ message }}</li>
            {% endfor %}
            </ul>
          {% endif %}
        {% endwith %}
    </div>
</body>
</html>
'''

 # --- Home Page ---
@app.route('/', methods=['GET'])
def home():
    now = datetime.datetime.now()
    time = now.strftime('%I:%M %p')
    date = now.strftime('%b %d, %Y')
    return render_template_string(template, time=time, date=date)

# --- Created by Nixon Page ---
@app.route('/createdbynixon', methods=['GET'])
def createdbynixon():
    return '''
    <!DOCTYPE html>
    <html>
    <head>
        <title>Created by Nixon</title>
        <style>
            body { background: #000; color: #e53935; font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
            .center { text-align: center; }
            h1 { font-size: 2.5em; margin-bottom: 0.5em; }
            p { font-size: 1.3em; }
        </style>
    </head>
    <body>
        <div class="center">
            <h1>Created by Nixon</h1>
            <p>Thank you for signing in!</p>
        </div>
    </body>
    </html>
    '''

# --- Registration ---
@app.route('/register', methods=['POST'])
def register():
    regEmail = request.form['regEmail'].strip()
    regPassword = request.form['regPassword'].strip()
    allowed_domains = ['@gmail', '@yahoo', '@hotmail']
    if not regEmail or not regPassword:
        flash('Please enter email and password')
    elif not any(regEmail.startswith(domain) for domain in allowed_domains):
        flash('Email must start with @gmail, @yahoo, or @hotmail')
    elif any(u['email'] == regEmail for u in users):
        flash('Email already exists!')
    else:
        users.append({'email': regEmail, 'password': regPassword})
        flash('Registration successful! You can now sign in.')
    return redirect(url_for('home', show='login'))

# --- Login ---
@app.route('/login', methods=['POST'])
def login():
    email = request.form['email'].strip()
    password = request.form['password'].strip()
    allowed_domains = ['@gmail', '@yahoo', '@hotmail']
    if not any(email.startswith(domain) for domain in allowed_domains):
        flash('Email must start with @gmail, @yahoo, or @hotmail')
        return redirect(url_for('home', show='login'))
    user = next((u for u in users if u['email'] == email and u['password'] == password), None)
    if user:
        session['user'] = email
        return redirect(url_for('createdbynixon'))
    else:
        flash('Invalid email or password')
        return redirect(url_for('home', show='login'))

    # Payment functionality removed

# --- Logout ---
@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

# --- Run App ---
if __name__ == '__main__':
    app.run(debug=True)
