import requests
import time


ticker = "MSFT"
api_key = "0ad3d387d03142c0989725239d72c03c"

def get_stock_price(ticker_symbol, api):
    url = f"https://api.twelvedata.com/price?symbol={ticker_symbol}&apikey=demo{api}"
    response = requests.get(url).json()
    price = response['price'][:-3]
    return price

def get_stock_quote(ticker_symbol, api):
    url = f"https://api.twelvedata.com/quote?symbol={ticker_symbol}&apikey=demo{api}"
    response = requests.get(url).json()
    
    return response
stockdata = get_stock_quote(ticker, api_key)
stock_price = get_stock_price(ticker, api_key)

name = stockdata['name']

print(name, stock_price)


