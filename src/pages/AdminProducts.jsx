import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import "./Admin.css";

const AdminProducts = () => {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get("/products");
      setProducts(data);
    };
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

  return (
    <div className="admin-products">
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>₹{p.price}</td>
              <td>{p.category}</td>
              <td>
                <button onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
