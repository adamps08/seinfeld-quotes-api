
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

const likeButton = document.querySelectorAll('.fa-thumbs-up')


let currentQuoteData;
let currentImg;

document.querySelector('button').addEventListener('click', getQuote);

async function getQuote() {
  try {
    // const response = await fetch("http://localhost:8000/api/random");
     const response = await fetch("https://seinfeld-quotes-api.cyclic.app/api/random");
    // const response = await fetch("https://seinfeld-quotes-api.onrender.com/api/random");
    const data = await response.json();
    currentQuoteData = data;
    currentImg = data.img;
    console.log(data);
    
    const quoteText = document.querySelector('h2');
    const authorText = document.querySelector('h3');
    const quoteImage = document.getElementById('quoteImage');
    const quoteLikes = document.getElementById('thumbsUpIcon')
    const likeAmount = document.querySelector('.likeAmount')

    // Hide the content with transition
    quoteText.style.opacity = 0;
    authorText.style.opacity = 0;
    quoteImage.style.opacity = 0;
    quoteLikes.style.opacity = 0;
    likeAmount.style.opacity = 0;

    // Wait for the content to hide
    await new Promise((resolve) => setTimeout(resolve, 500)); // Adjust the time as needed

    // Update the content
    quoteText.innerText = data.quote;
    document.querySelector('img').src = data.img;
    authorText.innerText = data.name;
    likeAmount.innerText = data.likes;

    // Show the content with transition
    quoteText.style.opacity = 1;
    authorText.style.opacity = 1;
    quoteImage.style.opacity = 1;
    quoteLikes.style.opacity = 1;
    likeAmount.style.opacity = 1;

  } catch (err) {
    console.log(`error ${err}`);
  }
}



document.querySelector('.fa-thumbs-up').addEventListener('click', addLike);
async function addLike(){
    const currentId = currentQuoteData._id;
    const currentQuote = document.querySelector('h2').innerText;
    const currentAuthor = document.querySelector('h3').innerText;
    const currentLikesElement = document.querySelector('.likeAmount');
    let currentLikes = parseInt(currentLikesElement.innerText, 10)
  try{
      const response = await fetch('https://seinfeld-quotes-api.cyclic.app/addOneLike', {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            '_id': currentId,
            'quote': currentQuote,
            'img': currentImg,
            'likes': currentLikes,
            // 'likes': currentLikes + 1,
            'name': currentAuthor
          })
        })

        if (response.ok) {
          const data = await response.json();
          console.log(data);
    
          if (data.likes !== undefined) {
            currentLikesElement.innerText = data.likes;
          } else {
            console.log('Response data.likes is undefined.');
          }
        } else {
          console.log('Response status is not OK.');
        }
      } catch (err) {
        console.error(err);
      }
}


// 