// @mui material components
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from "recharts";
import React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Select,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import {CalendarMonthIcon} from '@mui/icons-material/CalendarMonth';
import DownloadIcon from '@mui/icons-material/Download';
import { useMaterialUIController } from "context";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import MDTypography from "components/MDTypography";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import Card from "@mui/material/Card";
import StackedBarCard from "examples/Cards/StatisticsCards/StackedBarCard";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import ComplexStatisticsCard1 from "examples/Cards/StatisticsCards/ComplexStatisticsCard1";
import LocationVisitsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard2";

import MapComponent from "../location_mgmt/components/MapComponent";
import { useNavigate } from "react-router-dom";
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useSnackbar } from "notistack";
import ActivePieCard from "examples/Cards/InfoCards/ActivePieCard";
import PieChart from "examples/Charts/PieChart";
import EnergyConsumptionCard from "examples/Cards/InfoCards/EnergyConsumptionCard";

import DownloadsIcon from "../../assets/images/download.svg"
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DashboardMap from "examples/Cards/InfoCards/DashboardMap";

function Dashboard() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState("Daily");
  const dateFormat = 'YYYY-MM-DD';
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    alert("Download function triggered!");
    handleMenuClose();
  };
  const { sales, tasks } = reportsLineChartData;
  const [locations, setLocations] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const data1 = [
    {
      "name": "Jan",
      "This Year": 650,
      "Last Year": 600
    },
    {
      "name": "Feb",
      "This Year": 700,
      "Last Year": 550
    },
    {
      "name": "Mar",
      "This Year": 200,
      "Last Year": 980
    },
    {
      "name": "Apr",
      "This Year": 278,
      "Last Year": 390
    },
    {
      "name": "May",
      "This Year": 189,
      "Last Year": 480
    },
    {
      "name": "Jun",
      "This Year": 239,
      "Last Year": 380
    },
    {
      "name": "Jul",
      "This Year": 349,
      "Last Year": 430
    },
    {
      "name": "Aug",
      "This Year": 390,
      "Last Year": 410
    },
    {
      "name": "Sep",
      "This Year": 490,
      "Last Year": 430
    },
    {
      "name": "Oct",
      "This Year": 430,
      "Last Year": 320
    },
    {
      "name": "Nov",
      "This Year": 430,
      "Last Year": 320
    },
    {
      "name": "Dec",
      "This Year": 430,
      "Last Year": 320
    },
  ]
  const chartData = {
    labels: ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am"],
    datasets: [
      {
        label: "Energy Consumption",
        data: [10, 15, 14, 22, 10, 12, 18, 22, 30], // Example values
        borderColor: "#B4F986",
        // borderColor: "rgba(0, 200, 0, 0.8)",
        pointBackgroundColor: "white",
        pointBorderColor: "green",
        pointRadius: 4,
        pointHoverRadius: 6,
        color: "success", // Make sure this matches a key in your theme colors
        // color: "rgba(180, 249, 134, 0)", // Make sure this matches a key in your theme colors
      },
    ],
  };

  const pieChartData = {
    labels: ["In Use", "Available"],
    datasets:
    {
      data: [(dashboardData?.inUseChargers) || 0, (dashboardData?.availableChargers) || 0], // Values for the Pie chart
      backgroundColors: ["info", "success",], // Colors for the sections
    },
    // ],
  };
  const sampleData = [
    { name: "Orion mall", visits: 15, energy: "124 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Orion mall1", visits: 15, energy: "124 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Orion mall2", visits: 15, energy: "124 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Orion mall3", visits: 15, energy: "124 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Orion mall4", visits: 15, energy: "124 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Metro kanakpura rd", visits: 10, energy: "24 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Metro whitefield", visits: 9, energy: "34 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "1 MG mall", visits: 9, energy: "42 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Mantri mall", visits: 9, energy: "1231 kWh", revenue: "₹ 1,25,120", color: 'purple' },
    { name: "Mantri mall", visits: 9, energy: "1231 kWh", revenue: "₹ 1,25,120", color: 'purple' },
  ];
  const headers = [
    { label: "#", flex: 1, index: 0 },
    { label: "Location", flex: 4, index: 1 },
    { label: "Energy", flex: 2, index: 2 },
    { label: "Revenue", flex: 3, index: 3 },
    { label: "Sessions", flex: 1, index: 4 },
  ];
  // const headers = [
  //   { label: "#", flex: 1, index: 0 },
  //   { label: "Location", flex: 4, index: 1 },
  //   { label: "Visits", flex: 1, index: 2 },
  // ];
  const sampleData1 = [
    { name: "Ather 450X", type: "2w", visits: 755, color: 'blue' },
    { name: "Ather 450X", type: "2w", visits: 755, color: 'blue' },
    { name: "Tata Nexon EV max", type: "4w", visits: 21, color: 'green' },
    { name: "Tata Tigor EV", type: "3w", visits: 755, color: 'orange' },
    { name: "Audi etron GT", type: "3w", visits: 755, color: 'orange' },
    { name: "Tata Piago", type: "4w", visits: 13, color: 'green' },
  ];
  // const sampleData1 = [
  //   { name: "Ather 450X", type: "2w", visits: 755, color: 'purple' },
  //   { name: "Tata Nexon EV max", type: "4w", visits: 755, color: 'gold' },
  //   { name: "Tata Tigor EV", type: "3w", visits: 755, color: 'magenta' },
  //   { name: "Audi etron GT", type: "3w", visits: 755, color: 'magenta' },
  //   { name: "Tata Piago", type: "4w", visits: 755, color: 'gold' },
  // ];
  const headers1 = [
    // { label: "#", flex: 1, index: 0 },
    { label: "Type", flex: 1, index: 0 },
    { label: "Vehicle", flex: 4, index: 1 },
    { label: "Visits", flex: 1, index: 2 },
    // { label: "Sales", flex: 1, index: 3 },
  ];
  const data = [
    { name: "2 Wheeler", count: dashboardData.twoWheelerUsers, color: "linear-gradient(to right, rgba(145,202,255,0.36), #91caff)" },
    // { name: "2 Wheeler", count: dashboardData.twoWheelerUsers, color: "linear-gradient(to right, rgba(0,188,212,0.36), rgba(10,221,248,1))" },
    { name: "3 Wheeler", count: dashboardData.threeWheelerUsers, color: "linear-gradient(to right, rgba(251,211,146,1), rgba(255,191,86,1))" },
    { name: "4 Wheeler", count: dashboardData.fourWheelerUsers, color: "linear-gradient(to right, rgba(227,255,208,1), rgba(174,255,120,1))" },
  ];
  // const data = [
  //   { name: "2 Wheeler", count: dashboardData.twoWheelerUsers, color: "#FFDC82" },
  //   { name: "3 Wheeler", count: dashboardData.threeWheelerUsers, color: "#FF3F6D" },
  //   { name: "4 Wheeler", count: dashboardData.fourWheelerUsers, color: "#4E57CE" },
  // ];
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "charger-locations",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        // console.log(response.data.data);

        if (response.data.success === true) {
          // console.log(response.data);
          const element = [];
          const dataWithChargerCount = response.data.data.map(location => {
            const availCount = location.chargerInfo.filter(charger => charger.status === 'Available').length;
            const inuseCount = location.chargerInfo.filter(charger => charger.status === 'Inuse').length;
            const inactiveCount = location.chargerInfo.filter(charger => charger.status === 'Inactive').length;
            const ele = {
              name: location.locationName,
              direction: location.direction,
              availCount: availCount,
              inuseCount: inuseCount,
              inactiveCount: inactiveCount,
              data: location
            };
            element.push(ele);
            const acCount = location.chargerInfo.filter(charger => charger.type === 'AC').length;
            const dcCount = location.chargerInfo.filter(charger => charger.type === 'DC').length;
            const energyDisp = location.chargerInfo.reduce((total, charger) => {
              // console.log(charger);
              const energyValue = parseFloat(charger.energyConsumptions.replace(' kWh', ''));
              return total + energyValue;
            }, 0).toFixed(1) + ' kWh';
            const chargerInfoRep = location.chargerInfo.map(charger => ({
              locationType: charger.powerOutput,
              chargers: charger.subtype,
              locationName: charger.name,
              energy_disp: charger.energyConsumptions,
              status: charger.status === "Available" ? "Active" : charger.status === "Inuse" ? "Pending" : "Inactive",
              c_type: charger.type,
            }));
            return { ...location, energy_disp: energyDisp, chargers: location.chargerInfo.length, c_type: `AC: ${acCount}, DC: ${dcCount}`, chargerInfoRep: chargerInfoRep };
            // ...location,
            // ac: location.chargerInfo
          });
          // console.log(element);
          setLocations(element);
          // console.log(dataWithChargerCount);
          // setRows(dataWithChargerCount);
          // setIsLoading(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          // setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    fetchAllChargers();
  }, []);
  const fetchAllChargers = () => {
    // axios.post(process.env.REACT_APP_BASEURL + "charger-locations/dashboard/get-data", {
    //   headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    // })
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "charger-locations/dashboard/get-data",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success) {
          setDashboardData(response.data.data);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      }).catch(error => {
        console.error(error);
      });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Total+charger.png`}
                color="dark"
                // icon="weekend"
                title="Total Chargers"
                count={dashboardData?.totalChargers || 0}
              // percentage={{
              //   color: "success",
              //   amount: "+55%",
              //   label: "than lask week",
              // }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                // icon="leaderboard"
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Inactive+Charger.png`}
                title="Active Chargers"
                color="success"
                count={(dashboardData?.availableChargers + dashboardData?.inUseChargers) || 0}
                // count="287"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="error"
                // icon="store"
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Active+charger.png`}
                title="Inactive Chargers"
                count={(dashboardData?.inactiveChargers) || 0}
                // count="13"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard1
                color="dark"
                // icon="weekend"
                title="Active Chargers"
                title1="Inuse"
                title2="Available"
                // count={300}
                // count1={240}
                count1={(dashboardData?.inUseChargers) || 0}
                count2={(dashboardData?.availableChargers) || 0}
                // colorcount1="#C19B16"
                colorcount1="#95C1DF"
                // count2={47}
                colorcount2="#198038"
              // percentage={{
              //   color: "success",
              //   amount: "+55%",
              //   label: "than lask week",
              // }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12}
            // lg={8}
            // mt={4}
            mb={4}
          // mb={8}
          >
            <DashboardMap locations={locations} />
            {/* <MapComponent locations={locations} /> */}


            {/* <MDBox mt={6}> */}

            {/* <Card sx={{ height: "100%" }}>

                <MDBox padding="1rem">
                  <MDTypography variant="h5" fontWeight="medium" mb={3} px={2}>
                    Energy dispersed
                  </MDTypography> */}
            {/* <MDBox
                    variant="gradient"
                    bgColor="dark"
                    borderRadius="lg"
                    coloredShadow="dark"
                    py={2}
                    pr={0.5}
                    mt={-5}
                  // height="12.5rem"
                  > */}
            {/* <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      width={730}
                      height={350}
                      data={data1}
                      style={{
                        color: darkMode ? "white" : "black"
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name"
                        tick={{
                          stroke: darkMode ? 'white' : "#344767",
                          // stroke: darkMode ? 'white': "black",
                          fontFamily: "Roboto",
                          fontSize: "0.875 rem",
                          fontWeight: "600",
                          // fontSize: 12
                        }} />
                      <YAxis tick={{
                        stroke: darkMode ? 'white' : "#344767",
                        fontFamily: "Roboto",
                        // stroke: 'white', 
                        // fontSize: 12
                        fontSize: "0.875 rem",
                        fontWeight: "600",
                      }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Last Year" fill="#7B7777" /> */}
            {/* <Bar dataKey="Last Year" fill="#8884d8" /> */}
            {/* <Bar dataKey="This Year" fill="#82ca9d" /> */}
            {/* <Bar dataKey="This Year" fill="#66BB6A" />
                    </BarChart>
                  </ResponsiveContainer> */}
            {/* </MDBox> */}
            {/* </MDBox>
              </Card> */}
            {/* <MDBox mt={4.5}> */}
            {/* <Grid container spacing={3}> */}
            {/* <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsBarChart
                      color="info"
                      title="website views"
                      description="Last Campaign Performance"
                      date="campaign sent 2 days ago"
                      chart={reportsBarChartData}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="daily sales"
                      description={
                        <>
                          (<strong>+15%</strong>) increase in today sales.
                        </>
                      }
                      date="updated 4 min ago"
                      chart={sales}
                    />
                  </MDBox>
                </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
            {/* </Grid>
            </MDBox> */}
          </Grid>

          {/* Prev version */}
          {/* <Grid item xs={12} md={12} lg={4} >
            <MDBox mb={1.5}>
              <LocationVisitsCard
                title="Location visits"
                items={sampleData}
                headers={headers}
              />
            </MDBox>
            <MDBox mb={1.5}>
              <LocationVisitsCard
                title="Vehicle data"
                items={sampleData1}
                headers={headers1}
              />
            </MDBox>
            <MDBox mb={1.5}>
              <StackedBarCard
                title="Vehicle Type"
                data={data}
              // headers={headers1}
              />
            </MDBox>
          </Grid> */}


        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={8} mb={4} >
            <Card sx={{ height: "100%" }}>

              <MDBox padding="1rem" >
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  // alignItems: window.innerWidth < 600 ? "start": "center",
                  marginBottom: "1rem",
                  paddingRight: "1rem",
                  flexDirection: window.innerWidth < 600 ? "column" : "row", // Responsive flex-direction
                  gap: "0.5rem",
                }}>
                  <MDTypography variant="h5" fontWeight="medium"
                    // mb={3} 
                    // px={2}
                    sx={{
                      fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" }, // Responsive font size
                      textAlign: { xs: "left", sm: "left" }, // Center text on mobile, left-align on larger screens
                    }}
                  >
                    Energy Dispersed
                  </MDTypography>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* <IconButton size="small">
                      <CalendarTodayIcon fontSize="small" />
                    </IconButton> */}
                    {/* <DatePicker
      open={false} // Prevents default opening
      onClick={(e) => e.stopPropagation()} // Stops unwanted propagation
      renderExtraFooter={() => null} // Removes any footer
      popupStyle={{ minWidth: 300 }} // Ensures proper popup width
      inputRender={() => (
        <IconButton size="small">
          <CalendarTodayIcon fontSize="small" />
        </IconButton>
      )}
    /> */}
                    <DatePicker
                      defaultValue={dayjs(selectedDate, dateFormat)}
                    />
                    <Select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      size="large"
                      sx={{ mx: 1, height: "2rem" }}
                    >
                      <MenuItem value="Daily">Daily</MenuItem>
                      <MenuItem value="Weekly">Weekly</MenuItem>
                      <MenuItem value="Monthly">Monthly</MenuItem>
                    </Select>
                    <IconButton size="large" sx={{ padding: "0px" }} style={{
                      color: darkMode ? "white" : "black"
                    }}>
                      <img src={DownloadsIcon} onClick={handleDownload}
                      //  fontSize="small" 
                      />
                      {/* <DownloadIcon onClick={handleDownload}
                      //  fontSize="small" 
                      /> */}
                    </IconButton>
                    {/* <IconButton size="small" onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton> */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={handleDownload}>Download</MenuItem>
                    </Menu>
                  </div>
                </div>
                <EnergyConsumptionCard />
                {/* <GradientLineChart
                  // title="Energy Consumption"
                  // description="This chart shows energy consumption trends"
                  // height="300px"
                  chart={chartData}
                  // icon={{ color: "info", component: "bar_chart" }}
                /> */}

              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <MDBox mb={4} >
              {/* <PieChart
                // icon={{ color: "primary", component: "pie_chart" }}
                title="Sales Distribution"
                // description="Breakdown of sales by category"
                // height="300px"
                chart={pieChartData}
              /> */}
              <ActivePieCard
                // color="info"
                // title="website views"
                // description="Last Campaign Performance"
                // date="campaign sent 2 days ago"
                // chart={reportsBarChartData}
                chart={pieChartData}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox> */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} lg={4} >
            <MDBox mb={1.5}>
              <LocationVisitsCard
                title="Vehicles Data"
                items={sampleData1}
                headers={headers1}
                type="location"
              />
            </MDBox>
            <MDBox mb={1.5}>
              <StackedBarCard
                // title="Vehicle Type"
                data={data}
                type="vehicle"
              // headers={headers1}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={8} >
            <MDBox mb={1.5}>
              <LocationVisitsCard
                title="Top Locations"
                items={sampleData}
                headers={headers}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>

    </DashboardLayout >
  );
}

export default Dashboard;
