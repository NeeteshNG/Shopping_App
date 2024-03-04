import React, { useState } from "react";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import ProductCard from "../productcard/productCard";

function Products({
  products,
  fetchCartProducts,
  toggleWishlist,
  userWishlistProducts,
  handleAddToCart,
  setQuantity
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSorting, setSelectedSorting] = useState("");

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSelectedSorting(event.target.value);
  };

  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  if (selectedSorting === "price_low_to_high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSorting === "price_high_to_low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  const categoryOptions = ["men", "women", "kids"];
  const sortingOptions = [
    { label: "L -- H", value: "price_low_to_high" },
    { label: "H -- L", value: "price_high_to_low" },
  ];

  return (
    <Box>
      <Box style={productsStyle.productsBody}>
        <Box style={productsStyle.filterSection}>
          <Box style={productsStyle.filterBox}>
            <Typography style={productsStyle.filterText} htmlFor="category">
              FILTER BY CATEGORY :{" "}
            </Typography>
            <Select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={productsStyle.filterBoxSelect}
            >
              <MenuItem value="">All</MenuItem>
              {categoryOptions.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box style={productsStyle.filterBox}>
            <Typography style={productsStyle.filterText} htmlFor="sorting">
              SORT BY PRICE:{" "}
            </Typography>
            <Select
              id="sorting"
              value={selectedSorting}
              onChange={handleSortingChange}
              style={productsStyle.filterBoxSelect}
            >
              {sortingOptions.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box style={productsStyle.bodyCards}>
          <Grid style={productsStyle.gridBody} container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item key={product.id}>
                <ProductCard
                  product={product}
                  fetchCartProducts={fetchCartProducts}
                  toggleWishlist={toggleWishlist}
                  userWishlistProducts={userWishlistProducts}
                  handleAddToCart={handleAddToCart}
                  setQuantity={setQuantity}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}


const productsStyle = {
  productsBody: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "80px"
  },
  filterSection: {
    backgroundColor: "#f0f0f0",
    borderRadius: "5px",
    padding: "10px",
    width: "fit-content",
    display: "flex",
    flexDirection: "row",
  },
  categoryFilter: {
    marginTop: "20px",
  },
  bodyCards: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
  },
  filterBox: {
    marginRight: "10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    color: "#144981",
    fontWeight: 600,
  },
  filterBoxSelect: {
    backgroundColor: "#144981",
    color: "white",
    padding: "5px",
    width: "fit-content",
    border: "none",
    fontSize: "12px",
    height: "40%",
    boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
    WebkitAppearance: "button",
    appearance: "button",
    outline: "none",
  },
  gridBody: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap: "1px",
    width: "98%",
    justifyItems: "center"
  }
};

export default Products;
