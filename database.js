var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/race_index');

var raceSchema = new mongoose.Schema({
    name: { type: String, index: true },
    thumbnail: { type: String },
    image: { type: String },
    description: { type: String },
    attributes:  [String],
});

mongoose.model('Race', raceSchema);
    
module.exports = function (host, port) {
    return (function () {
        function getRaceByName(name, callback) {
            var race = mongoose.model('Race');
            race.find({'name': name}, function (err, races) {
                if (err !== null) {
                    console.log(err);
                    callback(null);
                }
                else if (races.length > 0) {
                    callback(races[0]);
                }
                else {
                    callback(null);
                }
            });
        }

        function getRaces(callback) {
            var race = mongoose.model('Race');
            race.find({}, ['name', 'thumbnail'], function (err, races) {
                if (err === null) {
                    callback(races);
                }
                else {
                    console.log(err);
                    callback([]);
                }
            });
        }
        
        return {
            getRace: function (name, callback) {
                getRaceByName(name, callback);
            },
            getRaces: getRaces
        };
    }());
};
var mongo = require('mongodb');