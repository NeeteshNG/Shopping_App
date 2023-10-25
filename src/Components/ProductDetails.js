import React from "react";

function ProductDetails({ product, onClose }) {
    return (
        <div className="product-modal">
        <div className="product-modal-content">
            <h2>{product.name}</h2>
            <img src={product.image} />
            <h3>Desciption :</h3>
            <p>{product.description}</p>
            <p>
            <h3>Price:</h3> {product.price} /-
            </p>
            <button onClick={onClose}>Close</button>
        </div>
        </div>
    );
}

export default ProductDetails;
