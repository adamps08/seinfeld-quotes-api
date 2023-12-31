const MongoClient = require('mongodb').MongoClient; 
const express = require('express');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8000;
const seinfeldQuotes = require('./seinfeldQuotes');
require('dotenv').config()

//updating quotes

const addLikes = seinfeldQuotes.map(quote => {
    return {...quote, likes: 0}; 
})

//mongo db

let db;
let dbClient;
dbConnectionStr = process.env.DB_STRING
dbName = 'seinfeld-quotes'




   MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
       .then(client => {
         console.log(`Connected to ${dbName} Database`)
          db = client.db(dbName)
       })




 // Middleware to ensure a MongoDB connection is available
      const ensureDbConnection = async (req, res, next) => {
         if (!dbClient || !dbClient.isConnected()) {
           try {
             await connectToDatabase(); // Reconnect to MongoDB if not connected
           } catch (error) {
             return res.status(500).json({ error: 'Internal server error' });
           }
         }
         next();
       };



//server static files
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

app.use(cors());

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'images' directory

//crud

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


// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get('/', (request, response) => {
//   response.render('index.ejs');
// });

app.get('/',(request, response)=>{
  db.collection('comments')
    .find()
    .sort({likes: -1})
    .toArray()
    .then(comments => {
        if (comments.length === 0){
          response.render('index.ejs', {noComments: true})
        }else{ 
          response.render('index.ejs', { comments, noComments: false })
        }
    })
    .catch(error => {
      console.error(error);
      response.status(500).send('Error retrieving comments')
    })
})




 app.get('/api/quotes', cors(), async (request, response) => {
    try {
        const quotesCollection = db.collection('quotes2'); 
        const quotesData = await quotesCollection.find({}).toArray();
        response.json(quotesData);
    } catch (error) {
        console.error('Error fetching quotes from MongoDB:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/random', cors(), async (request, response) => {
    try {
        const quotesCollection = db.collection('quotes2'); 
        const count = await quotesCollection.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomQuote = await quotesCollection.findOne({}, { skip: randomIndex });
        response.json(randomQuote);
    } catch (error) {
        console.error('Error fetching random quote from MongoDB:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/addOneLike', cors(), async (request, response) => {
  try {
    const quoteId = new ObjectId(request.body._id); 

    const result = await db.collection('quotes2').updateOne(
      { _id: quoteId },
      { $inc: { likes: 1 } }
    );

    if (result.matchedCount === 0) {
      return response.status(404).json({ error: 'Quote not found' });
    }

    console.log('Added One Like');
    response.json({ message: 'Like added' });
  } catch (error) {
    console.error('Error adding like:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/addCommentLike', cors(), async (request, response) => {
  try {
    const commentId = new ObjectId(request.body._id); 

    const result = await db.collection('comments').updateOne(
      { _id: commentId },
      { $inc: { likes: 1 } } 
    );

    if (result.matchedCount === 0) {
      return response.status(404).json({ error: 'Comment not found' });
    }

    console.log('Added One Like');
    response.json({ message: 'Like added' });
  } catch (error) {
    console.error('Error adding like:', error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//sorting likes for the top ten quotes
app.get('/api/top-ten', async (request, response) => {
  try{
    const quotesCollection = db.collection('quotes2'); 
    const sortedQuotes = await quotesCollection
    .find({})
    .sort({likes: -1})
    .limit(10)
    .toArray()

    response.json(sortedQuotes);
} catch (error) {
    console.error('Error sorting quotes', error);
    response.status(500).json({ error: 'Internal server error' });
}
});

//comment schema

//posting comments
app.post('/post-comment', (request, response) => {
  const currentTime = new Date()
  const comment = {
    name: 'Anonymous',
    text: request.body.text, 
    likes: 0, 
    date: currentTime,
  }

  db.collection('comments').insertOne(comment)
  .then(result => {
      console.log('comment posted successfully')
      response.redirect('/')
  })
  .catch(error =>{  console.error(error)
    response.status(500).send('Error posting comment')
  })
})

// app.delete('/api/deleteComment/:commentId', (request, response) => {
//   const commentId = request.params.commentId
//   db.collection('comments').deleteOne({_id: commentId})
//   .then(result => {
//       console.log('Comment Deleted')
//       response.json('Comment Deleted')
//   })
//   .catch(error => console.error(error))

// })


app.delete('/deleteComment/:commentId', (request, response) => {
  const commentId = request.params.commentId;
  try {
    const objectIdCommentId = new ObjectId(commentId);
    db.collection('comments')
      .deleteOne({ _id: objectIdCommentId })
      .then(result => {
        if (result.deletedCount === 1) {
          console.log('Comment Deleted');
          response.json('Comment Deleted');
        } else {
          console.log('Comment not found');
          response.status(404).json('Comment not found');
        }
      })
      .catch(error => {
        console.error(error);
        response.status(500).send('Error deleting comment');
      });
  } catch (error) {
    console.error('Invalid commentId:', error);
    response.status(400).json('Invalid commentId');
  }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})





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

//adding likes to the onjects
//  let nextId = 1;
//  const addId = seinfeldQuotes.map(quote => {
//      givenId = {...quote, id: nextId }
//      nextId++
//      return givenId
//  })


//inserting quotes into mongo
// async function insertQuotesIntoMongoDB() {
//     const client = new MongoClient(dbConnectionStr, { useUnifiedTopology: true });

//     try {
//         await client.connect();
//         const db = client.db(dbName);
//         const quotesCollection = db.collection('quotes');

//         for (const quote of addLikes) {
//             // Use the quote field for matching
//             await quotesCollection.updateOne(
//                 { quote: quote.quote },
//                 { $set: quote },
//                 { upsert: true }
//             );

//             // console.log(`Quote added/updated: ${quote.quote}`);
//         }

//         console.log('Quotes inserted/updated into MongoDB successfully');
//     } catch (error) {
//         console.error('Error inserting/updating quotes into MongoDB:', error);
//     } finally {
//         client.close();
//     }
// }

// insertQuotesIntoMongoDB()


//older code
    // .then(result => {
    //      console.log('Added One Like')
    //      response.json('Like Added')
    //  })
    //  .catch(error => console.error(error))

  

// app.put('/addOneLike', (request, response) => {
//     const { quoteS, authorS } = request.body;
//     db.collection('quotes').updateOne(
//       { quote: quoteS, author: authorS },
//       {
//         $inc: { likes: 1 }, // Increment the likes by 1
//       }
//     )
//       .then((result) => {
//         console.log('Added One Like');
//         // Fetch the updated quote data
//         db.collection('quotes')
//           .findOne({ quote: quoteS, author: authorS })
//           .then((updatedQuote) => {
//             response.json({ likes: updatedQuote.likes });
//           })
//           .catch((error) => {
//             console.error(error);
//             response.status(500).json({ error: 'Error fetching updated data' });
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//         response.status(500).json({ error: 'Error updating likes' });
//       });
// })

// app.get('/api/random', async (request, response) => {
//   try {
//       const quotesCollection = db.collection('quotes'); 
//       const count = await quotesCollection.countDocuments();
//       const randomIndex = Math.floor(Math.random() * count);

//       // Filter quotes based on likes (assuming likes >= 0)
//       const randomQuote = await quotesCollection.findOne({ likes: { $gte: 0 } }, { skip: randomIndex });
      
//       response.json(randomQuote);
//   } catch (error) {
//       console.error('Error fetching random quote from MongoDB:', error);
//       response.status(500).json({ error: 'Internal server error' });
//   }
// });


