// portfolioData.js (can be in the same or separate file)
const portfolioHistory = [
    { date: "2024-01", value: 100.03 },
    { date: "2024-02", value: 300.25 },
    { date: "2024-03", value: 800.37 },
    { date: "2024-04", value: 375.94 },
    { date: "2024-05", value: 450.21 },
    { date: "2024-06", value: 650.63 },
    { date: "2024-07", value: 700.07 },
    { date: "2024-08", value: 1000.11 },
    { date: "2024-09", value: 1200.11 },
    { date: "2024-10", value: 1000.13 },
    { date: "2024-11", value: 1100.21 },
];

// Function to get the labels and data
function extractChartData(data) {
    const labels = data.map(entry => entry.date);
    const values = data.map(entry => entry.value);
    return { labels, values };
}

// Function to create a gradient for the chart line
function createGradient(ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#758bfd'); // Light Blue
    gradient.addColorStop(1, '#aeb8fe'); // Light Purple
    return gradient;
}

// Calculate the change from the last portfolio value and percentage change
function calculateChange(values) {
    const lastValue = values[values.length - 1];
    const previousValue = values[values.length - 2];
    const change = lastValue - previousValue;
    const percentageChange = ((change / previousValue) * 100).toFixed(2); // Percentage change
    return { change, percentageChange };
}

// Create a label displaying the portfolio value, change, and percentage change
function createValueLabel(change, percentageChange) {
    const lastValue = portfolioHistory[portfolioHistory.length - 1].value;
    const direction = change >= 0 ? '↑' : '↓'; // Up or Down arrow based on change
    const sign = change >= 0 ? '+' : '';
    return {
        portfolioValue: `$${lastValue}`,  // Add $ sign to the portfolio value
        change: `${direction} ${sign}${change}`,
        percentageChange: `(${sign}${percentageChange}%)`,
    };
}

// Chart configuration
function createChart(ctx, labels, data, valueLabel) {
    const gradient = createGradient(ctx);

    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '',
                data: data,
                borderColor: '#27187e', // Dark Blue for the line
                backgroundColor: gradient,
                borderWidth: 3,
                pointBackgroundColor: '#ff8600', // Orange for points
                pointBorderColor: '#fff',
                pointHoverRadius: 8,
                pointRadius: 6,
                pointStyle: 'circle',
                tension: 0.4,
            }],
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    enabled: true,
                    backgroundColor: '#758bfd', // Light Blue for tooltip background
                    titleFont: { size: 16, weight: 'bold' },
                    bodyFont: { size: 14 },
                    bodyColor: '#fff',
                    padding: 10,
                    borderColor: '#27187e', // Dark Blue for tooltip border
                    borderWidth: 1,
                },
                title: {
                    display: true,
                    text: `${valueLabel.portfolioValue}`,  // Display portfolio value with $
                    color: '#27187e',
                    font: { size: 22, weight: 'bold' },
                    padding: {
                        top: 20,  // Add space above the chart for the title
                    }
                },
                afterTitle: {
                    display: true,
                    text: `${valueLabel.change} ${valueLabel.percentageChange}`,  // Change and percentage below portfolio value
                    color: '#27187e',
                    font: { size: 18, weight: 'bold' },
                    padding: {
                        top: 10,  // Space between portfolio value and change/percentage
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },  // Hide grid for X-axis
                },
                y: {
                    grid: { color: 'rgba(200, 200, 200, 0.3)' },  // Light grid lines
                    beginAtZero: false,
                },
            },
            elements: {
                point: {
                    radius: 6,  // Size of the points on the line
                },
            },
            layout: {
                padding: {
                    top: 50,  // Space for the portfolio value label
                },
            },
            legend: {
                display: false,  // Remove the legend
            },
        },
    });
}

// Main function to initialize the chart
function initializeChart() {
    const { labels, values } = extractChartData(portfolioHistory);
    const { change, percentageChange } = calculateChange(values);  // Calculate the change and percentage change
    const valueLabel = createValueLabel(change, percentageChange);  // Create the label for the chart title and change
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    createChart(ctx, labels, values, valueLabel);
}

// Initialize the chart once the page has loaded
window.onload = initializeChart;