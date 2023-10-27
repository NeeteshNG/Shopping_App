import React from 'react'
import { useSelector } from 'react-redux';

function ProfilePage() {
    const user = useSelector((state) => state.user.user);

    if (!user) {
      return <div>User not found</div>;
    }
  
    return (
      <div className="user-profile">
        <h1>User Profile</h1>
        <div className="profile-details">
          <div>
            <strong>Username : </strong> {user.username}
          </div>
          {/* Add more user profile details here */}
        </div>
      </div>
    );
}

export default ProfilePage
