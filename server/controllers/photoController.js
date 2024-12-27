import Photo from "../models/Photo.js";
import User from "../models/User.js";



export const handleLikePhoto = async (req, res) => {
  const { isLiked } = req.body;
  const userId = req.user._id; 
  // const 
  try {
    const photo = await Photo.findById(req.params.id);
    const user = await User.findById(userId);
    if (isLiked) {
      photo.likeCount -= 1;
      user.likes = user.likes.filter((photoId) => photoId.toString() !== req.params.id);

    } else {
      photo.likeCount += 1;
      user.likes.push(req.params.id);
    }



    await photo.save();
    await user.save();
    res.status(200).json({ likeCount: photo.likeCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().populate("user", "username");
    res.status(200).json(photos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePhoto = async (req, res) => {
  try {
    console.log("delete triggered");
    const photo = await Photo.findById(req.params.id);
    console.log(photo);

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    // Check if the logged-in user owns the photo
    if (photo.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this photo" });
    }

    // await photo.remove();
    await Photo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Photo deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const photosHealth = (req, res) => {
  res.status(200).json({ message: "Photos route is healthy!" });
};

export const getUsersPhotos = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from the authenticated user

    // Find all photos uploaded by the user
    const photos = await Photo.find({ user: userId });

    // Return the photos
    res.status(200).json(photos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user photos" });
  }
};
;
