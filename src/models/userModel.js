import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Done? I guess
const userSchema = new Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    kelamin: {
      type: Boolean,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userImg: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("user", userSchema);
