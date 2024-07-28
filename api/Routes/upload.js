const multer = require("multer");
const path = require("path");
const express = require("express");
app.use(express.static("uploads"));
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads"); // Set your upload directory
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}.jpg`);
    // cb(null, new Date().toISOString() + file.originalname); // Create a unique filename
  },
});

//file filter

const fileFilter = (req, res, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Create Multer instance
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
