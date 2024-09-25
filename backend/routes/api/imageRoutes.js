// backend/routes/api/imageRoutes.js
const router = require('express').Router();
const { SpotImage, Spot } = require('../models');


//Add image to a Spot
router.post("/spots/:spotId/images", async (req, res) => {
  const { url, preview } = req.body;
  const spotId = req.params.spotId;

  //Create the image
  const newImage = await SpotImage.create({
    url,
    preview,
    spotId: spot.id
  });

  // Return the created image
  return res.status(201).json({
    id: newImage.id,
    url: newImage.url,
    preview: newImage.preview
  });

});

module.exports =router;

//Get all images for a Spot
