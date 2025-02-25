import React from "react";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
// import Lottie from 'react-lottie-player'

const DashboardTopCard = ({ lottieicon, imgicon, label, count, bgcolor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#FFF",
        // backgroundColor: "#F6F6F6",
        borderRadius: "20px",
        padding: "6px 12px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        border: "1px solid #E0E0E0",
        marginRight: "8px",
        gap: 1.5,
      }}
    >
      {/* Icon Placeholder */}
      <Box
        sx={{
          width: lottieicon ? "30px": "28px",
          height: lottieicon ? "30px":  "28px",
          // backgroundColor: "#C4EA65",
          backgroundColor: imgicon && bgcolor,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // backgroundImage: imgicon
        }}
      >
        {lottieicon &&
          <Lottie

            // loop
            // animationData={anm1}
            // play
            animationData={lottieicon}
            loop
            autoplay
            style=
            {{ 
              width: "100%", 
              height: "100%", 
              transform: "scale(2)",  // Increase the animation size
              transformOrigin: "center", // Ensure it scales from the center
               }} 
               />
        }
        {
          imgicon &&
          <img
            src={imgicon}
            alt="icon"
            style={{ width: "18px", height: "18px", objectFit: "contain" }}
          />
        }
        {/* 🔌  */}
      </Box>

      {/* Text */}
      <Typography
        variant="body2"
        sx={{ fontWeight: 400, color: "#333", whiteSpace: "nowrap" }}
      >
        {label} ({count})
      </Typography>
    </Box>
  );
};

export default DashboardTopCard;
