from polygon import RESTClient

# Initialize the Polygon client with your API key
client = RESTClient("QNzaaMRun7lUn5csXVozwBptOf4iipo9")

# Dictionary to store stock symbols and the number of shares held
stocks_held = {
    "AAPL": 50,  # Example: 50 shares of Apple
    "GOOGL": 30,  # Example: 30 shares of Google
    "MSFT": 20,  # Example: 20 shares of Microsoft
    "TSLA": 10,  # Example: 10 shares of Tesla
    "AMZN": 5,  # Example: 5 shares of Amazon
}

# Dictionary to store aggregates for each stock
stock_aggs = {}

# Loop through each stock symbol in stocks_held and fetch the aggregates
for stock, shares in stocks_held.items():
    aggs = []
    for a in client.list_aggs(
            stock,
            1,
            "minute",
            "2024-11-15",
            "2024-11-17",
            limit=5000,
    ):
        aggs.append(a)

    # Store the aggregate data and shares held in the dictionary
    stock_aggs[stock] = {"shares": shares, "aggs": aggs}

# Print the aggregates and stocks held for each stock
for stock, data in stock_aggs.items():
    print(f"Stock: {stock}")
    print(f"Shares Held: {data['shares']}")  # Fix: Corrected the key to 'shares'

    # Extract latest aggregates (use the last entry for most recent data)
    latest_agg = data['aggs'][-1] if data['aggs'] else None
    if latest_agg:
        print(f"Latest Close: ${latest_agg.close:.2f}")
        print(f"High: ${latest_agg.high:.2f}")
        print(f"Low: ${latest_agg.low:.2f}")
        print(f"Volume: {latest_agg.volume}")
    else:
        print("No aggregate data available")

    print()  # Add an empty line between each stock's data
