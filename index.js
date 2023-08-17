const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config/db")
const app = express();
const passport =require("passport");
const account = require("./routs/account");
const quests = require("./managers/quests")
const events = require("./managers/events");
const session = require("express-session")
const db = require("./config/initDb")


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


app.use('/account', account);

// Получеие и удаление квестов
app.use('/quests', quests);
app.use('/events', events);



