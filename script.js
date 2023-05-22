// Fetch currency data from the API and populate the dropdowns
fetch('https://api.exchangerate.host/latest')
  .then(response => response.json())
  .then(data => {
    const rates = data.rates;
    const currencies = Object.keys(rates);

    const fromCurrencyDropdown = document.getElementById('from-currency');
    const toCurrencyDropdown = document.getElementById('to-currency');

    currencies.forEach(currency => {
      const option = document.createElement('option');
      option.value = currency;
      option.text = currency;
      fromCurrencyDropdown.appendChild(option.cloneNode(true));
      toCurrencyDropdown.appendChild(option);
    });
  });

// Handle form submission
document.getElementById('converter-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const fromCurrency = document.getElementById('from-currency').value;
  const toCurrency = document.getElementById('to-currency').value;
  const amount = parseFloat(document.getElementById('amount').value);

  // Construct the API URL with the selected currencies
  const url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;

  // Fetch the conversion rate from the API
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const conversionRate = data.result;

      // Perform the conversion
      const convertedAmount = amount * conversionRate;

      // Display the conversion result
      document.getElementById('conversion-info').textContent = `Converted ${amount} ${fromCurrency} to ${toCurrency}:`;
      document.getElementById('converted-amount').textContent = convertedAmount.toFixed(2);

      // Show the result container
      document.getElementById('result-container').style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

// Handle "Convert Again" button click
document.getElementById('convert-again-button').addEventListener('click', function() {
  // Reset the form and hide the result container
  document.getElementById('converter-form').reset();
  document.getElementById('result-container').style.display = 'none';
});