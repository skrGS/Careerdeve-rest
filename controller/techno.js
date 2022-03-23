const Techno = require("../models/Techno");
const path = require("path");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");
const paginate = require("../utils/paginate");
const User = require("../models/User");

// api/v1/works
exports.getTechnos = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const sort = req.query.sort;
  const select = req.query.select;

  ["select", "sort", "page", "limit"].forEach((el) => delete req.query[el]);

  const pagination = await paginate(page, limit, Techno);

  const technos = await Techno.find(req.query, select)
    .populate({
      path: "category",

      select: "name ",
    })
    .sort(sort)
    .skip(pagination.start - 1)
    .limit(limit);

  res.status(200).json({
    success: true,
    count: technos.length,
    data: technos,
    pagination,
  });
});

exports.getUserTechnos = asyncHandler(async (req, res, next) => {
  req.query.createUser = req.userId;
  return this.getTechnos(req, res, next);
});

exports.getTechno = asyncHandler(async (req, res, next) => {
  const techno = await Techno.findById(req.params.id);

  if (!techno) {
    throw new MyError(req.params.id + " ID-тэй ажил байхгүй байна.", 404);
  }

  // Хандалт тоологч
  if (techno.count == null) {
    // default data
    const beginCount = new Techno({
      count: 1,
    });
    beginCount.save();
  } else {
    techno.count += 1;
    techno.save();
  }

  res.status(200).json({
    success: true,
    data: techno,
  });
});

exports.createTechno = asyncHandler(async (req, res, next) => {
  req.body.createUser = req.userId;

  const techno = await Techno.create(req.body);

  res.status(200).json({
    success: true,
    data: techno,
  });
});

exports.deleteTechno = asyncHandler(async (req, res, next) => {
  const techno = await Techno.findById(req.params.id);

  if (!techno) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүй байна.", 404);
  }

  if (techno.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  const user = await User.findById(req.userId);

  techno.remove();

  res.status(200).json({
    success: true,
    data: techno,
    whoDeleted: user.name,
  });
});

exports.updateTechno = asyncHandler(async (req, res, next) => {
  const techno = await Techno.findById(req.params.id);

  if (!techno) {
    throw new MyError(req.params.id + " ID-тэй ном байхгүйээээ.", 400);
  }

  if (techno.createUser.toString() !== req.userId && req.userRole !== "admin") {
    throw new MyError("Та зөвхөн өөрийнхөө номыг л засварлах эрхтэй", 403);
  }

  req.body.updateUser = req.userId;

  for (let attr in req.body) {
    techno[attr] = req.body[attr];
  }

  techno.save();

  res.status(200).json({
    success: true,
    data: techno,
  });
});

// PUT:  api/v1/works/:id/photo
exports.uploadTechnoPhoto = asyncHandler(async (req, res, next) => {
  const techno = await Techno.findById(req.params.id);

  if (!techno) {
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

  file.name = `techno__${req.params.id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, (err) => {
    if (err) {
      throw new MyError(
        "Файлыг хуулах явцад алдаа гарлаа. Алдаа : " + err.message,
        400
      );
    }

    techno.photo = file.name;
    techno.save();

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });
});
