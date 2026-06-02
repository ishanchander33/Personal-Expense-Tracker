from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db():
    conn = sqlite3.connect('expenses.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/expenses', methods=['GET'])
def get_expenses():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM expenses')
    expenses = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in expenses])

@app.route('/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)',
                   (data['title'], data['amount'], data['category'], data['date']))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Expense add ho gaya!'})

@app.route('/expenses/<int:id>', methods=['DELETE'])
def delete_expense(id):
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM expenses WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Expense delete ho gaya!'})

if __name__ == '__main__':
    app.run(debug=True)