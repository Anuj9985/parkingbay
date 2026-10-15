const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { BadRequestError } = require('../utils/errors');
const appConfig = require('../config/app.config');

const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (appConfig.upload.allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new BadRequestError(`Unsupported file format. Allowed: ${appConfig.upload.allowedMimes.join(', ')}`), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: appConfig.upload.maxFileSize },
  fileFilter
});

module.exports = upload;
