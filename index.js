const express = require('express');
const bodyParser = require("body-parser");
const cores = require("cores")
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://park-ar-testdb-default-rtdb.europe-west1.firebasedatabase.app"
});




const db = admin.database();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json())
const port = 3000;

app.listen(port, () => {
    console.log("Сервер запущен на порту: " + port);
})





