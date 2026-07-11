import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./Admin.css";

const AdminProducts = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const { data } = await API.get("/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this product?")) {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    }
  };

  const startEdit = (p) => {
    setEditingId(p._id);
    setForm({ name: p.name, price: p.price, category: p.category });
    setImageFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setImageFile(null);
  };

  const handleSave = async (id) => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("category", form.category);
      if (imageFile) {
        formData.append("images", imageFile); // field name must match backend: upload.array("images")
      }

      await API.put(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchProducts();
      setEditingId(null);
      setImageFile(null);
    } catch (error) {
      console.error("❌ Update failed:", error);
      alert("Failed to update product. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) =>
            editingId === p._id ? (
              <tr key={p._id}>
                <td>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </td>
                <td>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </td>
                <td>
                  <input
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </td>
                <td>
                  <button onClick={() => handleSave(p._id)} disabled={saving}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={cancelEdit} disabled={saving}>
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={p._id}>
                <td>
                  {p.images?.[0] ? (
                    <img
                      src={
                        p.images[0].startsWith("http")
                          ? p.images[0]
                          : `${API.defaults.baseURL.replace("/api", "")}${p.images[0]}`
                      }
                      alt={p.name}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  ) : (
                    "No image"
                  )}
                </td>
                <td>{p.name}</td>
                <td>₹{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button onClick={() => startEdit(p)}>Edit</button>
                  <button onClick={() => handleDelete(p._id)}>Delete</button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;