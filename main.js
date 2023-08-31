
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

document.querySelector('button').addEventListener('click', getQuote);

async function getQuote() {
  try {
    const response = await fetch("https://seinfeld-quotes-api.onrender.com/api/random");
    const data = await response.json();

    console.log(data);
    document.querySelector('h2').innerText = data.quote;
    document.querySelector('img').src = data.img;
    document.querySelector('h3').innerText = data.name;
  } catch (err) {
    console.log(`error ${err}`);
  }
}