// Finance Tracker Application
class FinanceTracker {
    constructor() {
        this.transactions = this.loadTransactions();
        this.categories = {
            income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
            expense: ['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Other']
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateCategories();
        this.setDefaultDate();
        this.updateUI();
    }

    setupEventListeners() {
        const form = document.getElementById('transactionForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        document.getElementById('filterType').addEventListener('change', () => this.updateUI());
        document.getElementById('filterCategory').addEventListener('change', () => this.updateUI());
    }

    populateCategories() {
        const categorySelect = document.getElementById('category');
        const filterCategorySelect = document.getElementById('filterCategory');
        
        const typeSelect = document.getElementById('type');
        typeSelect.addEventListener('change', () => {
            const type = typeSelect.value;
            categorySelect.innerHTML = '<option value="">Select category</option>';
            this.categories[type].forEach(cat => {
                const option = document.createElement('option');
                option.value = cat;
                option.textContent = cat;
                categorySelect.appendChild(option);
            });
        });

        // Populate filter categories with all categories
        const allCategories = [...this.categories.income, ...this.categories.expense];
        const uniqueCategories = [...new Set(allCategories)];
        uniqueCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            filterCategorySelect.appendChild(option);
        });

        // Trigger initial population
        typeSelect.dispatchEvent(new Event('change'));
    }

    setDefaultDate() {
        const dateInput = document.getElementById('date');
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }

    handleSubmit(e) {
        e.preventDefault();

        const transaction = {
            id: Date.now(),
            description: document.getElementById('description').value.trim(),
            amount: parseFloat(document.getElementById('amount').value),
            type: document.getElementById('type').value,
            category: document.getElementById('category').value,
            date: document.getElementById('date').value
        };

        this.addTransaction(transaction);
        e.target.reset();
        this.setDefaultDate();
        document.getElementById('type').dispatchEvent(new Event('change'));
    }

    addTransaction(transaction) {
        this.transactions.unshift(transaction);
        this.saveTransactions();
        this.updateUI();
    }

    deleteTransaction(id) {
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveTransactions();
        this.updateUI();
    }

    getFilteredTransactions() {
        const filterType = document.getElementById('filterType').value;
        const filterCategory = document.getElementById('filterCategory').value;

        return this.transactions.filter(transaction => {
            const typeMatch = filterType === 'all' || transaction.type === filterType;
            const categoryMatch = filterCategory === 'all' || transaction.category === filterCategory;
            return typeMatch && categoryMatch;
        });
    }

    calculateBalance() {
        const income = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const expenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            balance: income - expenses,
            income,
            expenses
        };
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    updateUI() {
        this.updateBalance();
        this.updateTransactions();
    }

    updateBalance() {
        const { balance, income, expenses } = this.calculateBalance();

        document.getElementById('balance').textContent = this.formatCurrency(balance);
        document.getElementById('totalIncome').textContent = this.formatCurrency(income);
        document.getElementById('totalExpense').textContent = this.formatCurrency(expenses);

        // Update balance color based on value
        const balanceElement = document.getElementById('balance');
        if (balance >= 0) {
            balanceElement.style.color = 'var(--success-color)';
        } else {
            balanceElement.style.color = 'var(--danger-color)';
        }
    }

    updateTransactions() {
        const transactionsList = document.getElementById('transactionsList');
        const filteredTransactions = this.getFilteredTransactions();

        if (filteredTransactions.length === 0) {
            transactionsList.innerHTML = '<p class="empty-state">No transactions found. Add your first transaction above!</p>';
            return;
        }

        transactionsList.innerHTML = filteredTransactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-info">
                    <div class="transaction-description">${this.escapeHtml(transaction.description)}</div>
                    <div class="transaction-meta">
                        <span>${this.escapeHtml(transaction.category)}</span>
                        <span>•</span>
                        <span>${this.formatDate(transaction.date)}</span>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <span class="transaction-amount ${transaction.type}">
                        ${transaction.type === 'income' ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                    </span>
                    <button class="delete-btn" onclick="financeTracker.deleteTransaction(${transaction.id})" title="Delete transaction">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveTransactions() {
        localStorage.setItem('financeTransactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        const saved = localStorage.getItem('financeTransactions');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize the application
const financeTracker = new FinanceTracker();