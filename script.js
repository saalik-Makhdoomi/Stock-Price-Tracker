document.getElementById('stock-form').addEventListener('submit', function (e) {
    e.preventDefault();

    require('dotenv').config();
    
    const stockSymbol = document.getElementById('stock-symbol').value;
    const apiKey = process.env.API_KEY;
    
    const apiUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apiKey=${API_KEY}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const stockInfo = data['Global Quote'];
            if (stockInfo) {
                const price = stockInfo['05. price'];
                document.getElementById('stock-price').textContent = `The current price of ${stockSymbol.toUpperCase()} is $${parseFloat(price).toFixed(2)}`;
            } else {
                document.getElementById('stock-price').textContent = 'Invalid stock symbol or data not available.';
            }
        })
        .catch(error => {
            console.error('Error fetching stock data:', error);
            document.getElementById('stock-price').textContent = 'Error fetching stock data.';
        });
});