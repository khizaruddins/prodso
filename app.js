// third party package imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// internal imports
const adminRoutes = require('./routes/admin');
const clientRoutes = require('./routes/client');
const notFoundController = require('./controllers/not-found');

// constants and initializations
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middlewares setup
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrapscripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));

// registered routes
app.use('/admin', adminRoutes);
app.use(clientRoutes);

// not found page
app.use(notFoundController.notFoundPage);

// serve
app.listen(3000);