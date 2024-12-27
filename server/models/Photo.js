import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  filePath: {
    type: String, // Stores the file path of the uploaded image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likeCount: {
    type: Number,
    default: 0, // Tracks the total number of likes
  },  
});

export default mongoose.model("Photo", photoSchema);
