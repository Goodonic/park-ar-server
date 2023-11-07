require("dotenv").config();
const emailLogin = require("../config/emailLogin")
const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const imap = require("imap")
const db = require("../config/initDb")
const e = require("express");

router.post("/sendMail", (req, res)=>{
    console.log("work")

    mail = {
        Title: req.body.Title,
        Text: req.body.Text,

    };

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: emailLogin.hostMail,
            pass: emailLogin.password
        }
    })

    const mailOptions ={
        from: "orexovheketa@gmail.com",
        to: "orexovheketa@gmail.com",
        subject: mail.Title,
        text: mail.Text
    }

    transporter.sendMail(mailOptions, (err)=>{
        console.log(err)
        res.status(400)
    })
    res.status(200)
})

router.get("/getMail", (req, res)=>{
    var config = {
        imap: {
            user: emailLogin.hostMail,
            password: emailLogin.password,
            host: 'imap.yandex.ru',
            port: 993,
            tls: true,
            authTimeout: 3000
        }
    }
    imaps.connect(config).then(function (connection) {
        return connection.openBox('INBOX').then(function () {
            const searchCriteria = ['ALL'];
            const fetchOptions = {
                bodies: ['HEADER', 'TEXT'],
                markSeen: false
            };
            return connection.search(searchCriteria, fetchOptions).then(function (messages) {
                messages.forEach(function (item) {
                    const idHeader = "Imap-Id: " + item.attributes.uid + "\r\n";
                    simpleParser(idHeader, (err, mail) => {
                        console.log(mail)
                    });
                });

            });
        });
    });
})


module.exports = router;


