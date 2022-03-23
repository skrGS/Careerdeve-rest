const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getBinance,
  getBinances,
  createBinance,
  deleteBinance,
  updateBinance,
  uploadBinancePhoto,
} = require("../controller/binance");

const router = express.Router();

//"/api/v1/Binances"
router
  .route("/")
  .get(getBinances)
  .post(protect, authorize("admin", "operator"), createBinance);

router
  .route("/:id")
  .get(getBinance)
  .delete(protect, authorize("admin", "operator"), deleteBinance)
  .put(protect, authorize("admin", "operator"), updateBinance);

router.route("/:id/upload-photo").put(uploadBinancePhoto);

module.exports = router;
