const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');

const router = express.Router();

// Routes Here

//Validation
const validateNewBooking = [
    check ("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Start Date is required"),
    check ("endDate")
    .exists({ checkFalsy: true })
    .withMessage("End Date is required"),
    handleValidationErrors
];

// Get all current user's bookings
router.get("/bookings/current", async (req, res, next) => {
   const { user } = req;
   if (user) {
// Bookings for a spot
router.get("spots/:spotId/bookings", async (req, res, next) => {
       const bookingsInfo = await Booking.findAll({
           where: {
               userId: user.id
           }
       });
       return res.json({ Bookings: bookingsInfo });

}
});
/*
// Get all bookings for a spot
router.get("/spots/:spotId/bookings", async (req, res, next) => {
    const spotId = req.params.spotId;
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
        if(!bookings.length) {
            return res.json({ message: "Spot couldn't be found" }); // no booking could be found
        }
    });
    return res.json({ Bookings: bookings });
});*/

// Create a booking
router.post("/spots/:spotId/bookings", validateNewBooking, async (req, res, next) => {
    const { user } = req;
    const spotId = req.params.spotId;
    const { startDate, endDate } = req.body;
    const newBooking = await Booking.create({
        userId: user.id,
        spotId,
        startDate,
        endDate
    });
    res.statusCode = 201
    return res.json(newBooking);
});
/*
//Edit a booking
router.put("/bookings/:bookingId", async (req, res, next) => {
    const { user } = req;
    const bookingId = req.params.bookingId;
    const bookingInfo = await Booking.findByPk(bookingId);
    if (bookingInfo) {
        if (user.id === bookingInfo.userId) {
            const { startDate, endDate } = req.body;
            await bookingInfo.update({ startDate, endDate });
            return res.json(bookingInfo);
        } else if (bookingInfo.startDate < new Date()) {
            res.statusCode = 403;
            return res.json({ message: "Past bookings can't be modified" });
        }
        else if (user.id !== bookingInfo.userId) {
            res.statusCode = 403;
            return res.json({ message:
                " Sorry, this sopt is already booked for the specified dates" });
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existingbooking."
            }
        }
    } else {
        res.statusCode = 404;
        return res.json({ message: "Booking couldn't be found" });
    }
}
*/
//Delete a booking
router.delete("/bookings/:bookingId", async (req, res, next) => {

const {user} = req;
const bookingId = req.params.bookingId;
const bookingInfo = await Booking.findByPk(bookingId);

    if (bookingInfo) {
        await bookingInfo.destroy();
        return res.json({ message: "Booking deleted" });
    } else {
        res.statusCode = 404;
        return res.json({ message: "Booking not found" });
    }
    else if (bookingInfo.startDate < new Date()) {
        res.statusCode = 403;
        return res.json({ message: "Bookings that have started can't be deleted" });

    }
});
/*
// Get all bookings
router.get("/bookings/current", validateNewBooking, async (req, res, next) => {
    const bookings = await Booking.findAll();
    return res.json({ Bookings: bookings });
});*/

module.exports = router;
