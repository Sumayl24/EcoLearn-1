# EcoLearn — SDG13 (Flask)

Minimal Flask web app for EcoLearn focused on SDG13 (Climate Action).
No login required. Lessons, intermediate content, quizzes, and a simple chatbot are included.

## Run locally

1. Make sure you have Python 3.8+ installed.
2. Create a venv and activate it:
   ```
   python -m venv venv
   source venv/bin/activate   # on Windows: venv\Scripts\activate
   ```
3. Install requirements:
   ```
   pip install flask
   ```
4. Run:
   ```
   python app.py
   ```
5. Open http://127.0.0.1:5000 in your browser.

## Notes
- Progress is not stored on server; quizzes are evaluated on submit and results shown.
- Chatbot is rule-based and simple — you can extend /chat endpoint for smarter replies.