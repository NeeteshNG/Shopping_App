import React from "react";
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
        <p>
          <p>
            <h1>Name :</h1> {user.names}
          </p>
          <p>
            <h1>Username :</h1> {user.username}
          </p>
        </p>
        <p>
          <p>
            <h1>Address :</h1> {user.address}
          </p>
          <p>
            <h1>Phone :</h1> {user.phone}
          </p>
        </p>
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
