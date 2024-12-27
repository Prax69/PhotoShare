import React, { useState, useEffect, useContext } from "react";
import API from "../utils/api";
import AuthContext from "../context/AuthContext.jsx";
import "./Home.css";
import { Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState("");

  const { user, setUser } = useContext(AuthContext);
  console.log("user", user);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const { data } = await API.get("/photos");
        setPhotos(data);
      } catch (err) {
        setError("Failed to fetch photos");
      }
    };

    fetchPhotos();
  }, []);

  const handleLike = async (photoId, isLiked) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post(
        `/photos/${photoId}/like`,
        { isLiked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(() => {
        return {
          ...user,
          likes: isLiked
            ? user.likes.filter((like) => like !== photoId)
            : [...user.likes, photoId],
        };
      });
      console.log("data", data.likes);
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? { ...photo, likeCount: data.likeCount }
            : photo
        )
      );
    } catch (err) {
      setError("Failed to like photo");
    }
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Discover Amazing Photos</h1>
      {error && <p className="home-error">{error}</p>}
      <div className="photo-grid">
        {photos.map(
          (photo) => (
            console.log("photo", photo.likeCount),
            (
              <div key={photo._id} className="photo-card">
                <img
                  src={`http://localhost:5000/${photo.filePath}`}
                  alt="User upload"
                  className="photo-img"
                />
                <p className="photo-user">
                   @{photo.user.username}
                </p>
                <button
                  onClick={() =>
                    handleLike(photo._id, user.likes.includes(photo._id))
                  }
                  className={`like-button ${
                    user.likes.includes(photo._id) ? "liked" : ""
                  }`}
                >
                  <div className="like-text">
                    {!user.likes.includes(photo._id) && "Like"}{" "}
                  </div>
                  <span className="like-count">
                    {user.likes.includes(photo._id) ? (
                      <FaHeart className="heart-icon" />
                    ) : (
                      <Heart className="heart-icon" />
                    )}
                    {photo.likeCount}
                  </span>
                </button>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default Home;
