const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");
const config = require("./db");
const express = require("express");




var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = function (passport) {
    const db = admin.database();
    var opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = 'secret';
    opts.issuer = 'accounts.examplesoft.com';
    opts.audience = 'yoursite.net';
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        db.ref(`parks/${jwt_payload.sub}`).on('value', (snapshot) => {
            if (snapshot.val() != null) {
                return done(null, snapshot.val())
            } else return done(null, false)

        }, (errorObject) => {
            return done(err, false);
        });
    }));
}









/*import * as jwt from 'jsonwebtoken'
const config = require("./db")

module.exports = function generateToken(park) {

    const data = {
        name: park.name,
    };
    const signature = config.secretKey;
    const expiration = '6h';

    return jwt.sign({data,}, signature, {expiresIn: expiration});

}*/