
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

const likeButton = document.querySelector('.fa-thumbs-up')


let currentQuoteData;
let currentImg;

document.querySelector('button').addEventListener('click', getQuote);

async function getQuote() {
  try {
    //const response = await fetch("http://localhost:8000/api/random");
    const response = await fetch("https://seinfeld-quotes-api.cyclic.app/api/random");
    const data = await response.json();
    currentQuoteData = data;
    
    const quoteText = document.querySelector('h2');
    const authorText = document.querySelector('h3');
    const quoteImage = document.getElementById('quoteImage');
    const quoteLikes = document.getElementById('thumbsUpIcon');
    const likeAmount = document.querySelector('.likeAmount');

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
    likeAmount.innerText = data.likes;

    // Always update the author and image
    currentImg = data.img;
    currentAuthor = data.name;

    document.querySelector('img').src = data.img;
    authorText.innerText = data.name;

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



likeButton.addEventListener('click', addLike);

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
            'name': currentAuthor
          })
        })

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          if (data.message === 'Like added') {
            // Increment the current likes in the DOM by 1
            const currentLikes = parseInt(currentLikesElement.innerText, 10);
            currentLikesElement.innerText = currentLikes + 1;
          } else {
            console.log('Response message is not as expected.');
          }
        } else {
          console.log('Response status is not OK.');
        }
      } catch (err) {
        console.error(err);
      }
    }

  likeButton.addEventListener('click', sortLikes);

function sortLikes() {
  fetch("https://seinfeld-quotes-api.cyclic.app/api/top-ten")
    .then(function (response) {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status} - ${response.statusText})`);
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      const first = document.querySelector('.top');
      const second = document.querySelector('.second');
      const third = document.querySelector('.third');
      const fourth = document.querySelector('.fourth');
      const fifth = document.querySelector('.fifth');
      const sixth = document.querySelector('.sixth');
      const seventh = document.querySelector('.seventh');
      const eighth = document.querySelector('.eighth');
      const ninth = document.querySelector('.ninth');
      const tenth = document.querySelector('.tenth');

      first.innerText = `${data[0].name}: ${data[0].quote} ${data[0].likes} likes.`;
      second.innerText = `${data[1].name}: ${data[1].quote} ${data[1].likes} likes.`;
      third.innerText = `${data[2].name}: ${data[2].quote} ${data[2].likes} likes.`;
      fourth.innerText = `${data[3].name}: ${data[3].quote} ${data[3].likes} likes.`;
      fifth.innerText = `${data[4].name}: ${data[4].quote} ${data[4].likes} likes.`;
      sixth.innerText = `${data[5].name}: ${data[5].quote} ${data[5].likes} likes.`;
      seventh.innerText = `${data[6].name}: ${data[6].quote} ${data[6].likes} likes.`;
      eighth.innerText = `${data[7].name}: ${data[7].quote} ${data[7].likes} likes.`;
      ninth.innerText = `${data[8].name}: ${data[8].quote} ${data[8].likes} likes.`;
      tenth.innerText = `${data[9].name}: ${data[9].quote} ${data[9].likes} likes.`;
    })
    .catch(function (error) {
      console.error("Error fetching and updating top ten quotes:", error);
    });
}
sortLikes();


