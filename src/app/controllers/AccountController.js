const md5 = require('md5');
const Account = require('../model/Account');


const { mutipleMongooseToObject, mongooseToOject } = require('../../until/mongoose');

class AccountController {
    //[GET] /account/login
    login(req, res, next) {
        res.render('account/login');
    }
    //[GET] /account/register
    register(req, res, next) {
        res.render('account/register');
    }
    
    //[POST] /account/createAccount
    createAccount(req, res, next) {
        const account = new Account(req.body);
        account.password = md5(account.password)
        account.save()
                .then(() => {
                    res.redirect('back');
                })
                .catch(err => {
                    res.redirect('/account/login');
                })
    }

    //[POST] /account/login
    makeLogin(req, res, next) {
        const passwordMd5 = md5(req.body.password);
        Account.findOne({account: req.body.account})
            .then((account) => {
                if (!account) {
                    res.render('account/login', {
                        errorAcc: "không chính xác"
                    })
                    return;
                }
                if(account.password !== passwordMd5) {
                    res.render('account/login', {
                        errorPass: "không chính xác",
                        acc: account.account
                    })
                    return;
                }
                res.cookie('userLogin', account.account, {
                    signed: true,
                });
                res.redirect('/')
            })
            .catch(next);
    }
    
}

module.exports = new AccountController;