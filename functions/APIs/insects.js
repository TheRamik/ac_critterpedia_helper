// insects.js

const { db } = require('../util/admin');
const { timeToString,
        monthsToString } = require('./toString');

exports.getAllInsects = (request, response) => {
    db
        .collection('insects')
        .orderBy('insectId')
        .get()
        .then((data) => {
            let insects = [];
            data.forEach((doc) => {
                insects.push({
                    docId: doc.id,
                    insectId: doc.data().insectId,
                    name: doc.data().name,
                    location: doc.data().location,
                    value: doc.data().value,
                    time: timeToString(doc.data().time),
                    month: monthsToString(doc.data().month),
                    rare: doc.data().rare,
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

    if ((!Array.isArray(request.body.month.northern)) || (request.body.month.northern.length === 0) || 
        (!Array.isArray(request.body.month.southern)) || (request.body.month.southern.length === 0)) {
        return response.status(400).json({ body: 'Month must not be empty'});
    }

    const newInsectItem = {
        insectId: request.body.insectId,
        name: request.body.name,
        location: request.body.location,
        value: request.body.value,
        time: request.body.time,
        month: request.body.month,
        rare: request.body.rare,
    }
    db
        .collection('insects')
        .add(newInsectItem)
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

exports.deleteInsect = (request, response) => {
    console.log("docId: " + request.params.docId);
    const document = db.collection('insects').doc(`${request.params.docId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({error: 'Insect not found'});
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successful' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({error: err.code});
        });
};

exports.editInsect = (request, response) => {
    if (request.body.docId) {
        request.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('insects').doc(`${request.params.docId}`);
    document.update(request.body)
    .then(() => {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
}