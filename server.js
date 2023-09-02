const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8000;
const seinfeldQuotes = require('./seinfeldQuotes');

app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'images' directory

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Serve the main.js file with the appropriate MIME type
app.get('/main.js', (request, response) => {
    response.setHeader('Content-Type', 'application/javascript'); // Set the Content-Type header
    response.sendFile(path.join(__dirname, 'main.js'));
});

// Serve the style.css file with the appropriate MIME type
app.get('/style.css', (request, response) => {
    response.setHeader('Content-Type', 'text/css'); // Set the Content-Type header
    response.sendFile(path.join(__dirname, 'style.css'));
});



app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})


app.get('/api/quotes', (request, response) => {
    response.json(seinfeldQuotes);
  });
  
  app.get('/api/random', (request, response) => {
    const randomIndex = Math.floor(Math.random() * seinfeldQuotes.length);
    const randomQuote = seinfeldQuotes[randomIndex];
    response.json(randomQuote);
  });




// app.get('/api/quotes', (request, response) => {
//     response.json(seinfeldQuotes)
// })

// app.get('/api/random', (request, response)=> {
//     function getRandom(){
//         const availableQuotes = seinfeldQuotes.slice();
//         const randomIndex = Math.floor(Math.random() * availableQuotes.length);
//         const randomQuote = availableQuotes[randomIndex];

//         return randomQuote;
//     }
//     const randomQuote = getRandom();
//     response.json(randomQuote);
// })


// app.get('/api/:name', (request, response) => {
//     const rapperName = request.params.name.toLowerCase()
//     if(rappers[rapperName]){
//         response.json(rappers[rapperName])
//     }else{
//         response.json(rappers['unknown'])
//     }
// })

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})