// Generate and Save the quote as a UserQuote
  const saveQuoteButton = document.querySelector('#savebtn-random-quote');
  const generateQuoteButton = document.querySelector('#getbtn-random-quote');
  const generatedQuoteTextElement = document.querySelector('#random-quote-text');
  const generatedQuoteAuthorElement = document.querySelector('#random-quote-author');
  const savedQuotesContainer = document.querySelector('#saved-quote-container');
  const clearButton = document.querySelector('#clearbtn-saved-quotes');


  // Add an event listener to the 'Generate Quote' button
  generateQuoteButton.addEventListener('click', async () => {
    try {
      // Make a GET request to the '/quotes' endpoint to fetch all quotes
      const response = await fetch('/api/quotes');

      if (!response.ok) {
        throw new Error('Failed to fetch quotes.');
      }

      const quotes = await response.json();

      // Get a random quote from the fetched quotes array
      const randomQuote = getRandomQuote(quotes);

      // Display the random quote on the screen
      generatedQuoteTextElement.textContent = randomQuote.quote_text;
      generatedQuoteAuthorElement.textContent = randomQuote.author;
      generatedQuoteTextElement.dataset.quoteId = randomQuote.id;

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
      const generatedQuoteId = generatedQuoteTextElement.dataset.quoteId;

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
        savedQuoteElement.innerHTML = `
        <div class="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            ${savedQuoteData.author}
          </h5>
          <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            ${savedQuoteData.quote_text}
          </p>
        </div>
      `;
        // savedQuoteElement.innerHTML = `<p>${savedQuoteData.quote_text}</p><p>${savedQuoteData.author}</p>`;
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

  clearButton.addEventListener('click', async () => {
    try {
      const response = await fetch('/api/quotes', {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User quotes cleared successfully');
        while (savedQuotesContainer.firstChild) {
          savedQuotesContainer.removeChild(savedQuotesContainer.firstChild);
        }
      } else {
        const errorData = await response.json();
        console.log('Error:', errorData.message);
      }
    } catch (err) {
      console.log('Error:', err.message);
    }
  });
