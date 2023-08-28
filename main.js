
document.querySelector('button').addEventListener('click', getQuote)

 function getQuote(){

	fetch( "https://seinfeld-quotes-api-9e3f304f1eda.herokuapp.com/api/random")
		.then(res => res.json()) 
		.then(data => {
			console.log (data);
			document.querySelector('h2').innerText = data.quote;
			document.querySelector('img').src = data.img;
			document.querySelector('h3').innerText = data.name;
		})
		.catch(err=> {
			console.log(`error ${err}`)
		})
  }		
