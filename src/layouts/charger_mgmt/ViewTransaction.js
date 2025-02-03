// @mui material components
import axios from "axios";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { LineChart, Line } from "recharts";
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
import { useLocation } from 'react-router-dom';
// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useSnackbar } from "notistack";

function ViewTransaction() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { sales, tasks } = reportsLineChartData;
    const location = useLocation();
    console.log(location.state);
    const [content, setContent] = useState([]);
    useEffect(() => {
        setContent(location.state);
    }, []);
    const [metadata, setMetadata] = useState([]);
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
    useEffect(() => {
        if (
            localStorage.getItem("login_status") !== "true"
        ) {
            navigate("/sign-in");
        }
        // axios({
        //   method: "get",
        //   url: process.env.REACT_APP_BASEURL + "charger-locations",
        //   headers: {
        //     "Authorization": `Bearer ${localStorage.getItem("token")}`
        //   },
        // })
        //   .then((response) => {
        //     // console.log(response.data.data);

        //     if (response.data.success === true) {
        //       // console.log(response.data);
        //       const element = [];
        //       const dataWithChargerCount = response.data.data.map(location => {
        //         const availCount = location.chargerInfo.filter(charger => charger.status === 'Available').length;
        //         const inuseCount = location.chargerInfo.filter(charger => charger.status === 'Inuse').length;
        //         const inactiveCount = location.chargerInfo.filter(charger => charger.status === 'Inactive').length;
        //         const ele = {
        //           name: location.locationName,
        //           direction: location.direction,
        //           availCount: availCount,
        //           inuseCount: inuseCount,
        //           inactiveCount: inactiveCount,
        //           data: location
        //         };
        //         element.push(ele);
        //         const acCount = location.chargerInfo.filter(charger => charger.type === 'AC').length;
        //         const dcCount = location.chargerInfo.filter(charger => charger.type === 'DC').length;
        //         const energyDisp = location.chargerInfo.reduce((total, charger) => {
        //           // console.log(charger);
        //           const energyValue = parseFloat(charger.energyConsumptions.replace(' kWh', ''));
        //           return total + energyValue;
        //         }, 0).toFixed(1) + ' kWh';
        //         const chargerInfoRep = location.chargerInfo.map(charger => ({
        //           locationType: charger.powerOutput,
        //           chargers: charger.subtype,
        //           locationName: charger.name,
        //           energy_disp: charger.energyConsumptions,
        //           status: charger.status === "Available" ? "Active" : charger.status === "Inuse" ? "Pending" : "Inactive",
        //           c_type: charger.type,
        //         }));
        //         return { ...location, energy_disp: energyDisp, chargers: location.chargerInfo.length, c_type: `AC: ${acCount}, DC: ${dcCount}`, chargerInfoRep: chargerInfoRep };
        //         // ...location,
        //         // ac: location.chargerInfo
        //       });
        //       // console.log(element);
        //       setLocations(element);
        //       // console.log(dataWithChargerCount);
        //       // setRows(dataWithChargerCount);
        //       // setIsLoading(false);
        //     } else {
        //       enqueueSnackbar(response.data.message, { variant: 'error' });
        //       // setIsLoading(false);
        //     }
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        const metadataResponse = location.state.metadata;
        // const metadataResponse = [
        //     {
        //         "timestamp": "2025-01-31T07:19:55Z",
        //         "values": {
        //             "Energy.Active.Import.Register": "307.402 Wh",
        //             "Power.Active.Import": "0.00 kW",
        //             "Voltage": "228.65 V",
        //             "Current.Import": "0.00 A",
        //             "Temperature": "0.00 Celsius",
        //             "Frequency": "50"
        //         }
        //     },
        //     {
        //         "timestamp": "2025-01-31T07:20:55Z",
        //         "values": {
        //             "Energy.Active.Import.Register": "308.500 Wh",
        //             "Power.Active.Import": "1.50 kW",
        //             "Voltage": "230.00 V",
        //             "Current.Import": "2.00 A",
        //             "Temperature": "25.00 Celsius",
        //             "Frequency": "49.9"
        //         }
        //     }
        // ];
        // Transform metadata into graph-compatible format
        const transformedData = metadataResponse.map(entry => ({
            timestamp: new Date(entry.timestamp).toLocaleTimeString(), // Format timestamp
            energy: parseFloat(entry.values["Energy.Active.Import.Register"]), // Wh
            power: parseFloat(entry.values["Power.Active.Import"]), // kW
            voltage: parseFloat(entry.values["Voltage"]), // V
            current: parseFloat(entry.values["Current.Import"]), // A
            temperature: parseFloat(entry.values["Temperature"]), // Celsius
            frequency: parseFloat(entry.values["Frequency"]) // Hz
        }));

        setMetadata(transformedData);
    }, []);
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={8}
                        // mt={4}
                        mb={8}
                    >
                        <MDBox mt={6}>

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
                <Card>
                    <MDBox p={3}>
                        <MDTypography variant="h6">Transaction Data</MDTypography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={metadata}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="energy" stroke="#8884d8" name="Energy (Wh)" />
                                <Line type="monotone" dataKey="power" stroke="#82ca9d" name="Power (kW)" />
                                <Line type="monotone" dataKey="voltage" stroke="#ffc658" name="Voltage (V)" />
                                <Line type="monotone" dataKey="current" stroke="#ff7300" name="Current (A)" />
                                <Line type="monotone" dataKey="temperature" stroke="#ff0000" name="Temperature (°C)" />
                                <Line type="monotone" dataKey="frequency" stroke="#0000ff" name="Frequency (Hz)" />
                            </LineChart>
                        </ResponsiveContainer>
                    </MDBox>
                </Card>
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

export default ViewTransaction;