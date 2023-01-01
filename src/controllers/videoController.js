import video from "../models/videoModel.js";
import user from "../models/userModel.js";
import {
  authenticateGoogle,
  uploadToGoogleDrive,
} from "../services/googleDriveServices.js";
import fs from "fs";

// done
export const getAllVideo = (req, res, next) => {
  video
    .find()
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data semua Video berhasil diambil!",
        data: resp,
      });
    })
    .catch((err) => {
      const error = new Error("Data semua video gagal diambil!");
      error.data = err;
      error.status = 500;
      next(error);
    });
};

const deleteFile = (filePath) => {
  fs.unlink(filePath, () => {
    console.log("file deleted");
  });
};

export const uploadToDatabase = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const auth = authenticateGoogle();
    const response = await uploadToGoogleDrive(req.file, auth);
    deleteFile(req.file.path);
    res.status(200).json({ response });
  } catch (err) {
    console.log(err);
  }
};

export const createVideo = (req, res, next) => {
  let judul = req.body.judul;
  let urlVideoID = req.body.urlVideoID;
  let uploaderID = req.body.uploaderID;
  let deskripsi = req.body.deskripsi;
  user
    .findById(uploaderID)
    .then((user) => {
      video
        .create({
          judul: judul,
          urlVideoID: urlVideoID,
          uploader: user.nama,
          uploaderID: user._id,
          deskripsi: deskripsi,
        })
        .then((resp) => {
          res.status(200).json({
            url: `${req.originalUrl}`,
            message: "Data Video berhasil dibuat!",
            data: resp,
          });
        })
        .catch((err) => {
          const error = new Error(
            "data video gagal dibuat?, hmmm gatau dah error dimana"
          );
          error.data = err;
          error.status = 400;
          next(error);
        });
    })
    .catch((err) => {
      const error = new Error("data video gagal dibuat, usernya gaada");
      error.data = err;
      error.status = 400;
      next(error);
    });
};

export const getVideos = (req, res, next) => {
  const name = { $regex: req.params.name, $options: "i" };
  video
    .find({ judul: name })
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data Video berhasil diambil!",
        data: resp,
      });
    })
    .catch((err) => {
      const error = new Error("Data video gagal diambil!");
      error.data = err;
      error.status = 400;
      next(error);
    });
};

export const getNewest = (req, res, next) => {
  video
    .find({})
    .sort("-createdAt")
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data Video berhasil diambil!",
        data: resp,
      });
    })
    .catch((err) => {
      const error = new Error("Data video gagal diambil!");
      error.data = err;
      error.status = 400;
      next(error);
    });
};

export const getOneVideo = (req, res, next) => {
  const id = req.params.id;
  video
    .findById(id)
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data Video berhasil diambil!",
        data: resp,
      });
    })
    .catch((err) => {
      const error = new Error("Data video gagal diambil!");
      error.data = err;
      error.status = 400;
      next(error);
    });
};

export const deleteOneVideo = (req, res, next) => {
  const id = req.params.id;
  video
    .findByIdAndDelete(id)
    .then((resp) => {
      !resp
        ? res.status(200).json({
            url: `${req.originalUrl}`,
            message: "Data Video tidak ditemukan!",
            data: resp,
          })
        : res.status(404).json({
            url: `${req.originalUrl}`,
            message: "Data Video berhasil dihapus!",
            data: resp,
          });
    })
    .catch((err) => {
      const error = new Error("Data video gagal diambil!");
      error.data = err;
      error.status = 400;
      next(error);
    });
};
