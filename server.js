const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 8000;

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


let seinfeldQuotes = [ 
   

    //Kramer
    {
        'quote': "“I'm out there Jerry and I'm lovin' every minute of it!”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Boy, these pretzels are makin' me thirsty.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“If you're not gonna be a part of a civil society, then just get in your car and drive on over to the East Side.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“The carpet sweeper is the biggest scam perpetrated on the American public since One Hour Martinizing.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Here's to feeling good all the time.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Do you have any idea how much time I waste in this apartment?”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“See, this is what the holidays are all about. Three buddies sitting around chewing gum.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“What have you done to my little cable boy?”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Moles. Yes, freckles’ ugly cousin.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“You think that dentists are so different from me and you? They came to this country just like everybody else, in search of a dream.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Giddy-up”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Yama hama, it's fright night!”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Those are my everyday balloons.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“You ever dream in 3-D? It’s like the boogeyman is coming right at you.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Do you think people will still be using napkins in the year 2000, or is this mouth-vacuum thing for real?”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Who’s gonna turn down a Junior Mint? It’s chocolate, it’s peppermint, it’s delicious.”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    {
        'quote': "“Somewhere in this hospital, the anguished squel of Pigman Cries out!”",
        'name': 'Cosmo Kramer',
        'img': 'public/images/kramer.jpg'
    },
    //Jerry
    {
        'quote': '“What’s the deal with lampshades? I mean if it’s a lamp, why do you want shade?”',
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“I had a dream last night that a hamburger was eating me." ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“Let's watch them slice this fat bastard up." ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': " “She said I wasn’t sponge-worthy. Wouldn’t waste a sponge on me.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“She had man hands.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“I’m a fancy boy.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“You're a nice guy, but I actually only have three friends. I can't really handle any more.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“I can’t be with someone like me. I hate myself!”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“If every instinct you have is wrong, then the opposite would have to be right.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“Hello, Newman.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“What could possess anyone to throw a party? I mean, to have a bunch of strangers treat your house like a hotel room.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“There’s more to life than making shallow, fairly obvious observations.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“She's a sentence finisher. It's like dating Mad Libs.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“People don’t turn down money! It’s what separates us from the animals.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': "“Hunger will make people do amazing things. I mean, the proof of that is cannibalism.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': " “If you want to make a person feel better after they sneeze, you shouldn't say 'God bless you.' You should say, 'You're so good looking!”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },
    {
        'quote': " “Breaking up is like knocking over a Coke machine. You can't do it in one push. You gotta rock it back and forth a few times, and then it goes over.”" ,
        'name': 'Jerry Seinfeld',
        'img': 'public/images/seinfeld.jpg'
    },

    //Elaine
    {
        'quote': "“I'm not a lesbian. I hate men, but I'm not a lesbian.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I’m speechless. I’m without speech.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I’ll go, if I don’t have to talk.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Fake! Fake! Fake! Fake!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I can't do this anymore, it's too long! Just tell your stupid story about the stupid desert and just die already! Die!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Is it possible that I’m not as attractive as I think I am?”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I’m Queen of the castle.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I can’t be with someone who doesn’t break up nicely. It’s an important part of the relationship.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Fake! Fake! Fake! Fake!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“It’s not fair people are seated first come, first served. It should be based on who's hungriest.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Maybe the dingo ate your baby!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I just couldn’t decide if he was really sponge-worthy.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Stella!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“I once broke up with someone for not offering me pie.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“Yada yada yada.”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
    {
        'quote': "“You’re through, Soup Nazi. Pack it up, no more soup for you. NEXT!”",
        'name': 'Elaine Benes',
        'img': 'public/images/elaine.jpg'
    },
  
    //George
    {
        'quote': '“If she can’t find me, she can’t break up with me.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“It became very clear to me sitting out there today that every decision I've made in my entire life has been wrong. My life is the complete opposite of everything I want it to be. Every instinct I have, in every aspect of life, be it something to wear, something to eat - it's all been wrong.",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“Just remember, it's not a lie if you believe it.”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“Do you ever get down on your knees and thank God you know me and have access to my dementia?”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“You know, I always wanted to pretend I was an architect.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I lie every second of the day. My whole life is a sham.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': `“I have a bad feeling that whenever a lesbian looks at me, they think "That's why I'm not a heterosexual.” `,
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“Hi, my name is George, I'm unemployed and I live with my parents.”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote':  "“He fires people like it's a bodily function!”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“My dream is to become hopeless.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“Food and sex. Those are my two passions.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“The sea was angry that day my friends.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I’m disturbed, I’m depressed, I’m inadequate. I’ve got it all!”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I feel like my old self again. Totally inadequate, completely insecure, paranoid, neurotic. It’s a pleasure.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“When you look annoyed all the time, people think that you’re busy.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I’m much more comfortable criticizing people behind their backs.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“Yeah, I’m a great quitter. It’s one of the few things I do well. I come from a long line of quitters.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“You're killing independent George!”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': ' “A George divided against itself cannot stand!”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I happen to dress based on mood.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“Don't insult me, my friend. Remember who you're talking to. No one's a bigger idiot than me.”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': "“This woman hates me so much, I'm starting to like her.”",
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“Borrowing money from a friend is like having sex. It just completely changes the relationship.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },
    {
        'quote': '“I love a good nap. Sometimes it’s the only thing getting me out of bed in the morning.”',
        'name': 'George Castanza',
        'img': 'public/images/george.jpg'
    },

    //Newman
    {
        'quote': '“Just remember, when you control the mail, you control... information.”',
        'name': 'Newman',
        'img': 'public/images/newman.jpg'
    },
    {
        'quote': '“Hello, Jerry”',
        'name': 'Newman',
        'img': 'public/images/newman.jpg'
    },
    {
        'quote': '“Tuesday has no feel! Monday has a feel. Friday has a feel. Sunday has a feel.”',
        'name': 'Newman',
        'img': 'public/images/newman.jpg'
    },
    {
        'quote': '“Damn you Seinfeld, you useless pustule!”',
        'name': 'Newman',
        'img': 'public/images/newman.jpg'
    },
    {
        'quote': '“Vile Weed!”',
        'name': 'Newman',
        'img': 'public/images/newman.jpg'
    },
    //Jerry & George
    {
        'quote': `George: “You're gonna over-dry your laundry.”
                 Jerry: “You can't over-dry.” 
                 George: “Why not?”
                 Jerry: “Same reason you can't over-wet.”`,
        'name': 'Jerry Seinfeld & George Castanza',
        'img': 'public/images/jerry-george.jpg'
    },
    {
        'quote': `Jerry: “You're on a desert island, you can bring five books. Which five do you take?”"
                 George: “I gotta read five books?”`,
        'name': 'Jerry Seinfeld & George Castanza',
        'img': 'public/images/jerry-george.jpg'
    },
    {
        'quote': ` George: “I have a sixth sense.”
                   Jerry: “Cheapness is not a sense.”`,
        'name': 'Jerry Seinfeld & George Castanza',
        'img': 'public/images/jerry-george.jpg'
    },
    {
        'quote': ` George: “I want to make a good entrance. I never makes good entrances.”
                   Jerry: “You have made some good exits.”`,
        'name': 'Jerry Seinfeld & George Castanza',
        'img': 'public/images/jerry-george.jpg'
    },
    {
        'quote': ` George: “What kind of a person are you?”
                   Jerry: “I think I'm pretty much like you, only successful.”`,
        'name': 'Jerry Seinfeld & George Castanza',
        'img': 'public/images/jerry-george.jpg'
    },
    //Jerry & Elaine
    {
        'quote': ` Jerry: “You will be stunned.”
                   Elaine: “Stunned by soup?”
                   Jerry: “You can't eat this soup standing up. Your knees buckle.”`,
        'name': 'Jerry Seinfeld & Elaine Benes',
        'img': 'public/images/jerry-elaine.jpg'
    },
    {
        'quote': ` Elaine: “Ugh, I hate people.”
                   Jerry: “Yeah, they're the worst.”`,
        'name': 'Jerry Seinfeld & Elaine Benes',
        'img': 'public/images/jerry-elaine.jpg'
    },
    //Jerry & Kramer
    {
        'quote': ` Jerry: “What the hell is that crap?”
                   Kramer: “It's Pagliacci, Jerry.”`,
        'name': 'Jerry Seinfeld & Cosmo Kramer',
        'img': 'public/images/jerry-kramer.jpg'
    },
    {
        'quote': `Jerry: “Is that your "chicken" making all that noise?”
                  Kramer: “Oh, Little Jerry loves the morning.”
                  Jerry: “Who?”
                  Kramer: “Little Jerry Seinfeld. Yeah I named my chicken after you.”`,
        'name': 'Jerry Seinfeld & Cosmo Kramer',
        'img': 'public/images/jerry-kramer.jpg'
    },
    //Elaine & Kramer
    {
        'quote': ` Kramer: “Well, I've got gonorrhea.”
                   Elaine: “That seems about right.”`,
        'name': 'Elaine Benes & Cosmo Kramer',
        'img': 'public/images/kramer-elaine.jpg'
    },
    {
        'quote': ` Kramer: “Hey Elaine, whatdya say if neither of us is married in 10 years, you and I get hitched..”
                   Elaine: “Make it 50.”
                   Kramer: (to Jerry) “We're engaged!”`,
        'name': 'Elaine Benes & Cosmo Kramer',
        'img': 'public/images/kramer-elaine.jpg'
    },
    //Others
    {
        'quote': '“A Festivus for the rest of us.”',
        'name': 'Frank Costanza',
        'img': 'public/images/frank.jpg'
    },
    {
        'quote': '“At the Festivus dinner, you gather your family around and you tell them all the ways they have disappointed you over the past year.”',
        'name': 'Frank Costanza',
        'img': 'public/images/frank.jpg'
    },
    {
        'quote': `“I'm like a phoenix, rising from Arizona!”`,
        'name': 'Frank Costanza',
        'img': 'public/images/frank.jpg'
    },
    {
        'quote': `“Many Christmas' ago, I went to buy a doll for my son. I reached for the last one they had, but so did another man. As I rained blows upon, I realized there had to be another way.”`,
        'name': 'Frank Costanza',
        'img': 'public/images/frank.jpg'
    },
    {
        'quote': `“I am not allowing my wife to date a bra salesman.”`,
        'name': 'Frank Costanza',
        'img': 'public/images/frank.jpg'
    },
    {
        'quote': `“No Soup for you!”`,
        'name': 'Yev Kassem (The Soup Nazi)',
        'img': 'public/images/kassem.jpg'
    },
    {
        'quote': `“You very bad man, Jerry. Very bad man!”`,
        'name': 'Babu Bhatt',
        'img': 'public/images/babu.jpg'
    },
]



app.get('/', (request, response) => {
    response.sendFile(__dirname + '/index.html')
})


app.get('/api/quotes', (request, response) => {
    response.json(seinfeldQuotes)
})

app.get('/api/random', (request, response)=> {
    function getRandom(){
        const availableQuotes = seinfeldQuotes.slice();
        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        const randomQuote = availableQuotes[randomIndex];

        return randomQuote;
    }
    const randomQuote = getRandom();
    response.json(randomQuote);
})




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