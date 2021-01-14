// Modules
const express = require('express');
const helmet = require('helmet');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const path = require('path');

// Express
const app = express();

// Static
app.use(express.static(__dirname + '/public'));

// Helmet
app.use(helmet());

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Nunjucks
app.set('view engine', 'njk');
nunjucks.configure('views', {
    express: app,
    autoescape: true
});

// Views directory
app.set('views', path.join(__dirname, 'views'));

// Views 'n' Routes
app.use('/', require('./routes/index.js'));

// Error 404
app.get('*', (req, res) => {
    res.status(404).send('Error 404: No such page found!');
});

// Port
const port = process.env.PORT || 8069;
app.listen(port, () => console.log(`App is live on port ${port}!`));