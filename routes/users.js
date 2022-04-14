const express = require("express");
const { protect, authorize } = require("../middleware/protect");

const {
  register,
  login,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  logout,
} = require("../controller/users");

const router = express.Router();

//"/api/v1/users"
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);


//"/api/v1/users"
router.route("/").get(getUsers).post(createUser);


router.use(protect);
router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(authorize("admin"), deleteUser);

module.exports = router;
