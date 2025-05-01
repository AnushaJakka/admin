// @ts-nocheck
import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/router";

const NotFound = () => {
  const navigate = useRouter();

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold", color: "grey.800", mb: 2 }}>
          404
        </Typography>
        <Typography variant="h2" sx={{ fontSize: "2rem", fontWeight: "semibold", color: "grey.600", mb: 2 }}>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: "grey.500", mb: 3 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate.push("/")}
          sx={{ mt: 2 }}
        >
          Go to Home
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFound;