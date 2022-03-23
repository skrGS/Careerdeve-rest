const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getBolor,
  getBolors,
  createBolor,
  deleteBolor,
  updateBolor,
  uploadBolorPhoto,
} = require("../controller/bolor");

const router = express.Router();

//"/api/v1/Bolors"
router
  .route("/")
  .get(getBolors)
  .post(protect, authorize("admin", "operator"), createBolor);

router
  .route("/:id")
  .get(getBolor)
  .delete(protect, authorize("admin", "operator"), deleteBolor)
  .put(protect, authorize("admin", "operator"), updateBolor);

router.route("/:id/upload-photo").put(uploadBolorPhoto);

module.exports = router;
