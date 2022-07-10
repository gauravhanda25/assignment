module.exports = function(express) {
    var router = express.Router()
        // options
    require('./modules/options/options_routes')(router);

    return router;
}