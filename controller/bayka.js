const Bayka = require("../models/Bayka");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getBaykas = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Bayka);

  const baykas = await Bayka.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: baykas.length,
    data: baykas,
    pagination,
  });
});

exports.getUserBaykas = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getBaykas(req, res, next);
});

exports.getBayka = asyncHandler(async (req, res, next) => {
  const bayka = await Bayka.findById(req.params.id);

  if (!bayka) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (bayka.count == null) {
    // default data
    const beginCount = new Bayka({
      count: 1,
    });
    beginCount.save();
  } else {
    bayka.count += 1;
    bayka.save();
  }

  res.status(200).json({
    success: true,
    data: bayka,
  });
});

exports.createBayka = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const bayka = await Bayka.create(req.body);

  res.status(200).json({
    success: true,
    data: bayka,
  });
});

exports.deleteBayka = asyncHandler(async (req, res, next) => {
  const bayka = await Bayka.findById(req.params.id);

  if (!bayka) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (bayka.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  bayka.remove();

  res.status(200).json({
    success: true,
    data: bayka,
    whoDeleted: user.name,
  });
});

exports.updateBayka = asyncHandler(async (req, res, next) => {
  const bayka = await Bayka.findById(req.params.id);

  if (!bayka) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (bayka.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    bayka[attr] = req.body[attr];
  }

  bayka.save();

  res.status(200).json({
    success: true,
    data: bayka,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadBaykaPhoto = asyncHandler(async (req, res, next) => {
  const bayka = await Bayka.findById(req.params.id);

  if (!bayka) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээ.", 400);
  }

  // image upload

  const file = req.files.file;

  if (!file.mimetype.startsWith("image")) {
    throw new MyError("Та зураг upload хийнэ үү.", 400);
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    throw new MyError("Таны зурагны хэмжээ хэтэрсэн байна.", 400);
  }

  file.name = `bayka__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    bayka.photo = file.name;
    bayka.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
