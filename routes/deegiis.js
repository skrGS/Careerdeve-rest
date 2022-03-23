const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getDeegii,
  getDeegiis,
  createDeegii,
  deleteDeegii,
  updateDeegii,
  uploadDeegiiPhoto,
} = require("../controller/deegii");

const router = express.Router();

//"/api/v1/Deegiis"
router
  .route("/")
  .get(getDeegiis)
  .post(protect, authorize("admin", "operator"), createDeegii);

router
  .route("/:id")
  .get(getDeegii)
  .delete(protect, authorize("admin", "operator"), deleteDeegii)
  .put(protect, authorize("admin", "operator"), updateDeegii);

router.route("/:id/upload-photo").put(uploadDeegiiPhoto);

module.exports = router;
