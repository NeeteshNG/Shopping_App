import React from "react";
import SlidingPage from "./Slidingpage/Slidingpage";
import "../Components/Slidingpage/Slidingpage.css"

function Home() {
  return (
    <div className="home-page">
      {/* <h1><i className="fa-solid fa-bag-shopping"></i></h1>
      <div className="container">
        <i className="fa-solid fa-rocket element element1"></i>
      </div> */}
      <SlidingPage/>
    </div>
  );
}

export default Home;
