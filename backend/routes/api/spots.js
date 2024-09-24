const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');

const router = express.Router();

const validateNewSpot = [
    check('address').exists({ checkFalsy: true})
      .withMessage('Street address is required'),
    check('city').exists({ checkFalsy: true})
      .withMessage('City is required'),
    check('state').exists({ checkFalsy: true})
      .withMessage('State is required'),
    check('country').exists({ checkFalsy: true})
      .withMessage('Country is required'),
    check('lat').isFloat({ min: -90, max: 90 })
      .withMessage('Latitude must be within -90 and 90'),
    check('lng').isFloat({ min: -180, max: 180})
      .withMessage('Longitude must be within -180 and 180'),
    check('name').isLength({ max: 49 })
      .withMessage('Name must be less than 50 characters'),
    check('description').exists({ checkFalsy: true })
      .withMessage('Description is required'),
    check('price').isFloat({ min: 0.01 })  // Needs work
      .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];

// Create a new Spot
router.post("/", validateNewSpot, async (req, res, next) => {
    const { user } = req;
    if (user) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;
        const spot = await Spot.create({
            ownerId: user.id,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        });
        return res.json(spot);
    } else {
        res.statusCode = 401;
        return res.json({ message: "Authentication required"});
    }
});

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
});

// Get Spot by ID
router.get("/:spotId", async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId);
    const user = await User.findByPk(spot.ownerId);
    if (spot) {
        return res.json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.desription,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,

            Owner: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName
            }
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