const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const fs = require('fs-extra');
const gcs = require('@google-cloud/storage')();

const path = require('path');
const os = require('os');

var json2csv = require('json2csv');

exports.createCSV = functions.firestore
    .document('reports/{reportId}')
    .onCreate(event => {

        const reportId = event.params.reportId;
        const fileName = `reports/${reportId}.csv`;
        const tempFilePath = path.join(os.tmpdir(), fileName);

        const db = admin.firestore();
        const reportRef = db.collection('reports').doc(reportId);

        const storage = gcs.bucket('friendslife-b3cda.appspot.com');

        return db.collection('selections')
            .get()
            .then(querySnapshot => {
                const selections = [];
                querySnapshot.forEach(doc => {
                    selections.push(doc.data());
                });

                return json2csv({ data: selections });
            }).then(csv => {
                return fs.outputFile(tempFilePath, csv);
            }).then(() => {
                return storage.upload(tempFilePath, { destination: fileName });
            }).then(file => {
                return reportRef.update({ status: 'complete' });
            }).catch(error => {
                console.error(error);
            })
    });