module.exports = function (host, port) {
    return (function () {
        var db = new mongo.Db(
            'test',
            new mongo.Server(host, port, { auto_reconnect: true }, {})
        );
        db.open(function () {});

        function getRaceByName(name) {
            db.collection('races', function (err, races) {
                races.find({'name': name}, function (err, cursor) {
                    if (cursor.hasNext()) {
                        return cursor.next();
                    }
                    return null;
                });
            });
        }
        
        return {
            getRace: function (name) {
                getRaceByName(name);
            }
        };
    }());
};
var mongo = require('mongodb');