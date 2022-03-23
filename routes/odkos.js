const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getOdko,
  getOdkos,
  createOdko,
  deleteOdko,
  updateOdko,
  uploadOdkoPhoto,
} = require("../controller/odko");

const router = express.Router();

//"/api/v1/Odkos"
router
  .route("/")
  .get(getOdkos)
  .post(protect, authorize("admin", "operator"), createOdko);

router
  .route("/:id")
  .get(getOdko)
  .delete(protect, authorize("admin", "operator"), deleteOdko)
  .put(protect, authorize("admin", "operator"), updateOdko);

router.route("/:id/upload-photo").put(uploadOdkoPhoto);

module.exports = router;
