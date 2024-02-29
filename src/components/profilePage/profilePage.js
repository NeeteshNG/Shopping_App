import React from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import { Link } from "react-router-dom";

function ProfilePage({ user }) {
  if (!user) {
    return <Box>User not found</Box>;
  }

  return (
    <Box style={profileStyles.detailsContainer}>
      <Typography variant="h4" style={profileStyles.heading}>
        Profile Details
      </Typography>
      <Divider style={{ marginBottom: "20px" }} />
      <Box style={profileStyles.userInfo}>
        <Box style={profileStyles.infoItem}>
          <Typography variant="subtitle1" style={profileStyles.infoLabel}>
            Name:
          </Typography>
          <Typography variant="body1" style={profileStyles.textCapital}>{user.name}</Typography>
        </Box>
        <Box style={profileStyles.infoItem}>
          <Typography variant="subtitle1" style={profileStyles.infoLabel}>
            Username:
          </Typography>
          <Typography variant="body1">{user.username}</Typography>
        </Box>
        <Box style={profileStyles.infoItem}>
          <Typography variant="subtitle1" style={profileStyles.infoLabel}>
            Address:
          </Typography>
          <Typography variant="body1" style={profileStyles.textCapital}>{user.address}</Typography>
        </Box>
        <Box style={profileStyles.infoItem}>
          <Typography variant="subtitle1" style={profileStyles.infoLabel}>
            Phone:
          </Typography>
          <Typography variant="body1">{user.phone_number}</Typography>
        </Box>
      </Box>
      <Box style={profileStyles.backButton}>
        <Link to="/products" style={{ textDecoration: "none" }}>
          <Button variant="contained" color="primary">
            Back to Products
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

const profileStyles = {
  detailsContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "80px auto 40px auto",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#144981",
    fontWeight: "600",
  },
  userInfo: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  infoItem: {
    marginBottom: "15px",
  },
  infoLabel: {
    fontWeight: "bold",
    marginRight: "5px",
  },
  backButton: {
    marginTop: "20px",
    textAlign: "center",
  },
  textCapital: {
    textTransform: "capitalize",
  },
};

export default ProfilePage;
