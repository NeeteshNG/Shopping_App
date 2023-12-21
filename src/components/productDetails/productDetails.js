import React from "react";
import "./productDetail.css"

function ProductDetails({ product, onClose }) {
  return (
    <div className="content-body">
      <div className="product-modal">
        <div className="product-modal-content">
          <h2>{product.name}</h2>
          <img src={product.images} alt={product.name}/>
          <h3>Desciption :</h3>
          <p>{product.description}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
