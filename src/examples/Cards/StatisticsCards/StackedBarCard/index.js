import React from "react";
import { Row, Col, Tooltip } from "antd";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";

const StackedBarCard = ({ title, data }) => {
  console.log(data)
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const dataWithPercentage = data.map(item => ({
    ...item,
    percentage: ((item.count / total) * 100).toFixed(2),
  }));
  return (
    <Card>
      <MDBox py={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h5" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox px={2}>
        <MDTypography variant="h4" fontWeight="medium" style={{ display: 'inline',paddingRight: '0.5rem' }}>
          {total}
          {/* Total */}
        </MDTypography>
        <MDTypography variant="button" fontWeight="light" color="text">
          Total
        </MDTypography>
      </MDBox>

      {/* Custom Segmented Progress Bar with Tooltip */}
      <MDBox py={1} px={2} display="flex" alignItems="center" style={{ width: '100%', height: '20px' }}>
        {dataWithPercentage.map((item, index) => {
          // Handle border-radius for the first and last segment only
          const borderRadius = index === 0 ? '5px 0 0 5px' : index === data.length - 1 ? '0 5px 5px 0' : '0';

          return (
            // <Tooltip title={`${item.percentage}% ${item.name}`} key={index}>
            <Tooltip
              title={
                <div style={{ whiteSpace: 'pre-line' }}>
                  {`${item.percentage}%\n${item.name}`}  {/* Break into two lines */}
                </div>
              }
              key={index}
            >
              <div
                style={{
                  backgroundColor: item.color,
                  width: `${item.percentage}%`, // Adjust width percentage here if necessary
                  height: '9px',
                  borderRadius: borderRadius, // Only apply border-radius to the first and last segment
                }}
              />
            </Tooltip>
          );
        })}
      </MDBox>

      {/* Legend for Vehicle Types */}
      <MDBox pb={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <Row gutter={[8, 8]} style={{ marginTop: 16,width: '100%' }}>
          {dataWithPercentage.map((item, index) => (
            <Col span={8} key={index}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    backgroundColor: item.color,
                    borderRadius: "2px",
                    // borderRadius: "50%",
                  }}
                ></span>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <MDTypography variant="h5" fontWeight="medium">
                    {item.percentage}%
                  </MDTypography>
                  <MDTypography variant="h6" fontWeight="light">
                    {item.name}
                  </MDTypography>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </MDBox>
    </Card>
  );
};

export default StackedBarCard;