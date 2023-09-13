const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = require("../config/initDb")

router.get('/parks/:name/ModelPark/:ind', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    let ind = url[4];
    db.ref(`parks/${name}/ModelPark/${ind}`).on('value',
        (snapShot)=>{
            console.log(snapShot.val());
            res.json(snapShot.val())

        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})
router.get('/parks/:name/ModelPark/', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    db.ref(`parks/${name}/ModelPark/`).once('value',
        (snapShot)=>{
            console.log(snapShot.val());
            res.json(snapShot.val())
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})
router.delete('/parks/:name/ModelPark/:ind', (req, res) => {
    let url = decodeURI(req.url);
    url = url.split('/');
    let name = url[2];
    let ind = url[4];
    // console.log("success\n", decodeURI(req.url), req.url)
    db.ref(`parks/${name}/ModelPark/${ind}/Event/Title`).set("", function (error) {
        if (error) {
            r
            // The write failed...
            console.log("Failed with error: " + error)
        } else {

            // The write was successful...
            //console.log("success\n", ind)
        }
    })
    db.ref(`parks/${name}/ModelPark/${ind}/Event/Date`).set("", function (error) {
        if (error) {

            // The write failed...
            console.log("Failed with error: " + error)
        } else {

            // The write was successful...
            //console.log("success\n", ind)
        }
    })

    db.ref(`parks/${name}/ModelPark/${ind}/Event/Description`).set("", function (error) {
        if (error) {
            res.sendStatus(404)
            // The write failed...
            console.log("Failed with error: " + error)
        } else {
            res.sendStatus(204)
            // The write was successful...
            //console.log("success\n", ind)
        }
    })
})

router.post('/:parkName', (req, res) => {
    console.log("рабоает")
    let url = req.url.split('/');
    let name = url[1];
    let ind = req.body.Ind;
    let newEvent;

    newEvent = {
        Date: req.body.Date,
        Description: req.body.Description,
        Title: req.body.Title,
        Lat: req.body.Lat,
        Long: req.body.Long,
    };
    console.log("Ща будет записть\n", newEvent);
    db.ref(`parks/${name}/ModelPark/${ind}`).update({
        "Event/Date": newEvent.Date,
        "Event/Title": newEvent.Title,
        "Event/Description": newEvent.Description,
        "Location/Latitude": newEvent.Lat,
        "Location/Longitude": newEvent.Long,
    })

    //db.ref(`parks/${name}/Quests/`).push(newQuest)

});

router.get("/tests/test", (req, res) =>{
    db.ref(`parks/Misovo/Admins`).on('value', (snapshot) => {
        console.log(snapshot.val()[0]);
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
})

module.exports = router;