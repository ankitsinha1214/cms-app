// @mui material components
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Typography } from '@mui/material';
import { useEffect, useState } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import Link from '@mui/material/Link';
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
import { Button } from "antd";
import { StopOutlined } from "@ant-design/icons";
import { Avatar, List } from 'antd';
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
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined,
    MinusCircleOutlined,
    SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import PopAddStopSession from "./PopAddStopSession";

// Helper function to calculate time difference
const timeAgo = (timestamp) => {
    console.log(timestamp)
    const now = new Date();
    const timeDifference = Math.floor((now - new Date(timestamp)) / 1000 / 60); // Difference in minutes
    console.log(new Date(timestamp))
    if (timeDifference === 0) {
        return "just updated";
    } else if (timeDifference === 1) {
        return "updated 1 min ago";
    } else {
        return `updated ${timeDifference} mins ago`;
    }
};

function ViewTransaction() {

    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { sales, tasks } = reportsLineChartData;
    const location = useLocation();
    const [content, setContent] = useState([]);
    const [isDisabled2, setIsDisabled2] = useState(false);
    console.log(location.state);
    // console.log(values1);
    // console.log(content);
    // State to store dynamic timestamp
    const [timestamp, setTimestamp] = useState(new Date());
    // const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        // setContent(location.state);
    }, []);
    const [metadata, setMetadata] = useState([]);
    const [currentData, setCurrentData] = useState({
        labels: [],
        datasets: { label: "", data: [] },
    });
    const [powerData, setPowerData] = useState({
        labels: [],
        datasets: { label: "", data: [] },
    });
    const [energyData, setEnergyData] = useState({
        labels: [],
        datasets: { label: "", data: [] },
    });
    const [locations, setLocations] = useState([]);
    const [dashboardData, setDashboardData] = useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    // const powerData = {
    //     labels: ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    //     datasets: [
    //       {
    //         label: "Power (kW)",
    //         data: [5, 15, 30, 20, 40, 50, 35, 45], // Example power values
    //         borderColor: "green",
    //         backgroundColor: "rgba(0, 255, 0, 0.1)",
    //         fill: true,
    //         tension: 0.4,
    //       },
    //     ],
    //   };

    const fetchSession = async () => {
        await axios.get(process.env.REACT_APP_BASEURL + `session/${location.state?._id}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        }).then((response) => {
            if (response.data.success) {
                const session = response.data.data;
                // const updatedRows = response.data.data.map(session => {
                if (session) {
                    const metadata = session.metadata || [];

                    // Get the first and last metadata values
                    const firstEntry = metadata[0]?.values?.["Energy.Active.Import.Register"];
                    const lastEntry = metadata[metadata.length - 1]?.values?.["Energy.Active.Import.Register"];

                    // Extract numeric values and handle missing values
                    const firstMeterValue = firstEntry ? parseFloat(firstEntry.split(" ")[0]) : 0;
                    const lastMeterValue = lastEntry ? parseFloat(lastEntry.split(" ")[0]) : 0;

                    // Calculate energy consumed
                    const energyConsumed = lastMeterValue && firstMeterValue ? (lastMeterValue - firstMeterValue).toFixed(4) : "0";

                    // Mask userPhone (assuming it's a string)
                    const userPhone = session.userPhone || "";
                    const maskedPhone = userPhone.length > 4
                        ? `+91 ${"X".repeat(userPhone.length - 7)}${userPhone.slice(-4)}`
                        : userPhone; // If phone is too short, keep it as is

                    //   return {
                    const updatedSession = {
                        ...session,
                        status: session.status === "Started" ? "Active"
                            : session.status === "Stopped" ? "Unpaid"
                                : session.status === "Completed" ? "Paid"
                                    : session.status, // Keep it unchanged if it doesn't match
                        energy_disp1: `${energyConsumed} Wh`,
                        userPhone: maskedPhone
                    };
                    // });
                    // Sort by createdAt in descending order (latest first)
                    // const sortedRows = updatedRows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    console.log(updatedSession)
                    setContent(updatedSession);
                    // setValues1((prevValues) => ({
                    //     ...prevValues,
                    //     charger_id: updatedSession.chargerId, // Update only charger_id
                    //   }));
                    const metadataResponse = updatedSession?.metadata;
                    // const metadataResponse = location.state.metadata;
                    // Transform metadata into graph-compatible format
                    // setTimestamp(metadataResponse[0].timestamp);
                    // Get the first energy value (to subtract it from the rest of the data)
                    const firstEnergyValue = parseFloat(metadataResponse[0].values["Energy.Active.Import.Register"]);
                    const transformedData = metadataResponse.map(entry => {
                        const energy = parseFloat(entry.values["Energy.Active.Import.Register"]);
                        return {
                            timestamp: new Date(entry.timestamp).toLocaleTimeString(), // Format timestamp
                            // energy: parseFloat(entry.values["Energy.Active.Import.Register"]), // Wh
                            energy: (energy - firstEnergyValue).toFixed(4), // Subtract the first energy value
                            power: parseFloat(entry.values["Power.Active.Import"]), // kW
                            voltage: parseFloat(entry.values["Voltage"]), // V
                            current: parseFloat(entry.values["Current.Import"]), // A
                            temperature: parseFloat(entry.values["Temperature"]), // Celsius
                            frequency: parseFloat(entry.values["Frequency"]) // Hz
                        };
                    });
                    // Extract distinct values for each field
                    // const distinctValues = {
                    //     energy: [...new Set(transformedData.map(item => item.energy))],
                    //     power: [...new Set(transformedData.map(item => item.power))],
                    //     voltage: [...new Set(transformedData.map(item => item.voltage))],
                    //     current: [...new Set(transformedData.map(item => item.current))],
                    //     temperature: [...new Set(transformedData.map(item => item.temperature))],
                    //     frequency: [...new Set(transformedData.map(item => item.frequency))]
                    // };

                    // console.log("Distinct Values:", distinctValues);

                    setMetadata(transformedData);
                    setPowerData({
                        labels: transformedData.map(item => item.timestamp),
                        datasets:
                        {
                            label: "Power (kW)",
                            data: transformedData.map(item => item.power),
                            borderColor: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.1)",
                            fill: true,
                            tension: 0.4,
                        },
                    });
                    setCurrentData({
                        labels: transformedData.map(item => item.timestamp),
                        datasets:
                        {
                            label: "Current (A)",
                            data: transformedData.map(item => item.current),
                            borderColor: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.1)",
                            fill: true,
                            tension: 0.4,
                        },
                    });
                    setEnergyData({
                        labels: transformedData.map(item => item.timestamp),
                        datasets:
                        {
                            label: "Energy (Wh)",
                            data: transformedData.map(item => item.energy),
                            borderColor: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.1)",
                            fill: true,
                            tension: 0.4,
                        },
                    });
                }
                // setContent(sortedRows);
            } else {
                enqueueSnackbar(response.data.message, { variant: 'error' });
            }
        }).catch(error => {
            console.error(error);
        });
    };
    useEffect(() => {
        if (
            localStorage.getItem("login_status") !== "true"
        ) {
            navigate("/sign-in");
        }
        // Set timestamp when page is visited
        setTimestamp(new Date());
        fetchSession();
        // setTimestamp(new Date().toLocaleTimeString());
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
        // const metadataResponse = content?.metadata;
        // // const metadataResponse = location.state.metadata;
        // // Transform metadata into graph-compatible format
        // // setTimestamp(metadataResponse[0].timestamp);
        // // Get the first energy value (to subtract it from the rest of the data)
        // const firstEnergyValue = parseFloat(metadataResponse[0].values["Energy.Active.Import.Register"]);
        // const transformedData = metadataResponse.map(entry => {
        //     const energy = parseFloat(entry.values["Energy.Active.Import.Register"]);
        //     return {
        //         timestamp: new Date(entry.timestamp).toLocaleTimeString(), // Format timestamp
        //         // energy: parseFloat(entry.values["Energy.Active.Import.Register"]), // Wh
        //         energy: (energy - firstEnergyValue).toFixed(4), // Subtract the first energy value
        //         power: parseFloat(entry.values["Power.Active.Import"]), // kW
        //         voltage: parseFloat(entry.values["Voltage"]), // V
        //         current: parseFloat(entry.values["Current.Import"]), // A
        //         temperature: parseFloat(entry.values["Temperature"]), // Celsius
        //         frequency: parseFloat(entry.values["Frequency"]) // Hz
        //     };
        // });
        // // Extract distinct values for each field
        // // const distinctValues = {
        // //     energy: [...new Set(transformedData.map(item => item.energy))],
        // //     power: [...new Set(transformedData.map(item => item.power))],
        // //     voltage: [...new Set(transformedData.map(item => item.voltage))],
        // //     current: [...new Set(transformedData.map(item => item.current))],
        // //     temperature: [...new Set(transformedData.map(item => item.temperature))],
        // //     frequency: [...new Set(transformedData.map(item => item.frequency))]
        // // };

        // // console.log("Distinct Values:", distinctValues);

        // setMetadata(transformedData);
        // setPowerData({
        //     labels: transformedData.map(item => item.timestamp),
        //     datasets:
        //     {
        //         label: "Power (kW)",
        //         data: transformedData.map(item => item.power),
        //         borderColor: "green",
        //         backgroundColor: "rgba(0, 255, 0, 0.1)",
        //         fill: true,
        //         tension: 0.4,
        //     },
        // });
        // setCurrentData({
        //     labels: transformedData.map(item => item.timestamp),
        //     datasets:
        //     {
        //         label: "Current (A)",
        //         data: transformedData.map(item => item.current),
        //         borderColor: "green",
        //         backgroundColor: "rgba(0, 255, 0, 0.1)",
        //         fill: true,
        //         tension: 0.4,
        //     },
        // });
        // setEnergyData({
        //     labels: transformedData.map(item => item.timestamp),
        //     datasets:
        //     {
        //         label: "Energy (Wh)",
        //         data: transformedData.map(item => item.energy),
        //         borderColor: "green",
        //         backgroundColor: "rgba(0, 255, 0, 0.1)",
        //         fill: true,
        //         tension: 0.4,
        //     },
        // });
    }, []);
    // Get the most recent timestamp (or pick one of the entries)
    const lastUpdated = metadata.length > 0 ? metadata[metadata.length - 1].timestamp : null;
    // console.log(powerData)
    const getValues1 = () => {
        return {
            charger_id: content?.chargerId || "",
            session_id: location.state?._id || "",
            reason: ""
        };
    };
    const [values1, setValues1] = useState(getValues1);
    useEffect(() => {
        if (content?.chargerId) {
            setValues1((prevValues) => ({
                ...prevValues,
                charger_id: content.chargerId, // Update only charger_id
            }));
        }
    }, [content]);
    const dataKeys = ["energy", "power", "voltage", "current", "temperature", "frequency"];
    // Find the max value across all rows and keys
    const maxValue = Math.max(...metadata.flatMap((row) => dataKeys.map((key) => row[key])));
    // console.log(maxValue)
    return (
        <DashboardLayout>
            <DashboardNavbar absolute isMini />
            <PopAddStopSession
                isDialog={isDisabled2}
                onClose={setIsDisabled2}
                value={values1}
            // onStateChange={props.onStateChange}
            />
            <MDBox pt={8}>
                <Grid container spacing={3}>
                    {/* Header Section */}
                    {/* <Grid item xs={12} sm={8}> */}
                    <Grid item xs={12} sm={8}>
                        {/* <Flex gap="4px 0" wrap> */}
                        {content?.status === "Paid" ?
                            <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginBottom: "1rem" }}>
                                Paid
                            </Tag>
                            : content?.status === "Active" ?
                                <Tag icon={<SyncOutlined spin />} color="warning" style={{ marginBottom: "1rem" }}>
                                    Active
                                </Tag>
                                : content?.status === "Unpaid" ?
                                    <Tag icon={<CloseCircleOutlined />} color="error" style={{ marginBottom: "1rem" }}>
                                        Unpaid
                                    </Tag>
                                    :
                                    <Tag icon={<MinusCircleOutlined />} color="default" style={{ marginBottom: "1rem" }}>
                                        {content?.status}
                                    </Tag>
                        }
                        {/* <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  warning
                </Tag> */}
                        {/* {JSON.stringify(data)} */}
                        {/* </Flex> */}
                        <Typography variant="h4" component="h1" gutterBottom>
                            {content?.chargerId}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ lineHeight: "36px" }}>
                            {content?.duration} &nbsp; | &nbsp; {content?.energy_disp1}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ lineHeight: "36px" }}>
                            {content?.chargerLocation?.locationName} &nbsp;|&nbsp; {content?.userPhone}
                            {/* &nbsp;|&nbsp; Public */}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: "36px" }}>
                            {content?.chargerLocation?.city}, {content?.chargerLocation?.state}
                        </Typography>
                        {/* Statistics Section */}
                        <Grid item xs={12}
                            sx={{
                                display: {
                                    xs: 'none',
                                    md: 'block'
                                }
                            }}
                        // md={6}
                        // style={{ marginTop: "2rem" }}
                        >
                            <br />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={4}
                        // sx={{ 
                        //     // my: 4,
                        //      textAlign: 'right' }}
                        sx={{
                            textAlign: {
                                xs: 'start', // Left-align for extra-small screens
                                md: 'end',   // Right-align for medium and larger screens
                            },
                        }}
                    >
                        {
                            content?.status === "Active" ?
                                <Button
                                    type="primary"
                                    danger
                                    icon={<StopOutlined />}
                                    size="large"
                                    // onClick={() => console.log("Stopping session...")}
                                    onClick={() => setIsDisabled2(!isDisabled2)}
                                >
                                    Stop Session
                                </Button>
                                : null
                        }
                        {/* <Typography variant="h5" component="h1" gutterBottom>
                            Started By {content?.startCreatedBy}
                        </Typography>
                        <Typography variant="p" sx={{ lineHeight: "36px" }}>
                            {content?.startCreatedBy} 
                            &nbsp; | &nbsp; {content?.startReason}
                            {content?.startReason && <>
                                &nbsp; | &nbsp; 
                                {content?.startReason}</>}
                        </Typography> */}
                        <List>
                            <List.Item>
                                <List.Item.Meta
                                    // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`} />}
                                    title={<>
                                        Started By {content?.startCreatedBy}
                                    </>
                                    }
                                    // <a href="https://ant.design">
                                    // {/* </a> */}
                                    description={content?.startReason}
                                />
                            </List.Item>
                        </List>
                        {
                            content?.stopCreatedBy && (
                                <>
                                    <List>
                                        <List.Item>
                                            <List.Item.Meta
                                                // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=0`} />}
                                                title={<>
                                                    Stopped By {content?.stopCreatedBy}
                                                </>
                                                }
                                                // <a href="https://ant.design">
                                                // {/* </a> */}
                                                description={content?.stopReason}
                                            />
                                        </List.Item>
                                    </List>
                                    {/* <Typography variant="h5" component="h1" gutterBottom>
                                        Stopped By {content?.stopCreatedBy}
                                    </Typography> */}
                                    {/* <Typography variant="p" sx={{ lineHeight: "36px" }}> */}
                                    {/* {content?.stopCreatedBy}  */}
                                    {/* &nbsp; | &nbsp; {content?.startReason} */}
                                    {/* {content?.stopReason && <> */}
                                    {/* &nbsp; | &nbsp;  */}
                                    {/* {content?.stopReason}</>} */}
                                    {/* </Typography> */}
                                </>
                            )
                        }

                        {/* <Link href="#" sx={{ textDecoration: 'underlined !important' }}>Stop Session</Link> */}
                    </Grid>
                </Grid>

                {/* <MDBox py={3}> */}

                {/* <Grid container spacing={3}> */}
                {/* <Grid item xs={12} md={12} lg={8}
                        // mt={4}
                        mb={8}
                    > */}
                {/* <MDBox mt={6}>
                            <Grid container spacing={3}> */}
                {/* <MDBox mt={4.5}> */}
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
                {/* </Grid> */}
                {/* </Grid> */}
                {/* <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsBarChart
                                    color="info"
                                    title="website views"
                                    description="Last Campaign Performance"
                                    date="campaign sent 2 days ago"
                                    chart={reportsBarChartData}
                                />
                            </MDBox>
                        </Grid> */}
                <Card>
                    <MDBox p={3}>
                        <MDTypography variant="h6" mb={2}>Session Information</MDTypography>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={metadata}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="timestamp" />
                                {/* <YAxis /> */}
                                {/* <YAxis domain={[0, 'dataMax + 200']} /> */}
                                {/* <YAxis domain={[0, 'auto']} allowDataOverflow /> */}
                                <YAxis domain={[0, maxValue + 50]} /> {/* Ensures Y-axis scales properly */}
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
                <MDBox mt={8}>
                    {/* <MDBox mt={4.5}> */}
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="info"
                                    title="Energy Dispersed (Wh)"
                                    description="Total energy dispersed in watt-hours over a given period."
                                    // description={
                                    //     <>
                                    //         (<strong>+15%</strong>) increase in today sales.
                                    //     </>
                                    // }
                                    date={lastUpdated ? `${timeAgo(timestamp)}` : "No data available"}
                                    // date="updated 4 min ago"
                                    chart={energyData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="success"
                                    title="Power (kW)"
                                    description="Power consumption in kilowatts over a specified time period."
                                    // description={
                                    //     <>
                                    //         (<strong>+15%</strong>) increase in today sales.
                                    //     </>
                                    // }
                                    date={lastUpdated ? `${timeAgo(timestamp)}` : "No data available"}
                                    // date="updated 4 min ago"
                                    chart={powerData}
                                />
                            </MDBox>
                        </Grid>
                        <Grid item xs={12} md={6} lg={4}>
                            <MDBox mb={3}>
                                <ReportsLineChart
                                    color="dark"
                                    title="Current (A)"
                                    description="Current (amperage) values recorded over a designated time period."
                                    // description="Last Campaign Performance"
                                    // date="just updated"
                                    // date={`Last updated at: ${timestamp}`} 
                                    date={lastUpdated ? `${timeAgo(timestamp)}` : "No data available"}
                                    chart={currentData}
                                />
                            </MDBox>
                        </Grid>
                    </Grid>
                </MDBox>
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