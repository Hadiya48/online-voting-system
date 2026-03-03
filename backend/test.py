print("Starting test...")
try:
    from flask import Flask
    print("✓ Flask imported")
    
    app = Flask(__name__)
    print("✓ Flask app created")
    
    @app.route('/')
    def hello():
        return 'Hello World'
    
    print("✓ Route created")
    print("Test successful! Flask is working.")
    
except Exception as e:
    print(f"Error: {e}")