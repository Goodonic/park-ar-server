const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/db")
const app = express();
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const passport =require("passport");
const account = require("./routs/account");
const session = require("express-session")

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.db
});

const db = admin.database();

module.exports = db;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use(session({ secret: config.secretKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize())
app.use(passport.session())
require("./config/passport")(passport);
const port = 3000;

app.listen(port, () => {
    console.log("Сервер запущен на порту: " + port);
})



const testObject =
    {
        mainLohName: "Илья",
        mainLohLastName: "Орехов"
    };
const testObject2 =
    {
        mainLohName: "Никита",
        mainLohLastName: "Орехов"
    };


// Получеие и удаление квестов
app.use('/account', account);

app.get('/parks/:name/Quests/:ind', (req, res) => {
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
app.get('/parks/:name/Quests/', (req, res) => {
    let url = req.url.split('/');
    let name = url[2];
    db.ref(`parks/${name}/Quests/`).once('value',
        (snapShot)=>{
            console.log(snapShot.val());
            res.json(snapShot.val())
        },
        (errorObject) => {
            console.log('The read failed: ' + errorObject.name);
        })
})
app.delete('/parks/:name/Quests/:ind', (req, res) => {
    let url = decodeURI(req.url);
    url = url.split('/');
    let name = url[2];
    let ind = url[4];
   // console.log("success\n", decodeURI(req.url), req.url)
    db.ref(`parks/${name}/Quests/${ind}`).set(null, function (error) {
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

app.post('/:parkName', (req, res) => {
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
    console.log("Ща будет записть\n", newQuest);
    db.ref(`parks/${name}/Quests/`).update({[newQuest.TaskName]: newQuest})

    //db.ref(`parks/${name}/Quests/`).push(newQuest)

});

app.get("/tests/test", (req, res) =>{
    db.ref(`parks/Misovo/Admins`).on('value', (snapshot) => {
        console.log(snapshot.val()[0]);
    }, (errorObject) => {
        console.log('The read failed: ' + errorObject.name);
    });
})

