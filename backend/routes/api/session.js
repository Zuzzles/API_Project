// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//Login

router.post("/" async (req, res, next) => {
    const { credential, password } = req.body;  // Destructure credential and password from the request body

    const user = await.unscoped().findOne({ // Query the database for a user with the given credential
        where:{
            [Op.or]: {
                username: credential,
                email: credential,
            },
        }
    });
    // If no user is found, return an error
    if(!user || !bcrypt.compareSync( password, user.hashedPassword.toString())) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = { credential: "The provided credentials were invalid."};
        return next(err);
    }
    // If a user is found, call the setTokenCookie function and return the user
    const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie
    return res.json({ user: safeUser });
});

module.exports
