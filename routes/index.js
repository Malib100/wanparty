// Modules
const express = require('express');
const fs = require('fs');

// Express Router
const router = express.Router();

// Home
router.get('/', (req, res) => {
    res.render('home.njk', JSON.parse(fs.readFileSync('./public/news.json', 'utf-8')));
});

// Stream
router.get('/stream', (req, res) => {
    res.render('stream.njk');
});

// Ekipe
router.get('/ekipe', (req, res) => {
    res.render('teams.njk', JSON.parse(fs.readFileSync('./public/teams.json', 'utf-8')));
});

// FAQ
router.get('/faq', (req, res) => {
    res.render('faq.njk');
});

// Spored
// router.get('/razporedja', (req, res) => {
//     res.render('razporedja.njk');
// });

// Test route
router.get('/hi', (req, res) => {
    res.status(200).send('hi');
})

let brackets = {
    lol: {
        game: 'League of Legends',
        bracket: 'https://battlefy.com/embeds/602e49d11f489f7f47cd3b34/stage/602e4a7fa74cc17c31b7e179'
    },
    valorant: {
        game: 'Valorant',
        bracket: 'https://challonge.com/gc5er/module'
    }
}

// Spored za game
router.get('/razporedje/:game', (req, res) => {
    let game = req.params.game;

    if (game && brackets[game]) {
        res.render('razporedje.njk', brackets[game])
    } else {
        res.redirect('/')
    }
});

// Spored za game
router.get('/spored/', (req, res) => {
    res.render('spored.njk')
});


// Sends all posts
router.get('/posts/all', (req, res) => {
    res.send(JSON.parse(fs.readFileSync('./public/news.json', 'utf-8')));
})

module.exports = router;