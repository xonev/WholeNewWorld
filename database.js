module.exports = function (host, port) {
    return (function () {
        var db = new mongo.Db(
            'test',
            new mongo.Server(host, port, { auto_reconnect: true }, {})
        );
            
        function openConnection(callback) {
            if (db.state === "notConnected") {
                db.open(function (err, db) {
                    if (err === null) {
                        callback(null, db);
                    }
                    else {
                        console.log(err);
                        callback(err, null);
                    }
                });
            }
            else {
                callback(null, db);
            }
        }

        function getRaceByName(name, callback) {
            openConnection(function (err, db) {
                if (err !== null) {
                    callback(null);
                }
                else {
                    db.collection('races', function (err, races) {
                        var cursor = races.find({'name': name});
                        cursor.nextObject(function (err, obj) {
                            if (err === null) {
                                callback(obj);
                            }
                            else {
                                console.log(err);
                                callback(null);
                            }
                        });
                    });
                }
            });
        }
        
        return {
            getRace: function (name, callback) {
                getRaceByName(name, callback);
            }
        };
    }());
};
var mongo = require('mongodb');