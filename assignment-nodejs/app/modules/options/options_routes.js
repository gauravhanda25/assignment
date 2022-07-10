module.exports = function(router) {

    var ad = require('./controllers/options_ctrl');
    router.get('/options/getOptions', ad.getOptions);
    
    return router;
}