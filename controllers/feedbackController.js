const mongoose = require("mongoose");

const Feedback = require("../model/feedback");
const error = require("../utils/appError");

const createFeedback = async (req, res, next) => {
  try {
    const { userId, message, category, rating, createdAt } = req.body;
    if (!userId || !message || !category || !rating) {
      return error(
        res,
        400,
        "userId or message or category or rating field is missing. Please rewrite and submit again!"
      );
    }
    const doc = await Feedback.create({
      userId,
      message,
      category,
      rating,
      createdAt,
    });
    return res.status(201).json({
      status: "Success",
      message: "Feedback stored successfully!",
      data: doc,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      fields = "",
      ...other
    } = req.query;

    const searchFields = JSON.stringify(other).replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    const doc = await Feedback.find(JSON.parse(searchFields))
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort.split(",").join(" "))
      .select(fields.split(",").join(" "));

    res.status(200).json({
      status: "success",
      Total_Feedback: doc.length,
      data: doc,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const getFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const doc = await Feedback.findById(feedbackId);
    if (!doc) {
      return error(res, 404, "Please provide a valid Feedback ID");
    }
    return res.status(400).json({
      status: "Success!",
      data: doc,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const deleteFeedback = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const doc = await Feedback.findByIdAndDelete(feedbackId);
    if (!doc) {
      return error(res, 404, "No Feedback found with that id");
    }
    return res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const deleteAllFeedback = async (req, res) => {
  try {
    const doc = await Feedback.deleteMany();
    if (!doc) {
      return error(res, 404, "No Feedback found");
    }
    return res.status(200).json({
      status: "Success",
      data: null,
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

const UpdateFeedback = async (req, res) => {
  try {
    const doc = await Feedback.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //return updated doc (because by default the update does not send the record so we need to pass additional parameter fr it)
      runValidators: true,
    });
    if (!doc) {
      return error(res, 404, "No Feedback found with that id");
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    return error(res, 500, err.message);
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getFeedback,
  deleteFeedback,
  deleteAllFeedback,
  UpdateFeedback,
};
