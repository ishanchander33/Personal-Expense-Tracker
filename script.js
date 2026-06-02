const API = 'http://127.0.0.1:5000';

// Saare expenses laao aur dikhao
async function getExpenses() {
    const res = await fetch(`${API}/expenses`);
    const data = await res.json();
    
    const list = document.getElementById('expense-list');
    list.innerHTML = '';
    
    let total = 0;

    data.forEach(expense => {
        total += expense.amount;
        list.innerHTML += `
            <div class="expense-item">
                <div class="expense-info">
                    <h3>${expense.title}</h3>
                    <p>${expense.category} • ${expense.date}</p>
                </div>
                <div style="display:flex; align-items:center;">
                    <span class="expense-amount">₹${expense.amount}</span>
                    <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
                </div>
            </div>
        `;
    });

    document.getElementById('total').innerText = total;
}

// Naya expense add karo
async function addExpense() {
    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    if (!title || !amount || !date) {
        alert('Please Fill All Details!');
        return;
    }

    await fetch(`${API}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            title, 
            amount: parseFloat(amount), 
            category, 
            date 
        })
    });

    document.getElementById('title').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('date').value = '';

    getExpenses();
}

// Expense delete karo
async function deleteExpense(id) {
    await fetch(`${API}/expenses/${id}`, { method: 'DELETE' });
    getExpenses();
}

// Page load hote hi expenses laao
getExpenses();