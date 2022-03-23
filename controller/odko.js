const Odko = require("../models/Odko");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getOdkos = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Odko);

  const odkos = await Odko.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: odkos.length,
    data: odkos,
    pagination,
  });
});

exports.getUserOdkos = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getOdkos(req, res, next);
});

exports.getOdko = asyncHandler(async (req, res, next) => {
  const odko = await Odko.findById(req.params.id);

  if (!odko) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (odko.count == null) {
    // default data
    const beginCount = new odko({
      count: 1,
    });
    beginCount.save();
  } else {
    odko.count += 1;
    odko.save();
  }

  res.status(200).json({
    success: true,
    data: odko,
  });
});

exports.createOdko = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const odko = await Odko.create(req.body);

  res.status(200).json({
    success: true,
    data: odko,
  });
});

exports.deleteOdko = asyncHandler(async (req, res, next) => {
  const odko = await Odko.findById(req.params.id);

  if (!odko) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (odko.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  odko.remove();

  res.status(200).json({
    success: true,
    data: odko,
    whoDeleted: user.name,
  });
});

exports.updateOdko = asyncHandler(async (req, res, next) => {
  const odko = await Odko.findById(req.params.id);

  if (!odko) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (odko.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    odko[attr] = req.body[attr];
  }

  odko.save();

  res.status(200).json({
    success: true,
    data: odko,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadOdkoPhoto = asyncHandler(async (req, res, next) => {
  const odko = await Odko.findById(req.params.id);

  if (!odko) {
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

  file.name = `odko__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    odko.photo = file.name;
    odko.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
