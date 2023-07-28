const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedbacks,
  getFeedback,
  deleteFeedback,
  deleteAllFeedback,
  UpdateFeedback,
} = require("../controllers/feedbackController");

// router.post("/createFeedback", createFeedback);
// router.get("/getAllFeedbacks", getAllFeedbacks);
// router.get("/getFeedback/:id", getFeedback);

router
  .route("/")
  .get(getAllFeedbacks)
  .post(createFeedback)
  .delete(deleteAllFeedback);

router
  .route("/:id")
  .get(getFeedback)
  .patch(UpdateFeedback)
  .delete(deleteFeedback);

module.exports = router;
