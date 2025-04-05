let transactions = [];

const form = document.getElementById('transaction-form');
const description = document.getElementById('description');
const amount = document.getElementById('amount');
const date = document.getElementById('date');
const type = document.getElementById('type');
const category = document.getElementById('category');

const transactionList = document.getElementById('transaction-list');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const netBalance = document.getElementById('net-balance');
const errorMsg = document.getElementById('error-msg');


form.addEventListener('submit', (e) => {
  e.preventDefault();

  const amt = parseFloat(amount.value);

  if (
    description.value.trim() === '' ||
    isNaN(amt) || amt <= 0 ||
    date.value === '' ||
    category.value === ''
  ) {
    errorMsg.textContent = 'Please fill out all fields correctly.';
    return;
  }

  errorMsg.textContent = '';

  const transaction = {
    id: Date.now(),
    description: description.value,
    amount: amt,
    date: date.value,
    type: type.value,
    category: category.value
  };

  transactions.push(transaction);
  renderTransactions();
  form.reset();
});

function renderTransactions() {
  transactionList.innerHTML = '';
  let income = 0, expense = 0;

  transactions.forEach((txn) => {
    const li = document.createElement('li');
    li.className = txn.type === 'income' ? 'income' : 'expense';
    li.innerHTML = `
      ${txn.description} - ₹${txn.amount} (${txn.category} on ${txn.date})
      <button onclick="deleteTransaction(${txn.id})">❌</button>
    `;

    transactionList.appendChild(li);

    if (txn.type === 'income') {
        income += txn.amount;
    } else {
      expense += txn.amount;
    }
  });

  totalIncome.textContent = income.toFixed(2);
  totalExpense.textContent = expense.toFixed(2);
  netBalance.textContent = (income - expense).toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter(txn => txn.id !== id);
  renderTransactions();
}
