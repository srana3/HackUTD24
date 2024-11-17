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
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise an HTTPError for bad HTTP responses
        data = response.json()
        if 'price' in data:
            return float(data['price'])
        else:
            print(f"Error: {data.get('message', 'Unknown error')}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching {ticker_symbol} price: {e}")
        return None

def get_portfolio_value(portfolio, api_key):
    portfolio_values = {}
    for ticker, shares in portfolio.items():
        price = get_stock_price(ticker, api_key)
        if price is not None:
            portfolio_values[ticker] = price * shares
        else:
            portfolio_values[ticker] = 0  # Set to 0 if error
    return portfolio_values

# Initialize data for plotting
portfolio_values = []
timestamps = []

# Collect data every 10 seconds for 1 minute
for _ in range(6):  # 6 data points (over 1 minute)
    portfolio_value = get_portfolio_value(portfolio, api_key)
    total_value = sum(portfolio_value.values())

    # Append the total portfolio value and timestamp
    portfolio_values.append(total_value)
    timestamps.append(time.strftime('%H:%M:%S'))

    print(f"Portfolio Value at {timestamps[-1]}: ${total_value:.2f}")
    time.sleep(100)  # Sleep for 10 seconds

# Ensure we have enough data to plot
if len(portfolio_values) > 1:
    # Determine color based on trend (green for up, red for down)
    line_color = 'green' if portfolio_values[-1] > portfolio_values[0] else 'red'

    # Create the figure and axis
    fig, ax = plt.subplots(figsize=(6, 1))  # Compact size for sparkline

    # Plot the sparkline
    ax.plot(timestamps, portfolio_values, color=line_color, linewidth=2)

    # Remove axes for a clean, minimalist look
    ax.axis('off')

    # Highlight start and end points (optional)
    ax.scatter(timestamps[0], portfolio_values[0], color='gray', zorder=5)  # Start point
    ax.scatter(timestamps[-1], portfolio_values[-1], color=line_color, zorder=5)  # End point

    # Save or display the plot
    plt.tight_layout()
    plt.show()
else:
    print("Not enough data to plot.")
