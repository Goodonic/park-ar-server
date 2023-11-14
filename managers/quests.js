const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = require("../config/initDb")

router.get('/parks/:name/Quests/:ind', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    let ind = url[4];
    db.ref(`parks/${name}/Quests/${ind}`).on('value',
        (snapShot)=>{
            console.log(snapShot.val());
            res.json(snapShot.val())

        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})
router.get('/parks/:name/Quests/', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    db.ref(`parks/${name}/Quests/`).once('value',
        (snapShot)=>{
            //console.log(snapShot.val());
            res.json(snapShot.val())
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})
router.delete('/parks/:name/Quests/:ind', (req, res) => {
    let url = decodeURI(req.url);
    url = url.split('/');
    let name = url[2];
    let ind = url[4];
    // console.log("success\n", decodeURI(req.url), req.url)
    console.log(ind)
    db.ref(`parks/${name}/Quests/`).orderByChild("TaskName").equalTo(ind).on("value",
        (snapShot) => {
            try {
                snapShot.forEach((data) => {

                    console.log(data.key)
                    db.ref(`parks/${name}/Quests/${data.key}`).set(null, function (error) {
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

            }
            catch (err){
                console.log("Все упало, мы все упали" + err)
            }
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })



})


router.post('/:parkName', (req, res) => {
    console.log("рабоает")
    let url = req.url.split('/');
    let name = url[1];
    let newQuest;
    newQuest = {
        Coast: Number(req.body.Coast) ,
        Code: req.body.Code,
        Description: req.body.Description,
        IsStandartQuest: req.body.IsStandartQuest,
        TaskName: req.body.TaskName,
    };
    db.ref(`parks/${name}/Quests/`).once('value',
        (snapShot)=>{
            //console.log(snapShot.val());
            let ind = Object.keys(snapShot.val()).length

            console.log("Ща будет записть\n", newQuest);
            try {
                db.ref(`parks/${name}/Quests/${ind}`).set(newQuest, function (error) {
                    if (error) {
                        return res.sendStatus(404)
                        // The write failed...
                        console.log("Failed with error: " + error)
                    } else {
                        return res.sendStatus(200)
                        // The write was successful...
                        console.log("success\n", newQuest.TaskName)
                    }
                })
            }
            catch (err){
                if (err) {
                    return res.sendStatus(404)
                    // The write failed...
                    console.log("Failed with error: " + error)
                }
            }
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })

       //console.log(err)}

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