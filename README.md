# 💰 Personal Finance Tracker

A modern, user-friendly web application for tracking personal income and expenses. Built with vanilla HTML, CSS, and JavaScript.

## Features

- ✅ **Add Transactions**: Record income and expenses with descriptions, amounts, categories, and dates
- 📊 **Balance Overview**: View your current balance, total income, and total expenses at a glance
- 🏷️ **Categories**: Organize transactions by categories (Salary, Food, Transport, etc.)
- 🔍 **Filtering**: Filter transactions by type (Income/Expense) and category
- 💾 **Local Storage**: All data is saved locally in your browser
- 📱 **Responsive Design**: Works beautifully on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface with smooth animations

## Getting Started

### Option 1: Open Directly
Simply open `index.html` in your web browser. No installation or setup required!

### Option 2: Using a Local Server (Recommended)

For the best experience, use a local web server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## Usage

1. **Add a Transaction**:
   - Enter a description (e.g., "Grocery Shopping")
   - Enter the amount
   - Select the type (Income or Expense)
   - Choose a category
   - Select the date
   - Click "Add Transaction"

2. **View Your Balance**:
   - Your current balance is displayed at the top
   - Total income and expenses are shown separately

3. **Filter Transactions**:
   - Use the filter dropdowns to view specific transaction types or categories

4. **Delete Transactions**:
   - Click the delete button (🗑️) next to any transaction to remove it

## Categories

### Income Categories
- Salary
- Freelance
- Investment
- Gift
- Other

### Expense Categories
- Food
- Transport
- Shopping
- Bills
- Entertainment
- Healthcare
- Education
- Other

## Data Storage

All your financial data is stored locally in your browser's localStorage. This means:
- ✅ Your data stays private (never leaves your computer)
- ✅ No account or login required
- ⚠️ Data is browser-specific (clearing browser data will delete it)
- ⚠️ Data is device-specific (not synced across devices)

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## File Structure

```
finance/
├── index.html      # Main HTML structure
├── styles.css      # All styling and design
├── script.js       # Application logic and functionality
└── README.md      # This file
```

## Future Enhancements

Potential features for future versions:
- Export data to CSV/Excel
- Charts and visualizations
- Budget planning and alerts
- Multiple currency support
- Data backup/restore
- Dark mode toggle

## License

This project is open source and available for personal use.

## Contributing

Feel free to fork this project and customize it for your needs!

---

**Enjoy tracking your finances! 💸**