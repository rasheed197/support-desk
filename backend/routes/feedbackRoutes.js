const express = require("express");
const router = express.Router();
const {
  createFeedback, getFeedbacks,
  getFeedback,
  deleteFeedback,
  updateFeedback,
} = require("../controllers/feedbackController");

router.route("/").get(getFeedbacks).post(createFeedback);
router.route('/:id').get(getFeedback).delete(deleteFeedback).put(updateFeedback)

module.exports = router;
