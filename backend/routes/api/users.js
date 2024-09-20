// backend/routes/api/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

//Sign Up

router.post("/", async (req, res) => {
    const { email, password, username } = req.body;         // Destructure email, password, and username from the request body
    const hashedPassword = bcrypt.hashSync(password);       // Hash the password

    const user = await User.create({                        // Create a new user in the database
        username,
        email,
        hashedPassword,
    });

    const safeUser = {                                      // Create a safe user object
        id: user.id,
        email: user.email,
        username: user.username,
    };

    await setTokenCookie(res, user);                        // Call the setTokenCookie function

    return res.json({                                       // Return the user
        user: safeUser
    });
});

module.exports = router;
