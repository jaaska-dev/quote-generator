// Quote Container, Quote Text element, the Quote's Author element, Twitter button and New Quote button
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// Getting a quote from forismatic.com's API with fetch through a proxy API to avoid the CORS policy
const getQuote = async () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //If the author is blank, author's text will be set to Loading
    if (data.quoteAuthor === '') {
      authorText.innerText = "Loading...";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    //Reducing font size for long quotes
    if(data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    getQuote();
  }
};

//Function that lets a user tweet the quote
const tweetHandler = () => {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');

}

//Event listeners
twitterBtn.addEventListener('click', tweetHandler);
newQuoteBtn.addEventListener('click', getQuote);
//On Loading
getQuote();
