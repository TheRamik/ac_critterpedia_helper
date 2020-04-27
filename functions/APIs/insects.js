// insects.js

const { db } = require('../util/admin');
const { timeToString,
        monthsToString } = require('./toString');

exports.getAllInsects = (request, response) => {
    db
        .collection('insects')
        .get()
        .then((data) => {
            let insects = [];
            data.forEach((doc) => {
                insects.push({
                    insectId: doc.id,
                    name: doc.data().name,
                    location: doc.data().location,
                    value: doc.data().value,
                    time: timeToString(doc.data().time),
                    month: monthsToString(doc.data().month),
                });
            });
            return response.json(insects);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({error: err.code});
        });
};

exports.getActiveInsects = (request, response) => {
    console.log("Currently Not Available... Not yet implemented");
    return response.status(400).json({ body: 'Currently Not Available'});
}

exports.postOneInsect = (request, response) => {
    if (request.body.name.trim() === '') {
        return response.status(400).json({ body: 'Name must not be empty'});
    }

    if (Array.isArray(request.body.time) && request.body.time.length) {
        return response.status(400).json({ body: 'Time must not be empty'});
    }

    if (Array.isArray(request.body.month.northern) && request.body.month.northern.length ) {
        return response.status(400).json({ body: 'Month must not be empty'});
    }

}