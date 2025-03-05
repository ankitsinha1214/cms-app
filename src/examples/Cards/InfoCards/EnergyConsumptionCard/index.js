import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const EnergyConsumptionCard = ({labels, data1, title, colorcode}) => {
  const chartRef = useRef(null);
  // console.log(labels);
  // console.log(data1);
  // console.log(title);
  // console.log(colorcode);
  const hexToRgba = (hex, opacity) => {
    // Remove # if present
    hex = hex.replace(/^#/, "");
    
    // Convert shorthand hex (e.g., #abc) to full format (e.g., #aabbcc)
    if (hex.length === 3) {
      hex = hex.split("").map((char) => char + char).join("");
    }
  
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");     // Dark green at top
    gradient.addColorStop(0, hexToRgba(colorcode, 0.3)); // White at bottom
    // gradient.addColorStop(1, "rgba(255, 255, 255, 0)");     // Dark green at top
    // gradient.addColorStop(0, "rgba(180, 249, 134, 1)"); // White at bottom

    return {
      labels: labels,
      // labels: ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am"],
      datasets: [
        {
          label: title,
          // label: "Energy Consumption",
          data: data1,
          // data: [10, 15, 14, 22, 10, 12, 18, 22, 30],
          borderColor: hexToRgba(colorcode, 0.8),
          pointBackgroundColor: hexToRgba(colorcode, 1), // Full opacity for points
          pointBorderColor: hexToRgba(colorcode, 1), // Full opacity border for points
          // borderColor: "rgba(0, 200, 0, 0.8)",
          backgroundColor: gradient,
          tension: 0.4,
          // tension: 0,
          // tension: 0.4,
          fill: true,
          // pointBackgroundColor: "rgba(180, 249, 134, 1)",
          // pointBackgroundColor: "",
          // pointBorderColor: "green",
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      // y: { grid: { display: true }, beginAtZero: true },
      y: { 
        grid: { 
          display: true, 
          color: "rgba(0, 0, 0, 0.04)" // Adjust opacity (0.1 for lighter lines)
        }, 
        beginAtZero: true 
      }
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw; // Get the data value
            const unit = title === "Energy" ? "kWh" : title === "Revenue" ? "₹" : ""; 
            if(title === "Revenue"){
              return `${unit} ${value}`;
            }
            else{
              return `${value} ${unit}`;
            }
          }          
          // label: (context) => `${context.raw} ${labels.title === 'Energy'}kW`,
          // label: (context) => `${context.raw} kW`,
        },
      },
    },
  };

  return (
    <div style={{ height: 300 }}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default EnergyConsumptionCard;