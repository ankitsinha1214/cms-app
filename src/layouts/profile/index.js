import { useState, useEffect } from "react";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
// import Divider from "@mui/material/Divider";

import { Divider } from 'antd';

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

import DataCard from "components/custom/DataCard";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
// Data
// import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function Overview() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [rows, setRows] = useState([]);
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
          // enqueueSnackbar(response.data.message, { variant: 'success' })

        } else {
          console.log(response.data);
          // enqueueSnackbar(response.data.message, { variant: 'error' })
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error?.response?.data?.message || error.message, { variant: 'error' });
        // window.location.reload();
      });
  };
  // Function to convert UTC to IST and format it
  const convertUTCtoIST = (utcDate) => {
    // console.log(utcDate);
    if (!utcDate || isNaN(new Date(utcDate).getTime())) {
        return 'N/A'; // Return 'N/A' if the date is invalid or missing
    }
    const timeZone = 'Asia/Kolkata'; // IST time zone
    const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
    // return format(zonedDate, 'yyyy-MM-dd \u00A0 HH:mm:ss'); // Format the date as desired
};
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox
          my={1}
        // mt={5} 
        // mb={3}
        >
          <Divider 
          // orientation="vertical"
          //  sx={{ ml: -2, mr: 1 }} 
           />
          {/* <Grid container spacing={1}> */}
          {/* <Grid item xs={12} md={6} xl={4}>
              <PlatformSettings />
            </Grid> */}
          {/* <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
              <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
              <ProfileInfoCard
                title="profile information"
                description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                info={{
                  fullName: "Alec M. Thompson",
                  mobile: "(44) 123 1234 123",
                  email: "alecthompson@mail.com",
                  location: "USA",
                }}
                social={[
                  {
                    link: "https://www.facebook.com/CreativeTim/",
                    icon: <FacebookIcon />,
                    color: "facebook",
                  },
                  {
                    link: "https://twitter.com/creativetim",
                    icon: <TwitterIcon />,
                    color: "twitter",
                  },
                  {
                    link: "https://www.instagram.com/creativetimofficial/",
                    icon: <InstagramIcon />,
                    color: "instagram",
                  },
                ]}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
              <Divider orientation="vertical" sx={{ mx: 0 }} />
            </Grid> */}
          {/* <Grid item xs={12} xl={4}> */}
          <Grid container direction="row" p={2}>
            {(<DataCard title="Username" value={rows?.username} count={3}  icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile1.svg`} />)}
            {/* {(<DataCard title="Username" value={rows?.username} count={3}  icon="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"  />)} */}
            {(<DataCard title="Department" value={rows?.department} count={3} icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile2.svg`} />)}
            {(<DataCard title="Phone Number" value={rows?.phone_number || '-'} count={3} icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile7.svg`} />)}
            {/* <Divider /> */}
            {(<DataCard title="Company" value={rows?.company} count={3} icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile4.svg`} />)}
            {(<DataCard title="Email ID" value={rows?.email  || '-'} count={3} icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile5.svg`} />)}
            {(<DataCard title="Created at" value={convertUTCtoIST(rows?.createdAt)} count={3} icon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/profile6.svg`} />)}
            {/* {(<DataCard title="Created at" value={rows?.createdAt} count={3} />)} */}
          </Grid>
          {/* <ProfilesList title="conversations" profiles={profilesListData} shadow={false} /> */}
          {/* </Grid> */}
          {/* </Grid> */}
        </MDBox>
        {/* <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Projects
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              Architects design houses
            </MDTypography>
          </MDBox>
        </MDBox> */}
        {/* <MDBox p={2}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor1}
                label="project #2"
                title="modern"
                description="As Uber works through a huge amount of internal management turmoil."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor2}
                label="project #1"
                title="scandinavian"
                description="Music is something that everyone has their own specific opinion about."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team3, name: "Nick Daniel" },
                  { image: team4, name: "Peterson" },
                  { image: team1, name: "Elena Morison" },
                  { image: team2, name: "Ryan Milly" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor3}
                label="project #3"
                title="minimalist"
                description="Different people have different taste, and various types of music."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <DefaultProjectCard
                image={homeDecor4}
                label="project #4"
                title="gothic"
                description="Why would anyone pick blue over pink? Pink is obviously a better color."
                action={{
                  type: "internal",
                  route: "/pages/profile/profile-overview",
                  color: "info",
                  label: "view project",
                }}
                authors={[
                  { image: team4, name: "Peterson" },
                  { image: team3, name: "Nick Daniel" },
                  { image: team2, name: "Ryan Milly" },
                  { image: team1, name: "Elena Morison" },
                ]}
              />
            </Grid>
          </Grid>
        </MDBox> */}
      </Header>

    </DashboardLayout>
  );
}

export default Overview;
