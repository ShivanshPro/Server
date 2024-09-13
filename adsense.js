// Helper function to extract dollar values from the DOM and convert to a number
function getDollarValue(selector) {
    let valueText = document.querySelector(selector)?.textContent || "$0.00";
    return parseFloat(valueText.replace(/[$,]/g, '')) || 0;
}

// Helper function to set dollar value in the DOM
function setDollarValue(selector, value) {
    document.querySelector(selector).textContent = `$${value.toFixed(2)}`;
}

// Function to calculate percentage change
function calculatePercentageChange(newValue, oldValue) {
    let difference = newValue - oldValue;
    let percentage = oldValue === 0 ? NaN : (difference / oldValue) * 100; // Use NaN for division by zero
    return {
        difference: difference.toFixed(2),
        percentage: isNaN(percentage) ? "N/A" : percentage.toFixed(2) // Handle NaN cases
    };
}

// Set old values to be 2 to 3 times lower than new values
var todayValue = 10.00;  // New value for today
var yesterdayValue = 5.00;  // New value for yesterday
var last7DaysValue = 30.00;  // New value for last 7 days
var thisMonthValue = 100.00;  // New value for this month

var yesterdayOldValue = yesterdayValue / 2; // Old value is approximately 1/3 of the new value
var last7DaysOldValue = last7DaysValue / 3; // Old value is approximately 1/3 of the new value
var thisMonthOldValue = thisMonthValue / 2; // Old value is approximately 1/3 of the new value

// Calculate percentage changes
var yesterdayChange = calculatePercentageChange(yesterdayValue, yesterdayOldValue);
var last7DaysChange = calculatePercentageChange(last7DaysValue, last7DaysOldValue);
var thisMonthChange = calculatePercentageChange(thisMonthValue, thisMonthOldValue);

// Update values and their percentage changes
document.querySelector('as-earnings-card-panel:nth-of-type(1) .visual').innerHTML = `$${todayValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(1) .nonvisual').innerHTML = `$${todayValue.toFixed(2)}`;

document.querySelector('as-earnings-card-panel:nth-of-type(2) .visual').innerHTML = `$${yesterdayValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(2) .nonvisual').innerHTML = `$${yesterdayValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(2) .difference-value').innerHTML = `${yesterdayChange.difference > 0 ? '+' : ''}$${yesterdayChange.difference} (${yesterdayChange.percentage}%)`;

document.querySelector('as-earnings-card-panel:nth-of-type(3) .visual').innerHTML = `$${last7DaysValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(3) .nonvisual').innerHTML = `$${last7DaysValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(3) .difference-value').innerHTML = `${last7DaysChange.difference > 0 ? '+' : ''}$${last7DaysChange.difference} (${last7DaysChange.percentage}%)`;

document.querySelector('as-earnings-card-panel:nth-of-type(4) .visual').innerHTML = `$${thisMonthValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(4) .nonvisual').innerHTML = `$${thisMonthValue.toFixed(2)}`;
document.querySelector('as-earnings-card-panel:nth-of-type(4) .difference-value').innerHTML = `${thisMonthChange.difference > 0 ? '+' : ''}$${thisMonthChange.difference} (${thisMonthChange.percentage}%)`;

// Calculate and update the total balance
var totalBalance = todayValue + yesterdayValue + last7DaysValue + thisMonthValue;
setDollarValue('.as-earnings-card-current-balance', totalBalance);

// Calculate the new "Last payment" as 30% less than the new total balance
var lastPaymentValue = totalBalance * (1 - 0.30); // 30% less
setDollarValue('.as-earnings-card-last-payment', lastPaymentValue);
