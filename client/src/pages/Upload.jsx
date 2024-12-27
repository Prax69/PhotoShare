import React, { useState, useEffect } from "react";
import API from "../utils/api";
import "./Upload.css"; // Import your CSS file
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/photos/get-user-photos", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(res.data);
        // navigate("/upload");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch images");
      }
    };

    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const token = localStorage.getItem("token");
      const res = await API.post("/photos/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setImages((prev) => [...prev, res.data]);
      setSelectedFile(null);
      window.location.reload();
      navigate("/upload");
    } catch (err) {
      console.error(err);
      setError("Failed to upload photo");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/photos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setImages((prev) => prev.filter((image) => image._id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete photo");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Upload Photos</h1>
      <form className="form" onSubmit={handleUpload}>
        <input
          type="file"
          className="file-input"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />
        <button type="submit" className="upload-button">
          Upload
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="image-grid">
        {images.map((image) => (
          <div key={image._id} className="image-card">
            <img
              src={`http://localhost:5000/${image.filePath}`}
              alt={image.title}
            />
            <h3 className="image-title">{image.title}</h3>
            <button
              onClick={() => handleDelete(image._id)}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Upload;
