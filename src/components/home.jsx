import React, { useState, useEffect } from "react";
import "./home.css";
import defaultImage from "../images/img.jpg";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: null,
    quantity: null,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://road-rambunctious-column.glitch.me/getproducts");
        const responseData = await response.json();
        setProducts(responseData.products);
        console.log(responseData.products);
      } catch (error) {
        setProducts([]);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://road-rambunctious-column.glitch.me/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          price: 0,
          quantity: 0,
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "quantity" ? Number(value) : value,
    });
  };

  return (
    <div className="homePage">
      <div className="items">
        {products.length == 0 ? (
          <div>Loading</div>
        ) : (
          products.map((product) => (
            <>
              <div key={product.id} className="productcard">
                <img
                  src={product.image.src ? product.image.src : defaultImage}
                  alt={product.title}
                />
                <h2> {product.title}</h2>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: product.body_html }}
                />
              </div>
            </>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={formData.price}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={formData.quantity}
          onChange={handleInputChange}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
}
