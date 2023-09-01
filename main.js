
// document.querySelector('button').addEventListener('click', getQuote)

//  function getQuote(){

// 	fetch( "https://seinfeld-quotes-api.glitch.me/api/random")
// 		.then(res => res.json()) 
// 		.then(data => {
// 			console.log (data);
// 			document.querySelector('h2').innerText = data.quote;
// 			document.querySelector('img').src = data.img;
// 			document.querySelector('h3').innerText = data.name;
// 		})
// 		.catch(err=> {
// 			console.log(`error ${err}`)
// 		})
//   }		

// document.querySelector('button').addEventListener('click', getQuote);
// const quoteImage = document.getElementById('quoteImage');

// async function getQuote() {
//   try {
//     const response = await fetch("https://seinfeld-quotes-api.onrender.com/api/random");
//     const data = await response.json();
    
//     console.log(data);
//     document.querySelector('h2').innerText = data.quote;
//     document.querySelector('img').src = data.img;
//     document.querySelector('h3').innerText = data.name;
//     quoteImage.style.opacity = 0; 
//     quoteImage.style.opacity = 1;
//   } catch (err) {
//     console.log(`error ${err}`);
//   }
// }

/////
document.querySelector('button').addEventListener('click', getQuote);

async function getQuote() {
  try {
    const response = await fetch("https://seinfeld-quotes-api.onrender.com/api/random");
    const data = await response.json();

    console.log(data);
    
    const quoteText = document.querySelector('h2');
    const authorText = document.querySelector('h3');
    const quoteImage = document.getElementById('quoteImage');

    // Hide the content with transition
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;
    quoteImage.style.opacity = 0;

    // Wait for the content to hide
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the time as needed

    // Update the content
    quoteText.innerText = data.quote;
    document.querySelector('img').src = data.img;
    authorText.innerText = data.name;

    // Show the content with transition
    quoteText.style.opacity = 1;
    authorText.style.opacity = 1;
    quoteImage.style.opacity = 1;

  } catch (err) {
    console.log(`error ${err}`);
  }
}