import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Done
const komentarSchema = new Schema(
  {
    videoID: {
      type: String,
      required: true,
    },
    uploaderID: {
      type: String,
      required: true,
    },
    uploader: {
      type: String,
      required: true,
    },
    komentar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("komentar", komentarSchema);
