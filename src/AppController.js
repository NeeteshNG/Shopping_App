import { useState, useEffect } from "react";

const useAppController = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [products, setProducts] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [userCartInfo, setUserCartInfo] = useState([]);
    const [userCartProducts, setUserCartProducts] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));


    useEffect(() => {
        fetchCartProducts();
        fetchProducts();

        const userIsLoggedIn = localStorage.getItem("loggedIn") === "true";
        if (userIsLoggedIn) {
            setLoggedIn(true);
        }
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/productsApi/products/");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchCartProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(
                "http://127.0.0.1:8000/cartApi/cart-items/",
                {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            const userCartProductsInfo = data

            setUserCartInfo(data)

            const authUserIdInfo = userCartProductsInfo.filter((id_of) => (
                id_of.user === user.id
            ))

            const filteredProducts = authUserIdInfo.map((info) => {
                const product = products.find((item) => item.id === info.product);
                if (product) {
                    return { ...product, quantity: info.quantity };
                }
                return null;
            }).filter(Boolean);

            setUserCartProducts(filteredProducts)
            setCartQuantity(filteredProducts.length)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    return {
        loggedIn,
        products,
        cartQuantity,
        userCartInfo,
        userCartProducts,
        setLoggedIn,
        setProducts,
        setCartQuantity,
        setUserCartInfo,
        setUserCartProducts,
        fetchProducts,
        fetchCartProducts,
    };
};

export default useAppController;
