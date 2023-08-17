const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const config = require("./db");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.db
});

const db = admin.database();

module.exports = db