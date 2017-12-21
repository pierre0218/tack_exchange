var tickersData = [
    { symbol: "BTC", lastusd: 18492, volume: 64486, summary:"BTC/USD", icon_path: "img/BTC", total: 0,},
    { symbol: "LTC", lastusd: 306.71, volume: 439804, summary:"LTC/USD",icon_path: "img/LTC", total: 0,},
    { symbol: "ETH", lastusd: 704.26, volume: 248080, summary:"ETH/USD",icon_path: "img/ETH", total: 0,},
    { symbol: "XRP", lastusd: 0.69197, volume: 97147423, summary:"XRP/USD",icon_path: "img/XRP", total: 0,},
    { symbol: "IOTA", lastusd: 3.834, volume: 34907679, summary:"IOTA/USD",icon_path: "img/IOTA", total: 0,},
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
    var icon_path = 'img/BTC';
    var chart_path = 'plots/BTC_chart';
    var book_path = 'orderbook/BTC_orderbook';
    var trade_path = 'BTC_trade';
    var pair = 'BTC/USD';
    var sub_dir = 't/';
    if(req.params.symbol)
    {
        icon_path = 'img/'+req.params.symbol;
        chart_path = 'plots/'+req.params.symbol+'_chart';
        book_path = 'orderbook/'+req.params.symbol+'_orderbook';
        pair = req.params.symbol+'/USD';
        trade_path = '../BTC_trade';
        sub_dir = '';
    }
    
    checkLoginStatus(req, res);
    res.render( 'index', {
        title : 'Tack Exchange', 
        loginStatus : isLogin,
        username : req.signedCookies.userid,
        subDir: sub_dir,
        iconPath: icon_path,
        chartPath: chart_path,
        bookPath: book_path,
        tradePath: trade_path,
        pairName: pair,
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
