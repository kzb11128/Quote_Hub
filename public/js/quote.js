// Generate and Save the quote as a UserQuote
  const saveQuoteButton = document.querySelector('TBD');
  const generateQuoteButton = document.querySelector('TBD');
  const generatedQuoteTextElement = document.querySelector('TBD');
  const generatedQuoteAuthorElement = document.querySelector('TBD');
  const savedQuotesContainer = document.querySelector('TBD');
  const generatedQuoteIdElement = document.querySelector('TBD');


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
      generatedQuoteIdElement.textContent = randomQuote.id;

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
      const generatedQuoteId = generatedQuoteIdElement.textContent;

      // Make a POST request to the '/userquotes' endpoint to save the generated quote as UserQuote
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quote_id: generatedQuoteId }),
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
