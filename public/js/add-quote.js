async function newFormHandler(event) {
  event.preventDefault();
  const quote_text = document.querySelector("#new_quote_text").value;
  const author = document.querySelector("#quote_author").value;
  const category = document.querySelector("#quote_category").value;

  const response = await fetch(`/api/quote`, {
    method: "POST",
    body: JSON.stringify({
      quote_text,
      author,
      category,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Failed to add dish");
  }
}

document
  .querySelector(".new-quote-form")
  .addEventListener("submit", newFormHandler);
