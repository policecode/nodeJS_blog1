const Account = require('../model/Account');

module.exports = function AuthMiddleware(req, res, next) {
    
    if (!req.signedCookies.userLogin) {
        res.redirect('/account/login');
        return;
    }
    Account.findOne({account: req.signedCookies.userLogin})
        .then((account) => {
            if (!account) {
                res.redirect('/account/login');
                return;
            }
            next();

        })
        .catch((err) => {
            res.redirect('/account/login');
            return;
        });
}