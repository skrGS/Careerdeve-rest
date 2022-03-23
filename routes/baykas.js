const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getBayka,
  getBaykas,
  createBayka,
  deleteBayka,
  updateBayka,
  uploadBaykaPhoto,
} = require("../controller/bayka");

const router = express.Router();

//"/api/v1/Baykas"
router
  .route("/")
  .get(getBaykas)
  .post(protect, authorize("admin", "operator"), createBayka);

router
  .route("/:id")
  .get(getBayka)
  .delete(protect, authorize("admin", "operator"), deleteBayka)
  .put(protect, authorize("admin", "operator"), updateBayka);

router.route("/:id/upload-photo").put(uploadBaykaPhoto);

module.exports = router;
