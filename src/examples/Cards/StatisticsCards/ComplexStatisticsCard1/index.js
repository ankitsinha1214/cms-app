

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComplexStatisticsCard1({ color, title, title1, title2, colorcount1, colorcount2, count, count1, count2, percentage, icon, imgicon }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
      {icon ? (
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
    >
      {imgicon ? (
        <img
          src={imgicon}
          alt={title}
          style={{ width: "2rem", height: "2rem", objectFit: "contain" }}
        />
      ) : (
        <Icon fontSize="medium" color="inherit">
          {icon}
        </Icon>
      )}
    </MDBox>
  ) : null}
        {/* {
          icon ?
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
            >
             {imgicon ? (
            <img 
              src={imgicon} 
              alt={title} 
              style={{ width: "2rem", height: "2rem", objectFit: "contain" }}
            /> )
            :
              <(Icon fontSize="medium" color="inherit">
                {icon}
              </Icon>
            )}
            </MDBox>
            : 
            null
        } */}
        <MDBox textAlign="right" lineHeight={1.25}>
          {
            icon ?
              <MDTypography variant="button" fontWeight="light" color="text">
                {title}
              </MDTypography>
              :
              <MDTypography variant="h5" fontWeight="medium" py={1} >
                {title}
              </MDTypography>
          }
          <MDTypography variant="h3">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2} style={{ display: "flex", justifyContent: "space-evenly" }}>
        <MDBox textAlign="center" lineHeight={1.25}>
          <MDTypography style={{ color: colorcount1 ? colorcount1 : "#198038" }} variant="h3">{count1}</MDTypography>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title1}
          </MDTypography>
        </MDBox>
        <Divider orientation="vertical" style={{ minHeight: "9vh", color: "rgba(0, 0, 0, 0.11)" }} flexItem />
        <MDBox textAlign="center" lineHeight={1.25}>
          <MDTypography style={{ color: colorcount2 ? colorcount2 : "#DA1E28" }} variant="h3">{count2}</MDTypography>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title2}
          </MDTypography>
        </MDBox>
      </MDBox>
      {/* <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={percentage.color}
          >
            {percentage.amount}
          </MDTypography>
          &nbsp;{percentage.label}
        </MDTypography>
      </MDBox> */}
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard1.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard1.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard1;
