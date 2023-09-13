const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = require("../config/initDb")

router.get('/parks/:name/ModelPark/:ind', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    let ind = url[4];
    db.ref(`parks/${name}/ModelPark/${ind}`).once('value',
        (snapShot)=>{
            //console.log(snapShot.val());
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
    db.ref(`parks/${name}/ModelPark/${ind}`).update({
        "ID": '',
        "Event/Date": '',
        "Event/Description": '',
        "Event/IsExit": '',
        "Event/Title": '',
        "Location/Latitude": '',
        "Location/Longitude": '',

    })



})

router.post('/:parkName', (req, res) => {
    console.log("рабоает")
    let url = req.url.split('/');
    let name = url[1];
    let ind = req.body.Ind;
    let newObj;

    newObj = {
        Lat: req.body.Lat,
        Long: req.body.Long,
        Ind: req.body.Ind,
        objInd: req.body.objInd,

    };
    console.log("Ща будет записть\n", newObj);
    db.ref(`parks/${name}/ModelPark/${newObj.objInd}`).update({
        "ID": newObj.Ind,
        "Location/Latitude": newObj.Lat,
        "Location/Longitude": newObj.Long,
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