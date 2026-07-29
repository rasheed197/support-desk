const asyncHandler = require("express-async-handler");

const Feedback = require("../models/feedbackModel");

// @desc        Create new feedback
// @route       POST /api/feedbacks
// @access      Public
const createFeedback = asyncHandler(async (req, res) => {
  const { feedbackText, feedbackRating } = req.body;

  if (!feedbackRating) {
    res.status(400);
    throw new Error("Please select a rating");
  }

  const feedback = await Feedback.create({
    feedbackText,
    feedbackRating,
  });

  res.status(201).json(feedback);
});

// @desc        Get user feedback
// @route       GET /api/feedbacks
// @access      Public
const getFeedbacks = asyncHandler(async (req, res) => {
  const { sort = "-createdAt", page = 1, limit = 10 } = req.query;

  // Pagination
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);
  const skip = (pageInt - 1) * limitInt;

  const feedbacks = await Feedback.find().sort(sort).skip(skip).limit(limitInt);

  const total = await Feedback.countDocuments();

  res
    .status(200)
    .json({
      total,
      page: pageInt,
      totalPages: Math.ceil(total / limitInt),
      count: feedbacks.length,
      feedbacks,
    });
});

// @desc        Get feedback
// @route       GET /api/feedbacks/:id
// @access      Public
const getFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }

  res.status(200).json(feedback);
});

// @desc        Update feedback
// @route       PUT /api/feedbacks/:id
// @access      Public
const updateFeedback = asyncHandler(async (req, res) => {
    console.log(req.params)
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }

  const updatedFeedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
  );

  res.status(200).json(updatedFeedback);
});

// @desc        Delite feedbacks
// @route       DELETE /api/feedbacks/:id
// @access      Public
const deleteFeedback = asyncHandler(async (req, res) => {
  const feedback = await Feedback.findById(req.params.id);

  if (!feedback) {
    res.status(404);
    throw new Error("Feedback not found");
  }

  //   await feedback.remove();
  await Feedback.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true });
});

module.exports = {
  createFeedback,
  getFeedbacks,
  getFeedback,
  updateFeedback,
  deleteFeedback,
};
