module.exports = function PageMiddleware(req, res, next) {
    res.locals._page = {
        number: 1,
    }

    if (req.query.hasOwnProperty('page')) {
        Object.assign(res.locals._page, {
            number: req.query.page,
        });
    }
    next();
}