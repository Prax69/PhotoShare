import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }], 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
});

const User = mongoose.model("User", userSchema);

export default User;
