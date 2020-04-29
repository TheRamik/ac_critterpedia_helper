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
                    month: doc.data().month, //monthsToString(doc.data().month),
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
    if (request.body.insectId.toString() === '') {
        return response.status(400).json({ body: 'insectId must not be empty'});
    }
    if (request.body.name.trim() === '') {
        return response.status(400).json({ body: 'Name must not be empty'});
    }

    if (!Array.isArray(request.body.time) || (request.body.time.length === 0) ) {
        return response.status(400).json({ body: 'Time must not be empty'});
    }

    console.log("northern is array: " + !Array.isArray(request.body.month.northern));
    console.log("length of northern array: " + (request.body.month.northern.length === 0));
    if ((!Array.isArray(request.body.month.northern)) || (request.body.month.northern.length === 0) || 
        (!Array.isArray(request.body.month.southern)) || (request.body.month.southern.length === 0)) {
        return response.status(400).json({ body: 'Month must not be empty'});
    }

    const newInsectItem = {
        name: request.body.name,
        location: request.body.location,
        value: request.body.value,
        time: request.body.time,
        month: request.body.month,
    }
    db
        .collection('insects')
        .doc(request.body.insectId.toString())
        .set(newInsectItem)
        .then((doc) => {
            const responseInsectItem = newInsectItem;
            responseInsectItem.id = doc.id;
            return response.json(responseInsectItem);
        })
        .catch((err) => {
            response.status(500).json({error: 'Something went wrong'});
            console.error(err);
        })

}