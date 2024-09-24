const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const router = express.Router();

// Get all Spots from Current User
router.get("/current", async (req, res, next) => {
    const { user } = req;
    if (user) {
        const spots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        });
        return res.json({ Spots: spots });
    } else {
        res.statusCode = 401;
        return res.json({ message: "Authentication required"});
    }
})

// Get Spot by ID
router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    if (spot) {
        return res.json({
            spot,
            // Owner: {

            // }
        });
    } else {
        res.statusCode = 404;
        return res.json({ message: "Spot couldn't be found" })
    }
})

// Get all Spots
router.get("/", async (req, res, next) => {
    const spots = await Spot.findAll();
    return res.json({ Spots: spots });
})

module.exports = router;