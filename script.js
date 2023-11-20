// script.js
function fetchQuote() {
    axios.get('https://api.quotable.io/random')
      .then(response => {
        const quoteElement = document.getElementById('quote');
        quoteElement.innerText = `"${response.data.content}" - ${response.data.author}`;
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  }
  