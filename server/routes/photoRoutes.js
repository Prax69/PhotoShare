import express from "express";
import {
  getPhotos,
  deletePhoto,
  photosHealth,
  handleLikePhoto,
  getUsersPhotos,
} from "../controllers/photoController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import Photo from "../models/Photo.js";

const router = express.Router();

router.get("/health",photosHealth);

// router.post("/upload", protect, uploadPhoto);

router.post(
  "/upload",
  protect,
  upload.single("photo"),
  async (req, res) => {
    try {
      const newPhoto = new Photo({
        user: req.user._id, // User from the `protect` middleware
        filePath: req.file.path, // Path of the uploaded file
      });
      await newPhoto.save();
      res
        .status(201)
        .json({ message: "Photo uploaded successfully", photo: newPhoto });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
);

// router.delete("/:id", protect, deletePhoto);
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    // Find the photo by ID
    const photo = await Photo.findById(id);
    console.log(photo);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Ensure the logged-in user owns the photo
    if (photo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this photo" });
    }

    // Delete the file from storage
    // const filePath = path.join(__dirname, "..", "uploads", photo.filename);
    // fs.unlinkSync(filePath);

    // Remove photo from the database
    // await photo.findByIdAndDelete(id);
    await Photo.findByIdAndDelete(id);

    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/like", protect, handleLikePhoto);
router.get("/", getPhotos);
router.get("/get-user-photos", protect ,getUsersPhotos);

export default router;
