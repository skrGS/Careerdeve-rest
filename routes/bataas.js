const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getBataa,
  getBataas,
  createBataa,
  deleteBataa,
  updateBataa,
  uploadBataaPhoto,
} = require("../controller/bataa");

const router = express.Router();

//"/api/v1/Bataas"
router
  .route("/")
  .get(getBataas)
  .post(protect, authorize("admin", "operator"), createBataa);

router
  .route("/:id")
  .get(getBataa)
  .delete(protect, authorize("admin", "operator"), deleteBataa)
  .put(protect, authorize("admin", "operator"), updateBataa);

router.route("/:id/upload-photo").put(uploadBataaPhoto);

module.exports = router;
