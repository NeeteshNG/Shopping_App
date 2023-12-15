import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import ProductPage from "./Components/ProductPage";
import Footer from "./Components/Footer";
import LoginPage from "./UserAuth/Component_User/LoginPage";
import { useState } from "react";
import ProfilePage from "./UserAuth/Component_User/ProfilePage";
import { useEffect } from "react";
import ProtectedRoute from "./UserAuth/ProtectedRoute";

const products = [
  {
    id: 1,
    name: "Pizza",
    price: 299,
    description:
      "Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot ",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/3944311/pexels-photo-3944311.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955/free-photo-of-close-up-shot-of-a-slice-of-pizza.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/4617831/pexels-photo-4617831.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11730663/pexels-photo-11730663.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 2,
    name: "Watch",
    price: 5999,
    description:
      "A watch is a portable timepiece intended to be carried or worn by a person. It is designed to keep a consistent movement despite the motions caused by the persons activities.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11638635/pexels-photo-11638635.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/9830093/pexels-photo-9830093.png?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1151440/pexels-photo-1151440.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1136589/pexels-photo-1136589.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "men",
  },
  {
    id: 3,
    name: "Plant",
    price: 99,
    description:
      "Plant food products are the different types of food that we get from plants. Green plants are the primary source of food. Examples of plant-based food are vegetables, fruits, cereals, pulses, spices, nuts and oils.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/11287048/pexels-photo-11287048.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/15124722/pexels-photo-15124722/free-photo-of-leopard-lily-in-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/7336018/pexels-photo-7336018.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/5144485/pexels-photo-5144485.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/5754097/pexels-photo-5754097.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 4,
    name: "House",
    price: 10000000,
    description:
      "Mansion architecture exudes a sense of grandeur with tall ceilings, large windows, and a beautiful facade. A mansion will also typically be built on a large property which contains other luxurious amenities like a pool, tennis courts, extensive gardens, walking paths, water features, and additional garages.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/17741267/pexels-photo-17741267/free-photo-of-funfair-in-vietnam.png?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/7590350/pexels-photo-7590350.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/5035866/pexels-photo-5035866.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/16414722/pexels-photo-16414722/free-photo-of-candid-picture-of-a-man-sitting-on-a-bench-outside-of-a-building.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11116098/pexels-photo-11116098.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 5,
    name: "Ring",
    price: 10999,
    description:
      'A ring is a round band, usually made of metal, worn as ornamental jewelry. The term "ring" by itself always denotes jewellery worn on the finger; when worn as an ornament elsewhere, the body part is specified within the term, e.g., earrings, neck rings, arm rings, and toe rings.',
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/10976653/pexels-photo-10976653.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/8891951/pexels-photo-8891951.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/8891959/pexels-photo-8891959.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/16438670/pexels-photo-16438670/free-photo-of-close-up-of-woman-wearing-a-silver-ring-with-a-ruby-stone.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/8306528/pexels-photo-8306528.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "women",
  },
  {
    id: 6,
    name: "Shoes",
    price: 1999,
    description:
      "Running Shoes. Running shoes are lightweight and flexible. They are designed for anterior (forward) and vertical (up and down) motion. Running shoes have cushioning to absorb the impact of each stride, plus extra shock absorption in the heel.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/10963373/pexels-photo-10963373.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/9507116/pexels-photo-9507116.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11292946/pexels-photo-11292946.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2404959/pexels-photo-2404959.png?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "men",
  },
  {
    id: 7,
    name: "China Manchurian",
    price: 599,
    description:
      "A crab is a sea creature with a flat round body covered by a shell, and five pairs of legs with large claws on the front pair.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2297961/pexels-photo-2297961.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/343871/pexels-photo-343871.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/983587/pexels-photo-983587.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/105588/pexels-photo-105588.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "food",
  },
  {
    id: 8,
    name: "A Table",
    price: 3999,
    description:
      "A table is a piece of furniture with a flat top that you put things on or sit at. She was sitting at the kitchen table eating a currant bun. I placed his drink on the small table at his elbow. Synonyms: counter, bench, stand, board More Synonyms of table.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/11112739/pexels-photo-11112739.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/129721/pexels-photo-129721.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3098621/pexels-photo-3098621.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1937337/pexels-photo-1937337.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/3143813/pexels-photo-3143813.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 9,
    name: "A Sofa",
    price: 11999,
    description:
      "A sofa is a piece of furniture that a few people can comfortably sit on together. On a rainy weekend, you and your friends might pile on the sofa to watch scary movies and eat popcorn. A sofa is similar to a couch — officially, it needs to seat at least three or more people to qualify as a sofa.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/11112734/pexels-photo-11112734.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11112727/pexels-photo-11112727.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11112731/pexels-photo-11112731.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/9290601/pexels-photo-9290601.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/12486219/pexels-photo-12486219.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 10,
    name: "A Frog",
    price: "Free",
    description:
      "In general, frogs have protruding eyes, no tail, and strong, webbed hind feet that are adapted for leaping and swimming. They also possess smooth, moist skins. Many are predominantly aquatic, but some live on land, in burrows, or in trees.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/12569708/pexels-photo-12569708.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/12514384/pexels-photo-12514384.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/12569707/pexels-photo-12569707.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/12569713/pexels-photo-12569713.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/12079027/pexels-photo-12079027.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 11,
    name: "A Flower",
    price: 99,
    description:
      "A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae). Flowers produce gametophytes, which in flowering plants consist of a few haploid cells which produce gametes.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/10760330/pexels-photo-10760330.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/189361/pexels-photo-189361.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/189396/pexels-photo-189396.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/130574/pexels-photo-130574.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    category: "all",
    stock: 10,
  },
  {
    id: 12,
    name: "Dennis Lingo - Shirt",
    price: 489,
    description:
      "Men Slim Fit Striped Slim Collar Casual Shirt.",
    shippingDetails: "Free Shipping",
    images: [
      "https://images.pexels.com/photos/13094233/pexels-photo-13094233.jpeg?auto=compress&cs=tinysrgb&w=400&h=750&dpr=1",
      "https://images.pexels.com/photos/13094146/pexels-photo-13094146.jpeg?auto=compress&cs=tinysrgb&w=400&h=750&dpr=1",
      "https://images.pexels.com/photos/13094187/pexels-photo-13094187.jpeg?auto=compress&cs=tinysrgb&w=400&h=750&dpr=1",
      "https://static.zara.net/photos///2022/I/0/2/p/7545/290/802/2/w/400/7545290802_1_1_1.jpg?ts=1664347949819",
      "https://static.zara.net/photos///2022/I/0/2/p/7545/290/802/2/w/563/7545290802_6_1_1.jpg?ts=1664292948268",
    ],
    category: "men",
    stock: 5,
  },
];

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (userIsLoggedIn) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/loginpage"
            element={
              <ProtectedRoute
                element={<LoginPage setLoggedIn={setLoggedIn} />}
                authenticated={!loggedIn}
                redirectPath="/products"
              />
            }
          />
          <Route
            path="/products"
            element={<Products products={products} authenticated={loggedIn} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<ProfilePage />}
                authenticated={loggedIn}
                redirectPath="/loginpage"
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProtectedRoute
                element={<ProductPage products={products} />}
                authenticated={loggedIn}
                redirectPath="/loginpage"
              />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
