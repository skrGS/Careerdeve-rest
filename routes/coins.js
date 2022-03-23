const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  getCoin,
  getCoins,
  createCoin,
  deleteCoin,
  updateCoin,
  uploadCoinPhoto,
} = require("../controller/coin");

const router = express.Router();

//"/api/v1/Coins"
router
  .route("/")
  .get(getCoins)
  .post(protect, authorize("admin", "operator"), createCoin);

router
  .route("/:id")
  .get(getCoin)
  .delete(protect, authorize("admin", "operator"), deleteCoin)
  .put(protect, authorize("admin", "operator"), updateCoin);

router.route("/:id/upload-photo").put(uploadCoinPhoto);

module.exports = router;
