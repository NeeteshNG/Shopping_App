import "./App.css";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import ProductPage from "./Components/ProductPage";
import Footer from "./Components/Footer";

const products = [
  {
    id: 1,
    name: "Pizza",
    price: 299,
    description:
      "Pizza, dish of Italian origin consisting of a flattened disk of bread dough topped with some combination of olive oil, oregano, tomato, olives, mozzarella or other cheese, and many other ingredients, baked quickly—usually, in a commercial setting, using a wood-fired oven heated to a very high temperature—and served hot ",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/3944311/pexels-photo-3944311.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/15126955/pexels-photo-15126955/free-photo-of-close-up-shot-of-a-slice-of-pizza.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/4617831/pexels-photo-4617831.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11111603/pexels-photo-11111603.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11730663/pexels-photo-11730663.jpeg?auto=compress&cs=tinysrgb&w=400"
    ]
  },
  {
    id: 2,
    name: "Watch",
    price: 5999,
    description:
      "A watch is a portable timepiece intended to be carried or worn by a person. It is designed to keep a consistent movement despite the motions caused by the persons activities.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/8839887/pexels-photo-8839887.jpeg?auto=compress&cs=tinysrgb&w=400",
    ]
  },
  {
    id: 3,
    name: "Plant",
    price: 99,
    description:
      "Plant food products are the different types of food that we get from plants. Green plants are the primary source of food. Examples of plant-based food are vegetables, fruits, cereals, pulses, spices, nuts and oils.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/11287048/pexels-photo-11287048.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11287048/pexels-photo-11287048.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/11287048/pexels-photo-11287048.jpeg?auto=compress&cs=tinysrgb&w=400",
    ]
  },
  {
    id: 4,
    name: "House",
    price: 10000000,
    description:
      "Mansion architecture exudes a sense of grandeur with tall ceilings, large windows, and a beautiful facade. A mansion will also typically be built on a large property which contains other luxurious amenities like a pool, tennis courts, extensive gardens, walking paths, water features, and additional garages.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/17741267/pexels-photo-17741267/free-photo-of-funfair-in-vietnam.png?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/17741267/pexels-photo-17741267/free-photo-of-funfair-in-vietnam.png?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/17741267/pexels-photo-17741267/free-photo-of-funfair-in-vietnam.png?auto=compress&cs=tinysrgb&w=400",
    ]
  },
  {
    id: 5,
    name: "Ring",
    price: 10999,
    description:
      'A ring is a round band, usually made of metal, worn as ornamental jewelry. The term "ring" by itself always denotes jewellery worn on the finger; when worn as an ornament elsewhere, the body part is specified within the term, e.g., earrings, neck rings, arm rings, and toe rings.',
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/10976653/pexels-photo-10976653.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/10976653/pexels-photo-10976653.jpeg?auto=compress&cs=tinysrgb&w=400",
    ]
  },
  {
    id: 6,
    name: "Shoes",
    price: 1999,
    description:
      "Running Shoes. Running shoes are lightweight and flexible. They are designed for anterior (forward) and vertical (up and down) motion. Running shoes have cushioning to absorb the impact of each stride, plus extra shock absorption in the heel.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
  {
    id: 7,
    name: "China Manchurian",
    price: 599,
    description:
      "A crab is a sea creature with a flat round body covered by a shell, and five pairs of legs with large claws on the front pair.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/6270541/pexels-photo-6270541.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
  {
    id: 8,
    name: "A Table",
    price: 3999,
    description:
      "A table is a piece of furniture with a flat top that you put things on or sit at. She was sitting at the kitchen table eating a currant bun. I placed his drink on the small table at his elbow. Synonyms: counter, bench, stand, board More Synonyms of table.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/11112739/pexels-photo-11112739.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
  {
    id: 9,
    name: "A Sofa",
    price: 11999,
    description:
      "A sofa is a piece of furniture that a few people can comfortably sit on together. On a rainy weekend, you and your friends might pile on the sofa to watch scary movies and eat popcorn. A sofa is similar to a couch — officially, it needs to seat at least three or more people to qualify as a sofa.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/11112734/pexels-photo-11112734.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
  {
    id: 10,
    name: "A Frog",
    price: "Free",
    description:
      "In general, frogs have protruding eyes, no tail, and strong, webbed hind feet that are adapted for leaping and swimming. They also possess smooth, moist skins. Many are predominantly aquatic, but some live on land, in burrows, or in trees.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/12569708/pexels-photo-12569708.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
  {
    id: 11,
    name: "A Flower",
    price: 99,
    description:
      "A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants (plants of the division Angiospermae). Flowers produce gametophytes, which in flowering plants consist of a few haploid cells which produce gametes.",
    shippingDetails : "Free Shipping", 
    images : [
      "https://images.pexels.com/photos/10760330/pexels-photo-10760330.jpeg?auto=compress&cs=tinysrgb&w=400",]
  },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/cart" Component={Cart} />
          <Route path="/wishlist" Component={Wishlist} />
          <Route
            path="/products/:productId"
            element={<ProductPage products={products}/>}
          />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
