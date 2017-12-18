var tickersData = [
    { symbol: "BTC", lastusd: 18492, volume: 64486},
    { symbol: "LTC", lastusd: 306.71, volume: 439804},
    { symbol: "ETH", lastusd: 704.26, volume: 248080},
    { symbol: "XRP", lastusd: 0.69197, volume: 97147423},
    { symbol: "IOTA", lastusd: 3.834, volume: 34907679},
]; 


//Check user's login status
var isLogin = false;
var checkLoginStatus = function(req, res){
    isLogin = false;
    if(req.signedCookies.userid && req.signedCookies.password){
        isLogin = true;
    }
};

//Home page
exports.index = function(req, res){
    var path = 'BTC';
    if(req.params.symbol)
    {
        path = 'img/'+req.params.symbol;
    }
    
    checkLoginStatus(req, res);
    res.render( 'index', {
        title : 'Tack Exchange', 
        loginStatus : isLogin,
        username : req.signedCookies.userid,
        symbolPath: path,
        tickers: tickersData
    }); 
};

//Register page
exports.reg = function(req, res){
    checkLoginStatus(req, res);
    res.render( 'reg', {
        title : 'Register',
        loginStatus : isLogin
    });
};

//Do register action
exports.doReg = function(req, res){
    if(req.body['password-repeat'] != req.body['password']){
        console.log('password not match');
        console.log('first entered:' + req.body['password']);
        console.log('second enterd:' + req.body['password-repeat']);
        return res.redirect('/reg');
    }
    else{
        //register success, redirect to index
        res.cookie('userid', req.body['username'], { path: '/', signed: true});     
        res.cookie('password', req.body['password'], { path: '/', signed: true });
        return res.redirect('/');
    }
};

//Login page
exports.login = function(req, res){
    checkLoginStatus(req, res);
    res.render( 'login', {
        title : 'Login',
        loginStatus : isLogin
    });
};

//Do login action
exports.doLogin = function(req, res){
    if(req.body['password-repeat'] != req.body['password']){
        console.log('password not match');
        console.log('first entered:' + req.body['password']);
        console.log('second enterd:' + req.body['password-repeat']);
        return res.redirect('/reg');
    }
    else{
        //register success, redirect to index
        res.cookie('userid', req.body['username'], { path: '/', signed: true});     
        res.cookie('password', req.body['password'], { path: '/', signed: true });
        return res.redirect('/');
    }
};

//Do logout action
exports.logout = function(req, res){
    res.clearCookie('userid', { path: '/' });
    res.clearCookie('password', { path: '/' });
    return res.redirect('/');
};
