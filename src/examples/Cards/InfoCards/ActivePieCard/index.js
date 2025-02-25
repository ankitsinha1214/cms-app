import React from "react";
import { Card, Box, Typography, Stack } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import MDTypography from "components/MDTypography";

// Register required Chart.js components
Chart.register(ArcElement, Tooltip, Legend);

const ActivePieCard = (chart) => {
  const datas = (chart?.chart?.datasets?.data || []);
  // console.log(chart?.chart?.datasets?.data)
  // console.log(datas)
  const total = datas?.[0] + datas?.[1] || 0;
  const inUse = datas?.[0] || 0;
  const available = datas?.[1] || 0;

  // Chart data
  const data = {
    labels: ["In Use", "Available"],
    datasets: [
      {
        data: [inUse, available],
        backgroundColor: ["rgba(145,202,255,0.7)", "rgba(174,255,120,0.7)"], // Blue & Green
        hoverBackgroundColor: ["rgba(145,202,255,1)", "rgba(174,255,120,1)"],
        borderWidth: 0, // No borders for a clean look
        // borderWidth: 2, // Adds a slight border to merge the sections
        borderAlign: "inner",
        // borderRadius: [30, 30], // Rounds only "Available"
        spacing: 0, 
        // borderAlign: "center", // Ensures balanced alignment
        // borderRadius: [-20, 25], // Concave for "In Use", convex for "Available"
        // spacing: 0, 
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    // cutout: "80%", // Controls the inner hole size
    cutout: "70%", // Controls the inner hole size
    plugins: {
      legend: {
        display: false, // Hide legend inside chart
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <Card
      sx={{
        width: { xs: "100%"
          // , sm: 250
         },
         height: "400px",
        p: 2,
        borderRadius: 3,
        // boxShadow: 3,
        textAlign: "center",
        justifyContent: "space-between"
      }}
    >
      {/* Title */}
      {/* <Typography variant="h5" fontWeight="bold" textAlign="start">
        Active Charger
      </Typography> */}
      <MDTypography variant="h5" fontWeight="medium" textAlign="start" ml={1}>
      Active Charger
        </MDTypography>

      {/* Doughnut Chart */}
      <Box sx={{ position: "relative", my: 2, mx: 8 }}>
        <Doughnut data={data} options={options} />
        {/* Centered Total Count */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          Total <br /> {total}
        </Typography>
      </Box>

      {/* Legend Section */}
      <Stack spacing={1} mt={1}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box
              sx={{ width: 12, height: 12, bgcolor: "rgba(174,255,120,0.7)",  borderRadius: "2px", mr: 1 }}
            />
            <Typography variant="body2" color="textSecondary">
              Available
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {available}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Box
              sx={{ width: 12, height: 12, bgcolor: "rgba(145,202,255,0.7)", borderRadius: "2px", mr: 1 }}
            />
             {/* <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    background: "#1890ff",
                    // backgroundColor: item.color,
                    borderRadius: "2px",
                    // borderRadius: "50%",
                  }}
                ></span> */}
            <Typography variant="body2" color="textSecondary">
              In Use
            </Typography>
          </Box>
          <Typography variant="body2" fontWeight="bold">
            {inUse}
          </Typography>
        </Box>
      </Stack>
    </Card>
  );
};

export default ActivePieCard;
