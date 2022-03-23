const Bataa = require("../models/Bataa");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getBataas = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Bataa);

  const bataas = await Bataa.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: bataas.length,
    data: bataas,
    pagination,
  });
});

exports.getUserBataas = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getBataas(req, res, next);
});

exports.getBataa = asyncHandler(async (req, res, next) => {
  const bataa = await Bataa.findById(req.params.id);

  if (!bataa) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (bataa.count == null) {
    // default data
    const beginCount = new Bataa({
      count: 1,
    });
    beginCount.save();
  } else {
    bataa.count += 1;
    bataa.save();
  }

  res.status(200).json({
    success: true,
    data: bataa,
  });
});

exports.createBataa = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const bataa = await Bataa.create(req.body);

  res.status(200).json({
    success: true,
    data: bataa,
  });
});

exports.deleteBataa = asyncHandler(async (req, res, next) => {
  const bataa = await Bataa.findById(req.params.id);

  if (!bataa) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (bataa.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  bataa.remove();

  res.status(200).json({
    success: true,
    data: bataa,
    whoDeleted: user.name,
  });
});

exports.updateBataa = asyncHandler(async (req, res, next) => {
  const bataa = await Bataa.findById(req.params.id);

  if (!bataa) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (bataa.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    bataa[attr] = req.body[attr];
  }

  bataa.save();

  res.status(200).json({
    success: true,
    data: bataa,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadBataaPhoto = asyncHandler(async (req, res, next) => {
  const bataa = await Bataa.findById(req.params.id);

  if (!bataa) {
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

  file.name = `bataa__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    bataa.photo = file.name;
    bataa.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
