// src/pages/AddProduct.jsx
import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../config"; // centralized backend URL

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const token = localStorage.getItem("token");

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    images.forEach((file) => formData.append("images", file));

    try {
      const res = await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setStock("");
      setImages([]);
      setPreview([]);
    } catch (error) {
      console.error("❌ Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px", color: "#556b2f" }}>Add New Product</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Price (₹):</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Stock:</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "block", marginBottom: "15px" }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
            flexWrap: "wrap",
          }}
        >
          {preview.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              width="100"
              height="100"
              style={{ borderRadius: "8px", objectFit: "cover" }}
            />
          ))}
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#556b2f",
            color: "ivory",
            border: "none",
            padding: "10px 20px",
            borderRadius: "20px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
