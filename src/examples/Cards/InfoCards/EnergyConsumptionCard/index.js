import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const EnergyConsumptionCard = () => {
  const chartRef = useRef(null);

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");     // Dark green at top
    // gradient.addColorStop(0, "rgba(180, 249, 134, 0.3)");     // Dark green at top
    gradient.addColorStop(0, "rgba(180, 249, 134, 1)"); // White at bottom
    // console.log(gradient)

    return {
      labels: ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am"],
      datasets: [
        {
          label: "Energy Consumption",
          data: [10, 15, 14, 22, 10, 12, 18, 22, 30],
          borderColor: "rgba(0, 200, 0, 0.8)",
          backgroundColor: gradient,
          tension: 0.4,
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
      y: { grid: { display: true }, beginAtZero: true },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} kW`,
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

