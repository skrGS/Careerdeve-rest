const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getAriunzaya,
  getAriunzayas,
  createAriunzaya,
  deleteAriunzaya,
  updateAriunzaya,
  uploadAriunzayaPhoto,
} = require("../controller/ariunzaya");

const router = express.Router();

//"/api/v1/Ariunzayas"
router
  .route("/")
  .get(getAriunzayas)
  .post(protect, authorize("admin", "operator"), createAriunzaya);

router
  .route("/:id")
  .get(getAriunzaya)
  .delete(protect, authorize("admin", "operator"), deleteAriunzaya)
  .put(protect, authorize("admin", "operator"), updateAriunzaya);

router.route("/:id/upload-photo").put(uploadAriunzayaPhoto);

module.exports = router;
