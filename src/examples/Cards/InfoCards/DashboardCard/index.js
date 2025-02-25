import React, { useRef } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale,registerables } from "chart.js";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);
ChartJS.register(...registerables);

const DashboardCard = ({ color, colorcode, title, count, percentage, icon, labelicon, imgicon }) => {
  const chartRef = useRef(null);
  const getGradient = (ctx, chartArea) => {
    const { top, bottom } = chartArea;
    const gradient = ctx.createLinearGradient(0, bottom, 0, top);
    gradient.addColorStop(0, "rgba(180, 249, 134, 1)"); // Strong green at bottom
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)"); // Transparent at top
    return gradient;
  };

  // const getGradient = (ctx, chartArea) => {
  //   const { top, bottom } = chartArea;
  //   const gradient = ctx.createLinearGradient(0, bottom, 0, top);
  //   gradient.addColorStop(0, `${color}33`); // Lighter version of color at bottom (33 = 20% opacity)
  //   gradient.addColorStop(1, `${color}99`); // Darker version of color at top (99 = 60% opacity)
  //   return gradient;
  // };

  const chartData = (canvas) => {
    const ctx = canvas.getContext("2d");
    // const chartArea = canvas.chartArea;
    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    // const gradient = ctx.createLinearGradient(0, 0, 0, 100);
    // gradient.addColorStop(0, "#A19BFF");
    // gradient.addColorStop(1, "rgba(161, 155, 255, 0.2)"); // More visible green
    // gradient.addColorStop(0, "rgba(180, 249, 134, 1)"); // White at bottom
    // gradient.addColorStop(1, "rgba(255, 255, 255, 0)");     // Dark green at top
    gradient.addColorStop(1, `#fff`);     // Dark green at top
    gradient.addColorStop(0, `${colorcode}`); // White at bottom
    // gradient.addColorStop(0, `${colorcode}99`); // White at bottom
    // console.log(gradient)
    return {
      labels: ["", "", "", "", "", ""],
      datasets: [
        {
          data: [10, 40, 20, 60, 30, 70],
          borderColor: colorcode, // Line color
          backgroundColor: gradient, // Gradient fill
          // backgroundColor: getGradient(ctx, chartArea),
          // backgroundColor: getGradient(ctx, canvas.chartArea), // Gradient fill
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };
  const chartData1 = {
    labels: ["", "", "", "", "", ""],
    datasets: [
      {
        label: "Energy Consumption",
        data: [10, 40, 20, 60, 30, 70],
        borderColor: "#B4F986",
        color: "success", // Make sure this matches a key in your theme colors
        // color: "rgba(180, 249, 134, 0)", // Make sure this matches a key in your theme colors
      },
    ],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { display: false },
        y: { display: false },
      },
      elements: {
        point: { radius: 0 },
      },
      plugins: {
        legend: { display: false },
      },
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false },
      y: { display: false },
    },
    elements: {
      point: { radius: 0 },
    },
    plugins: {
      legend: { display: false },
    },
  };
  // const chartData = {
  //   labels: ["", "", "", "", "", ""],
  //   datasets: [
  //     {
  //       data: [10, 40, 20, 60, 30, 70],
  //       borderColor: color, // Dynamic color
  //       background: `${color}`, // 20% opacity
  //       fill: true,
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   scales: {
  //     x: { display: false },
  //     y: { display: false },
  //   },
  //   elements: {
  //     point: { radius: 0 },
  //   },
  //   plugins: {
  //     legend: { display: false },
  //   },
  // };
// console.log(chartRef)
  return (
    <Card sx={{
      // borderRadius: 2, 
      // boxShadow: 3, 
      // position: "relative", 
      // width: 250
      // height: 200
        // height: 163,
        borderRadius: "20px 20px 0 0"
    }}>
      {/* <CardContent> */}
      {/* <AccountCircle sx={{ fontSize: 30, color: "#90caf9" }} />
        <Typography variant="body2" color="textSecondary">
          User
        </Typography>
        <Typography variant="h5" fontWeight={600}>
          500
        </Typography> */}
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        // sx={{ backgroundColor: color }}
        >
          {(labelicon) ?
            <div style={{ width: "32px", height: "32px", display: "flex", justifyContent: "center", alignItems: "center" }}>
              {React.createElement(labelicon, { style: { width: "100%", height: "100%" } })}
            </div>
            // React.createElement(labelicon)
            :
            imgicon ?
              <img
                src={imgicon}
                alt={title}
                style={{ width: "2rem", height: "2rem", objectFit: "contain" }}
              />
              :
              <Icon
                // fontSize="medium" 
                fontSize="large"
                // fontSize="32px" 
                color="inherit"
                style={{
                  // width: "32px",
                  // height: "32px",
                  // fontSize: "32px",
                }}
              >
                {icon}
              </Icon>
          }
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h3">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <div style={{
        // height: 300,
        // zIndex: "999",
        height: 90,
        //  position: "absolute", bottom: 10, left: 0, right: 0 
        margin: "0rem"
        // margin: "0rem 2px"
      }}>
        <Line ref={chartRef} data={chartData} options={chartOptions} />
        {/* <GradientLineChart
                  // title="Energy Consumption"
                  // description="This chart shows energy consumption trends"
                  height="80px"
                  width="100%"
                  chart={chartData1}
                  // icon={{ color: "info", component: "bar_chart" }}
                /> */}
      </div>
      {/* </CardContent> */}
    </Card>
  );
};

export default DashboardCard;
