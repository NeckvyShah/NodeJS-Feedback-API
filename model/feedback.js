const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

feedbackSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "-__v -password -email",
  });
  next();
});

const Feedback = mongoose.model("feedback", feedbackSchema);
module.exports = Feedback;
