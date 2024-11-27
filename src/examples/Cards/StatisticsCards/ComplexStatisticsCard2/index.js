import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Tag } from 'antd';

function LocationVisitsCard({ title, headers, items }) {
  return (
    <Card>
      {/* Card Title */}
      <MDBox py={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h5" fontWeight="medium">
          {title}
        </MDTypography>
        {/* <MDTypography variant="button" fontWeight="light" color="text">
          Docks
        </MDTypography> */}
      </MDBox>
      {/* <Divider /> */}

      {/* Header Row */}
      <MDBox display="flex" justifyContent="space-between" alignItems="center"
        px={2}
      // py={1}
      >
        {headers.map((header, index) => (
          <MDTypography
            key={index}
            variant="button"
            fontWeight="medium"
            color="text"
            style={{
              flex: header.flex || 1,
              // textAlign: index === 0 ? "left" : "center"
            }}
          >
            {header.label}
          </MDTypography>
        ))}
      </MDBox>
      <Divider />

      {/* List Items */}
      <MDBox>
        {items.map((item, index) => (
          <MDBox
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
          >
            {/* Row Content */}
            <MDTypography
              variant="button"
              color="text"
              style={{ flex: headers[0].flex || 1, textAlign: "left" }}
            >
              {index + 1 < 10 ? `0${index + 1}` : index + 1}
            </MDTypography>
            {
              item.type ?
            <MDTypography
              variant="button"
              fontWeight="medium"
              style={{
                flex: headers[1].flex || 1,
                paddingLeft: "0.5rem"
                // textAlign: "center" 
              }}
            >
              {item.type}
            </MDTypography>
            : null
            }
            <MDTypography
              variant="button"
              fontWeight="medium"
              style={{
                flex: item.type ? headers[2].flex : headers[1].flex || 2,
                // textAlign: "center" 
              }}
            >
              {item.name}
            </MDTypography>
            <MDBox
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="3rem"
              height="2rem"
              borderRadius="md"
              bgcolor="rgba(25, 128, 56, 0.2)"
              style={{
                flex: item.type ? headers[3].flex : headers[2].flex || 1,
                // textAlign: "center"
              }}
            >
              <Tag color={item.color}>{item.visits}</Tag>
              {/* <MDTypography variant="button" fontWeight="medium" color="success">
               
              </MDTypography> */}
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
    </Card>
  );
}

LocationVisitsCard.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      flex: PropTypes.number, // Optional for flexible column widths
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      visits: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default LocationVisitsCard;
