// Get the context of the canvas element to draw the chart
const ctx = document.getElementById('stockChart').getContext('2d');

// Initialize the chart with empty data
const stockChart = new Chart(ctx, {
    type: 'line',  // Type of chart
    data: {
        labels: [],  // Dynamically filled with dates or timestamps
        datasets: [{
            label: 'Stock Price (USD)',
            data: [],  // Dynamically filled with stock prices
            borderColor: 'rgba(75, 192, 192, 1)',  // Line color
            borderWidth: 2,  // Line width
            fill: false  // No fill under the line
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date'  // X-axis label
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USD)'  // Y-axis label
                }
            }
        }
    }
});

// Fetch data from the API
const fetchData = async () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://yahoo-finance15.p.rapidapi.com/api/v1/markets/options/most-active?type=STOCKS';

    try {
        const response = await fetch(proxyUrl + targetUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'f5c6307fb2msh75bfc4a28bf8d88p1aff9bjsn3c40b5b8d9da',
                'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Success:", data);
    } catch (error) {
        console.error("Fetch Error:", error.message);
    }
};

fetchData();

