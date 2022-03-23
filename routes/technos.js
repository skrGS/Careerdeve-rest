const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getTechno,
  getTechnos,
  createTechno,
  deleteTechno,
  updateTechno,
  uploadTechnoPhoto,
} = require("../controller/techno");

const router = express.Router();

//"/api/v1/Technos"
router
  .route("/")
  .get(getTechnos)
  .post(protect, authorize("admin", "operator"), createTechno);

router
  .route("/:id")
  .get(getTechno)
  .delete(protect, authorize("admin", "operator"), deleteTechno)
  .put(protect, authorize("admin", "operator"), updateTechno);

router.route("/:id/upload-photo").put(uploadTechnoPhoto);

module.exports = router;
