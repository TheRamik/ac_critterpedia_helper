// insects.js

const { db } = require('../util/admin');
const { timeToString,
        monthsToString,
        shadowToString,
} = require('./toString');
const { uploadImage } = require('./images');

exports.getAllFishes = (request, response) => {
    db
        .collection('fishes')
        .orderBy('fishId')
        .get()
        .then((data) => {
            let fishes = [];
            data.forEach((doc) => {
                fishes.push({
                    docId: doc.id,
                    fishId: doc.data().fishId,
                    name: doc.data().name,
                    location: doc.data().location,
                    shadow: shadowToString(doc.data().shadow),
                    value: doc.data().value,
                    time: timeToString(doc.data().time),
                    month: monthsToString(doc.data().month),
                    rare: doc.data().rare,
                });
            });
            return response.json(fishes);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({error: err.code});
        });
};

exports.getActiveFishes = (request, response) => {
    console.log("Currently Not Available... Not yet implemented");
    return response.status(400).json({ body: 'Currently Not Available'});
}

exports.postOneFish = (request, response) => {
    if (request.body.fishId.toString() === '') {
        return response.status(400).json({ body: 'fishId must not be empty'});
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

    const newFishItem = {
        fishId: request.body.fishId,
        name: request.body.name,
        location: request.body.location,
        shadow: request.body.shadow,
        value: request.body.value,
        time: request.body.time,
        month: request.body.month,
        rare: request.body.rare,
    }
    db
        .collection('fishes')
        .add(newFishItem)
        .then((doc) => {
            const responseFishItem = newFishItem;
            responseFishItem.id = doc.id;
            return response.json(responseFishItem);
        })
        .catch((err) => {
            response.status(500).json({error: 'Something went wrong'});
            console.error(err);
        })
}

exports.deleteFish = (request, response) => {
    console.log("docId: " + request.params.docId);
    const document = db.collection('fishes').doc(`${request.params.docId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({error: 'Fish not found'});
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

exports.editFish = (request, response) => {
    if (request.body.docId) {
        request.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('fishes').doc(`${request.params.docId}`);
    document.update(request.body)
    .then(() => {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({error: err.code});
    });
}

// Upload profile picture
exports.uploadFishPhoto = (request, response) => {
    let document = db.collection('fishes').doc(`${request.params.docId}`);
    document
        .get()
        .then((doc) => {
            var name = doc.data().name;
            uploadImage(request, response, "fishes", name, doc.id);
        })    
};