import user from "../models/userModel.js";

// Done
export const getAllUser = (req, res, next) => {
  user
    .find()
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data semua user berhasil diambil!",
        data: resp,
      });
    })
    .catch((err) => {
      console.log("Eh Error hehe...");
      console.log(err);
      next(err);
    });
};

// Done
export const createUser = (req, res, next) => {
  let nama = req.body.nama;
  let kelamin = req.body.kelamin;
  let email = req.body.email;
  let password = req.body.password;
  user
    .create({
      nama: nama,
      kelamin: kelamin,
      email: email,
      password: password,
    })
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data User berhasil dibuat!",
        data: resp,
      });
    })
    .catch((err) => {
      const error = new Error(
        "data user gagal dibuat?, hmmm gatau dah error dimana"
      );
      error.data = err;
      error.status = 404;
      next(error);
    });
};

// Done
export const loginUser = (req, res, next) => {
  user
    .findOne({ email: req.params.email })
    .then((user) => {
      console.log(user);
      req.params.pass === user.password
        ? res.status(200).json({
            url: `${req.originalUrl}`,
            message: "Data user berhasil ditemukan!",
            data: user,
          })
        : res.status(404).json({
            url: `${req.originalUrl}`,
            message: "Data user tidak ditemukan!",
            data: null,
          });
    })
    .catch((err) => {
      const error = new Error("kamu gaga login? hmm aneh...");
      error.data = err;
      error.status = 404;
      next(error);
    });
};

export const deleteUser = (req, res, next) => {
  user
    .findOneAndDelete({ _id: req.body.id, email: req.body.email })
    .then((resp) => {
      if (resp) {
        res.status(200).json({
          url: `${req.originalUrl}`,
          message: "Data user berhasil dihapus, babayy!",
          deletedData: resp,
        });
      } else {
        const error = new Error("Data user gagal dihapus, mungkin salah ID?");
        error.data = resp;
        error.status = 404;
        next(error);
      }
    })
    .catch((err) => {
      const error = new Error("Data user gagal dihapus!");
      error.data = err;
      error.status = 500;
      next(error);
    });
};

export const updateOneUser = (req, res, next) => {
  let id = req.params.id;
  let data = {
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password,
  };
  user
    .findByIdAndUpdate(id, data)
    .then((resp) => {
      res.status(200).json({
        url: `${req.originalUrl}`,
        message: "Data berhasil diupdate!",
        updateAt: data,
      });
    })
    .catch((err) => {
      const error = new Error("Data gagal diupdate!");
      error.data = err;
      error.status = 500;
      next(error);
    });
};
