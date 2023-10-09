const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const config = require("../config/db");
const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const db = require("../config/initDb")

function getParkByName(name, callback)  {
    try {
        db.ref(`parks/${name}`).once('value', (snapshot) => {
            if(snapshot.val()!=null){
                console.log("снапшот отправлен")
                return callback(snapshot.val())
            }

            else {
                console.log(snapshot.val(), name)
                return callback(snapshot.val())
            }
        });
    }
    catch (err){
        console.log(err)
    }
}

// function getParkPassword(parkName){
//     const db = admin.database();
//     console.log(parkName)
//
//     return db.ref(`parks/Misovo/Admins`).once('value', async (snapshot) => {
//         const parkPassword = snapshot.val()[0]
//         //console.log(Promise.all(parkPassword) );
//
//         return parkPassword
//     });
// }
function comparePass(password, parkPassword, callback){
    try {
        if(password == parkPassword)
            callback(true)
        else return callback(false)
    }
    catch (err){
        console.log(err)
    }
}

router.post('/auth', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    //console.log(getParkPassword("Misovo"))
    //console.log("I am work", login, password, getParkPassword(login))
    try {
        getParkByName(login, (user)=>{
            if (!user) {
                console.log(user)
                return res.json({success: false, msg: "Пользователь не найден"})
            }
            else {
                console.log(user, "Йенто логин")
                comparePass(password, user.Admins[0], (isMatch)=>{
                    if(isMatch){
                        const token = "JWT"+jwt.sign(user, config.secretKey, {expiresIn: 3600*24*30})
                        console.log(user.Title)
                        // res.json({success: true, token: "JWT"+token, name: user.Title})
                        return res.json({success:true, token: token, name: user.Title})
                    }
                    else return res.json({success: false, msg: "Неверный пароль"})
                })
            }
        })
    }
    catch (err){
        console.log("A Все упало, мы все упали" + err)
        return res.sendStatus(404)
    }

})
// router.get("/admin", passport.authenticate("jwt", {sassion: false}), (req, res) =>{
//
// })

module.exports = router;