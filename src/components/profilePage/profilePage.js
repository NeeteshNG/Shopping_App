import React from "react";
import "./profilePage.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfilePage() {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="details-container">
      <h2>DETAIL</h2>
      <div className="personal-details">
        <div className="para">
          <div>
            <h1>Name :</h1> {user.names}
          </div>
          <div>
            <h1>Username :</h1> {user.username}
          </div>
        </div>
        <div className="para">
          <div>
            <h1>Address :</h1> {user.address}
          </div>
          <div>
            <h1>Phone :</h1> {user.phone}
          </div>
        </div>
      </div>
      <div className="back-button">
        <Link to="/products">
          <button>Back to Products</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
