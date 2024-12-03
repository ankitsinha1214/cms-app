// @mui material components
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from "recharts";

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

function Dashboard() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { sales, tasks } = reportsLineChartData;
  const [locations, setLocations] = useState([]);
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
  const sampleData = [
    { name: "Orion mall", visits: 15, color: 'purple' },
    { name: "Metro kanakpura rd", visits: 10, color: 'purple' },
    { name: "Metro whitefield", visits: 9, color: 'purple' },
    { name: "1 MG mall", visits: 9, color: 'purple' },
    { name: "Mantri mall", visits: 9, color: 'purple' },
  ];
  const headers = [
    { label: "#", flex: 1, index: 0 },
    { label: "Vehicle", flex: 4, index: 1 },
    { label: "Visits", flex: 1, index: 2 },
  ];
  const sampleData1 = [
    { name: "Ather 450X", type: "2w", visits: 755, color: 'purple' },
    { name: "Tata Nexon EV max", type: "2w", visits: 755, color: 'purple' },
    { name: "Tata Tigor EV", type: "2w", visits: 755, color: 'magenta' },
    { name: "Audi etron GT", type: "2w", visits: 755, color: 'magenta' },
    { name: "Tata Piago", type: "2w", visits: 755, color: 'gold' },
  ];
  const headers1 = [
    { label: "#", flex: 1, index: 0 },
    { label: "Type", flex: 1, index: 1 },
    { label: "Vehicle", flex: 4, index: 2 },
    { label: "Sales", flex: 1, index: 3 },
  ];
  const data = [
    { name: "4 Wheeler", count: 70, color: "#4E57CE" },
    { name: "3 Wheeler", count: 20, color: "#FF3F6D" },
    { name: "2 Wheeler", count: 10, color: "#FFDC82" },
  ];
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
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total Chargers"
                count={300}
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
                icon="leaderboard"
                title="Active Chargers"
                count="287"
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
                color="success"
                icon="store"
                title="Inactive Chargers"
                count="13"
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
                count1={240}
                colorcount1="#C19B16"
                count2={60}
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
          <Grid item xs={12} md={12} lg={8}
            // mt={4}
            mb={8}
          >
            <MapComponent locations={locations} />
            <MDBox mt={6}>

              <Card sx={{ height: "100%" }}>

                <MDBox padding="1rem">
                  <MDTypography variant="h5" fontWeight="medium" mb={3} px={2}>
                    Energy dispersed
                  </MDTypography>
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
                  <ResponsiveContainer width="100%" height={400}>
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
                          stroke: darkMode ? 'white': "black",
                          fontFamily: "Roboto",
                          fontSize: 12
                        }} />
                      <YAxis tick={{
                          stroke: darkMode ? 'white': "black",
                          fontFamily: "Roboto",
                        // stroke: 'white', 
                        fontSize: 12
                      }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="Last Year" fill="#8884d8" />
                      <Bar dataKey="This Year" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                  {/* </MDBox> */}
                </MDBox>
              </Card>
              {/* <MDBox mt={4.5}> */}
              <Grid container spacing={3}>
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
              </Grid>
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={4} >
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
      </MDBox>

    </DashboardLayout>
  );
}

export default Dashboard;
