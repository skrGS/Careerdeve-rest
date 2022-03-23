const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getTop,
  getTops,
  createTop,
  deleteTop,
  updateTop,
  uploadTopPhoto,
} = require("../controller/top");

const router = express.Router();

//"/api/v1/Tops"
router
  .route("/")
  .get(getTops)
  .post(protect, authorize("admin", "operator"), createTop);

router
  .route("/:id")
  .get(getTop)
  .delete(protect, authorize("admin", "operator"), deleteTop)
  .put(protect, authorize("admin", "operator"), updateTop);

router.route("/:id/upload-photo").put(uploadTopPhoto);

module.exports = router;
