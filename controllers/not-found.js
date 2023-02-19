const path = require('path');

exports.notFoundPage = (req, res, next) => {
    res.render(path.join(__dirname, '..', 'views', 'pages', 'page-not-found'), {pageTitle: 'Page not Found'});
}