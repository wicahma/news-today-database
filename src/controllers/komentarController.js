import komentar from "../models/komentarModel.js";
import user from "../models/userModel.js";

export const getAllKomentar = (req, res, next) => {
  komentar
    .find()
    .then((data) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data seluruh Kommentar berhasil dipanggil!",
        data: data,
      });
    })
    .catch((err) => {
      const error = new Error("Data Komentar gagal diambil");
      error.status = 404;
      error.data = err;
      next(error);
    });
};

export const getKomentarByVideo = (req, res, next) => {
  // const video = req.body.video;
  // video: video,
  const videoID = req.params.videoID;
  komentar
    .find({ videoID: videoID })
    .then((komentar) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: `Data Kommentar video berhasil dipanggil!`,
        data: komentar,
      });
    })
    .catch((err) => {
      const error = new Error("Data Komentar gagal diambil");
      error.status = 404;
      error.data = err;
      next(error);
    });
};

export const createKomentar = (req, res, next) => {
  const uploaderID = req.body.uploaderID;
  const videoID = req.body.videoID;
  const kommentar = req.body.komentar;
  user
    .findById(uploaderID)
    .then((user) => {
      komentar
        .create({
          videoID: videoID,
          uploaderID: uploaderID,
          uploader: user.nama,
          komentar: kommentar,
        })
        .then((resp) => {
          res.status(201).json({
            url: `${req.originalUrl}`,
            message: `Data Kommentar video berhasil dibuat!`,
            data: resp,
          });
        })  
        .catch((err) => {
          const error = new Error("Data Komentar gagal dibuat!");
          error.status = 400;
          error.data = err;
          next(error);
        });
    })
    .catch((err) => {
      const error = new Error("User tidak ada!");
      error.status = 404;
      error.data = err;
      next(error);
    });
};

export const deleteOneKomentar = (req, res, next) => {
  const komentarID = req.params.idKomentar;
  const userID = req.params.idUser;
  komentar
    .findOneAndDelete({ _id: komentarID, uploaderID: userID })
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data berhasil dihapus!",
        deletedData: resp,
      });
    })
    .catch((err) => {
      const error = new Error("Data Komentar gagal dihapus!");
      error.status = 404;
      error.data = err;
      next(error);
    });
};
