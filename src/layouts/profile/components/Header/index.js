import { useState, useEffect } from "react";
import axios from "axios";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
// import backgroundImage from "assets/images/bg-profile.jpeg";

function Header({ children }) {
  const backgroundImage = `${process.env.REACT_APP_AWS_BASEURL}cms-main-img/profile_bg_img.png`;
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    handleGetUserData();
  }, []);
  const handleGetUserData = () => {
    const details = JSON.parse(localStorage.getItem("data"));
    axios({
        method: "get",
        url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/user/" + details?._id,
        // data: payload, // JSON payload
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
        .then((response) => {
            // console.log(response);
            // Clean up after download
            // if (response.data.success === true) {
            if (response.data.success === true) { // Clean up after download
                const { data } = response.data;
                setRows(data);
                setIsLoading(false);
                enqueueSnackbar(response.data.message, { variant: 'success' })

            } else {
                console.log(response.data);
                enqueueSnackbar(response.data.message, { variant: 'error' })
                // window.location.reload();
            }
        })
        .catch((error) => {
            console.log(error);
            enqueueSnackbar(error?.response?.data?.message || error.message, { variant: 'error' });
            // window.location.reload();
        });
};

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          // backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
          //   `${linearGradient(
          //     rgba(gradients.info.main, 0.6),
          //     rgba(gradients.info.state, 0.6)
          //   )}, url(${backgroundImage})`,
            backgroundImage: ({ }) => `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {rows?.username}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                {/* CEO / Co-Founder */}
                {rows?.role}
              </MDTypography>
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
            <AppBar position="static">
              <Tabs orientation={tabsOrientation} value={tabValue} onChange={handleSetTabValue}>
                <Tab
                  label="App"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      home
                    </Icon>
                  }
                />
                <Tab
                  label="Message"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      email
                    </Icon>
                  }
                />
                <Tab
                  label="Settings"
                  icon={
                    <Icon fontSize="small" sx={{ mt: -0.25 }}>
                      settings
                    </Icon>
                  }
                />
              </Tabs>
            </AppBar>
          </Grid> */}
        </Grid>
        {children}
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
