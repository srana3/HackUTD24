import requests
import matplotlib.pyplot as plt
import time

# Define the stocks you hold and the number of shares
portfolio = {
    "MSFT": 10,  # 10 shares of Microsoft
    "AAPL": 5,   # 5 shares of Apple
    "GOOGL": 3   # 3 shares of Google
}

api_key = "0ad3d387d03142c0989725239d72c03c"

def get_stock_price(ticker_symbol, api):
    url = f"https://api.twelvedata.com/price?symbol={ticker_symbol}&apikey={api}"
    response = requests.get(url).json()
    price = response['price']
    return float(price)

# Function to fetch portfolio value
def get_portfolio_value(portfolio, api_key):
    portfolio_values = {}
    for ticker, shares in portfolio.items():
        price = get_stock_price(ticker, api_key)
        total_value = price * shares
        portfolio_values[ticker] = total_value
    return portfolio_values

# Set up for plotting
portfolio_values = []
timestamps = []

# Collect data every 10 seconds (for example) for 1 minute
for _ in range(6):  # Collect 6 data points (over 1 minute)
    portfolio_value = get_portfolio_value(portfolio, api_key)
    total_portfolio_value = sum(portfolio_value.values())  # Sum all stock values in the portfolio

    # Append the total portfolio value and timestamp
    portfolio_values.append(total_portfolio_value)
    timestamps.append(time.strftime('%H:%M:%S'))  # Format timestamp for labels

    print(f"Portfolio Value at {timestamps[-1]}: ${total_portfolio_value:.2f}")

    time.sleep(10)  # Sleep for 10 seconds before the next data point

# Create the plot
plt.plot(timestamps, portfolio_values, marker='o')
plt.xticks(rotation=45)
plt.title("Total Portfolio Value Over Time")
plt.xlabel("Time")
plt.ylabel("Portfolio Value (USD)")
plt.tight_layout()
plt.show()
