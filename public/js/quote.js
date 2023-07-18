// Generate and Save the quote as a UserQuote
document.addEventListener('DOMContentLoaded', () => {
  const saveQuoteButton = document.getElementById('TBD');
  const generateQuoteButton = document.getElementById('TBD');
  const generatedQuoteTextElement = document.getElementById('TBD');
  const generatedQuoteAuthorElement = document.getElementById('TBD');
  const savedQuotesContainer = document.getElementById('TBD');


  // Add an event listener to the 'Generate Quote' button
  generateQuoteButton.addEventListener('click', async () => {
    try {
      // Make a GET request to the '/quotes' endpoint to fetch all quotes
      const response = await fetch('/quotes');

      if (!response.ok) {
        throw new Error('Failed to fetch quotes.');
      }

      const quotes = await response.json();

      // Get a random quote from the fetched quotes array
      const randomQuote = getRandomQuote(quotes);

      // Display the random quote on the screen
      generatedQuoteTextElement.textContent = randomQuote.text;
      generatedQuoteAuthorElement.textContent = randomQuote.author;
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching the quote.');
    }
  });

  // Function to get a random quote from an array of quotes
  function getRandomQuote(quotesArray) {
    const randomIndex = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randomIndex];
  }

  // Add an event listener to the 'Save Quote' button
  saveQuoteButton.addEventListener('click', async () => {
    try {
      // Get the generated quote text and author from the DOM
      const generatedQuoteText = generatedQuoteTextElement.textContent;
      const generatedQuoteAuthor = generatedQuoteAuthorElement.textContent;

      // Make a POST request to the '/userquotes' endpoint to save the generated quote as UserQuote
      const response = await fetch('/userquotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote_text: generatedQuoteText, author: generatedQuoteAuthor }),
      });

      // Handle the response
      if (response.ok) {
        const savedQuoteData = await response.json();

        // Display the saved quote in the 'saved-quotes-container'
        const savedQuoteElement = document.createElement('div');
        savedQuoteElement.innerHTML = `<p>${savedQuoteData.quote_text}</p><p>${savedQuoteData.author}</p>`;
        savedQuotesContainer.appendChild(savedQuoteElement);
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the quote.');
    }
  });
});
