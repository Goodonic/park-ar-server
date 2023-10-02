const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = require("../config/initDb")

// Получение всех вхождений парка
router.get("/joins/:name", (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    db.ref(`joins/${name}`).once('value',
        (snapShot)=>{
            console.log(snapShot.val());
            res.json(snapShot.val())
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})


module.exports = router;