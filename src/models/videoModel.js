import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Done
const videoSchema = new Schema(
  {
    judul: {
      type: String,
      required: true,
    },
    urlVideoID: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
      required: true,
    },
    uploaderID: {
      type: String,
      required: true,
    },
    deskripsi: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("video", videoSchema);
