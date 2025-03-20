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
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import usersIcon from "../../assets/images/4.svg"
import { DatePicker } from "antd";
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
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

import DashboardDrawer from "./DashboardDrawer";
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
import dashboard3 from "../../assets/images/dashboard3.svg"
import dashboard2 from "../../assets/images/session.svg"
import dashboard1 from "../../assets/images/dashboard1.svg"
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import DashboardMap from "examples/Cards/InfoCards/DashboardMap";
import DashboardCard from "examples/Cards/InfoCards/DashboardCard";
import DashboardTopCard from "examples/Cards/InfoCards/DashboardTopCard";
// import Loader from "components/custom/Loader";
import animationData from "../../assets/animations/animation1.json";
const { RangePicker } = DatePicker;

function Dashboard() {
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [selectedDate1, setSelectedDate1] = useState(dayjs());
  const [timeRange1, setTimeRange1] = useState("hourly");
  const handleMenuOpen1 = (event) => setAnchorEl1(event.currentTarget);
  const handleMenuClose1 = () => setAnchorEl1(null);
  const handleDownload1 = () => {
    // alert("Download1 function triggered!");
    handleDownloadExcel();
    handleMenuClose1();
  };
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerTitle, setDrawerTitle] = useState("");
  const [drawerRowData, setDrawerRowData] = useState([]); // Store table data
  const [fromDate, setFromDate] = useState(null);
  const [fromDate1, setFromDate1] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [toDate1, setToDate1] = useState(null);

  // const [animationData, setAnimationData] = useState(null);

  // useEffect(() => {
  //   const fetchAnimation = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.REACT_APP_AWS_BASEURL}cms-icons/animation1.json`);
  //     console.log("Fetched animation JSON:", response.data); // ✅ Debugging line
  //       setAnimationData(response.data);
  //     } catch (error) {
  //       console.error("Error loading animation:", error);
  //     }
  //   };

  //   fetchAnimation();
  // }, []);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState("hourly");
  const dateFormat = 'YYYY-MM-DD';
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    // alert("Download function triggered!");
    handleDownloadExcelSingle();
    handleMenuClose();
  };
  const { sales, tasks } = reportsLineChartData;
  const [locations, setLocations] = useState([]);
  const [dashboardData, setDashboardData] = useState({});
  const [graphData, setGraphData] = useState({});
  const [mapLoaded, setMapLoaded] = useState(false);
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

  const [selectedTitle, setSelectedTitle] = useState("User");
  const [selectedLabels, setSelectedLabels] = useState(graphData?.labels || []);
  const [selectedData, setSelectedData] = useState(graphData?.users || []);
  const handleDownloadExcel = async () => {
    if (!graphData || !graphData.labels) {
      console.error("Graph data is missing!");
      return;
    }

    // Create a new workbook and sheets
    const workbook = new ExcelJS.Workbook();

    // Function to create a sheet with styling
    const createStyledSheet = (sheetName, data) => {
      const sheet = workbook.addWorksheet(sheetName);

      // Add headers (labels)
      const headerRow = sheet.addRow(["Labels", ...graphData.labels]);
      headerRow.font = { bold: true, size: 14 };
      headerRow.alignment = { horizontal: "center", vertical: "middle" };

      // Apply yellow background fill to headers
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" }, // Yellow highlight
        };
      });

      // Add data row
      const dataRow = sheet.addRow(["Data", ...data]);

      // Apply styles (borders, alignment)
      sheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "center", vertical: "middle" };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // Auto-fit column width
      sheet.columns.forEach((column) => {
        column.width = 15;
      });
    };

    // Create sheets for each dataset
    createStyledSheet("Users", graphData.users);
    createStyledSheet("Energy", graphData.energy);
    createStyledSheet("Sessions", graphData.sessions);
    createStyledSheet("Revenue", graphData.revenue);

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "cms_chrgup_data.xlsx");
  };
  const handleDownloadExcelSingle = async () => {
    if (!selectedTitle || !selectedLabels || !selectedData) {
      console.error("Some data is missing!");
      return;
    }

    // Create a new workbook and sheets
    const workbook = new ExcelJS.Workbook();

    // Function to create a sheet with styling
    const createStyledSheet = (sheetName, data) => {
      const sheet = workbook.addWorksheet(sheetName);

      // Add headers (labels)
      const headerRow = sheet.addRow(["Labels", ...selectedLabels]);
      headerRow.font = { bold: true, size: 14 };
      headerRow.alignment = { horizontal: "center", vertical: "middle" };

      // Apply yellow background fill to headers
      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFF00" }, // Yellow highlight
        };
      });

      // Add data row
      const dataRow = sheet.addRow(["Data", ...selectedData]);

      // Apply styles (borders, alignment)
      sheet.eachRow((row) => {
        row.eachCell((cell) => {
          cell.alignment = { horizontal: "center", vertical: "middle" };
          cell.border = {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          };
        });
      });

      // Auto-fit column width
      sheet.columns.forEach((column) => {
        column.width = 15;
      });
    };

    // Create sheets for each dataset
    createStyledSheet(selectedTitle, graphData.users);
    // createStyledSheet("Energy", graphData.energy);
    // createStyledSheet("Sessions", graphData.sessions);
    // createStyledSheet("Revenue", graphData.revenue);

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "cms_chrgup_data.xlsx");
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

  // Function to fetch data from API when a card is clicked
  // const handleOpenDrawer = async (title, apiEndpoint) => {
  //   try {
  //     const response = await axios.get(apiEndpoint); // Call API
  //     setDrawerRowData(response.data); // Set table data
  //     setDrawerTitle(title); // Set drawer title
  //     setDrawerOpen(true);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const handleOpenDrawer = (title, apiEndpoint) => {
    const dummyData = [
      { id: 1, name: "Charger A", status: "Active", createdAt: "2024-02-28" },
      { id: 2, name: "Charger B", status: "Inactive", createdAt: "2024-02-25" },
      { id: 3, name: "Charger C", status: "Active", createdAt: "2024-02-20" },
    ];
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "charger-locations/" + apiEndpoint,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {

        if (response.data.success === true) {
          // console.log(response.data);
          const element = response.data.data;
          // setIsLoading(false);
          setDrawerRowData(element);
          setIsLoading(false);
          setDrawerTitle(title); // Set drawer title
          setDrawerOpen(true);
        } else {
          enqueueSnackbar(response?.data?.message, { variant: 'error' });
          const element = response.data.data;
          setDrawerRowData(element);
          setIsLoading(false);
          setDrawerTitle(title); // Set drawer title
          setDrawerOpen(true);
          // setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setDrawerTitle(title);
      });
    // setIsLoading(false);
    // setDrawerTitle(title); // Set drawer title
    // setDrawerOpen(true);
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
    { name: "2 Wheeler", count: dashboardData.twoWheelerUsers ?? 0, color: "linear-gradient(to right, rgba(145,202,255,0.36), #91caff)" },
    // { name: "2 Wheeler", count: dashboardData.twoWheelerUsers, color: "linear-gradient(to right, rgba(0,188,212,0.36), rgba(10,221,248,1))" },
    { name: "3 Wheeler", count: dashboardData.threeWheelerUsers ?? 0, color: "linear-gradient(to right, rgba(251,211,146,1), rgba(255,191,86,1))" },
    { name: "4 Wheeler", count: dashboardData.fourWheelerUsers ?? 0, color: "linear-gradient(to right, rgba(227,255,208,1), rgba(174,255,120,1))" },
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
    fetchAllGraphData();
  }, []);
  useEffect(() => {
    fetchAllGraphData();
  }, [timeRange1, fromDate1, toDate1]);
  useEffect(() => {
    fetchAllGraphData1();
  }, [timeRange, fromDate, toDate]);
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
  const fetchAllGraphData = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "graph/?filter=" + timeRange1 + '&start=' + fromDate1 + '&end=' + toDate1,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.status) {
          setGraphData(response.data.data);
          // setSelectedTitle('User');
          // setSelectedLabels(response?.data?.data?.labels);
          // setSelectedData(response?.data?.data?.users);
        } else {
          enqueueSnackbar(response?.data?.message, { variant: 'error' });
        }
      }).catch(error => {
        console.error(error);
      });
  };
  const fetchAllGraphData1 = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "graph/?filter=" + timeRange + '&start=' + fromDate + '&end=' + toDate,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.status) {
          // setGraphData(response.data.data);
          // setSelectedTitle('User');
          setSelectedLabels(response?.data?.data?.labels);
          if (selectedTitle === 'User') {
            setSelectedData(response?.data?.data?.users);
          } else if (selectedTitle === 'Sessions') {
            setSelectedData(response?.data?.data?.sessions);
          } else if (selectedTitle === 'Revenue') {
            setSelectedData(response?.data?.data?.revenue);
          } else {
            setSelectedData(response?.data?.data?.energy);
          }
        } else {
          enqueueSnackbar(response?.data?.message, { variant: 'error' });
        }
      }).catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("maploaded") === "true") {
      setMapLoaded(true);
    }
    else {
      setMapLoaded(false);
    }
  }, [localStorage.getItem("maploaded")]);


  const handleCardClick = (title, labels, data) => {
    // console.log(data)
    setTimeRange(timeRange1);
    setSelectedTitle(title);
    setSelectedLabels(labels);
    setSelectedData(data);
  };
  console.log(selectedLabels)
  console.log(selectedData)
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Reusable Drawer with Dynamic Data */}
      <DashboardDrawer title={drawerTitle} open={drawerOpen} onClose={() => setDrawerOpen(false)} rowData={drawerRowData} isLoading={isLoading} />
      <MDBox
      // pb={1}
      // pb={3}
      // py={3}
      >
        <Grid container spacing={3} mt={1} sx={{
          display: {
            xs: "flex",
            lg: "none",
          },
        }}>
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
        {/* { */}
        {/* // (mapLoaded) ?
    // (localStorage.getItem("maploaded") === "true") ? */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}
            // lg={8}
            // mt={4}
            mb={4}
          // zIndex={1}
          // mb={8}
          >
            {/* Map Section */}
            <div
              // className="relative"
              style={{
                //  height: (mapLoaded) && "100%",
                height: (mapLoaded) && "80vh",
                marginBottom: "40px"
              }}>
              {/* Header Controls */}
              {(mapLoaded) &&
                <Grid container spacing={2}
                  // mx={8} 
                  // px={8} 
                  px={4}
                  // p={2} 
                  sx={{
                    // position: "relative",
                    position: {
                      md: "static", // Default position for xs screens
                      // md: "relative", // Apply relative for md and larger
                      lg: "relative",
                    },
                    display: {
                      xs: "none",
                      lg: "flex",
                    },
                    top: "8%",
                    // display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    // transform: "translateX(-50%)",
                    zIndex: 10,
                    // background: "rgba(255, 255, 255, 0.9)",
                    // padding: "10px",
                    // borderRadius: "8px",
                    // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    // bottom:"53%"
                  }}>
                  {/* Charger Stats */}
                  <div className="flex flex-wrap space-x-4" style={{ display: "flex", flexDirection: "row" }}>
                    <DashboardTopCard
                      imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/total_dash.svg`} label="Total Charger" bgcolor="#66BB6A"
                      count={(dashboardData?.totalChargers) || 0}
                      onClick={() => handleOpenDrawer("Total Chargers", "dashboard/charger?status=all")}
                    />
                    <DashboardTopCard
                      imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Inactive+Charger.png`} label="Active Charger" bgcolor="#C4EA65" count={(dashboardData?.availableChargers + dashboardData?.inUseChargers) || 0}
                      onClick={() => handleOpenDrawer("Active Chargers", "dashboard/charger?status=active")}
                    />
                    <DashboardTopCard imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Active+charger.png`} label="Inactive Charger" bgcolor="#FF7878" count={(dashboardData?.inactiveChargers) || 0}
                      onClick={() => handleOpenDrawer("Inactive Chargers", "dashboard/charger?status=inactive")}
                    />
                    {/* <span className="px-3 py-1 bg-green-100 text-green-700 rounded">Total Charger (300)</span>
                  <span className="px-3 py-1 bg-green-200 text-green-900 rounded">Active Charger (300)</span>
                  <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Inactive Charger (300)</span> */}
                  </div>

                  {/* Date & Time Range Picker */}
                  {/* <div className="flex flex-wrap space-x-4 items-center"> */}
                  {/* <div className="flex space-x-4 items-center"> */}
                  <MDBox sx={{ display: "flex", alignItems: "center" }}>
                    <MDBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                      {/* <MDTypography
            variant="h5"
            fontWeight="medium"
            sx={{
              fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" },
              textAlign: { xs: "left", sm: "left" },
            }}
          >
            Energy Dispersed
          </MDTypography> */}

                      {/* <div className="flex items-center"> */}
                      {/* <DatePicker defaultValue={dayjs(selectedDate1, dateFormat)} /> */}
                      {
                        timeRange1 === "custom" && <RangePicker
                          size="medium"
                          format="YYYY-MM-DD"
                          // format="YYYY-MM-DD HH:mm:ss"
                          onChange={(value, dateString) => {
                            console.log('Formatted Selected Time: ', dateString);
                            setFromDate1(dateString[0]);
                            setToDate1(dateString[1]);
                          }}
                        />
                      }
                      <Select
                        value={timeRange1}
                        onChange={(e) => setTimeRange1(e.target.value)}
                        size="small"
                        sx={{
                          mx: 1, height: "2rem",
                          backgroundColor: "#F6F6F6",
                        }}
                      >
                        <MenuItem value="today">Today</MenuItem>
                        <MenuItem value="yesterday">Yesterday</MenuItem>
                        <MenuItem value="hourly">Last 24 hours</MenuItem>
                        <MenuItem value="daily">Last 7 days</MenuItem>
                        <MenuItem value="last30">Last 30 days</MenuItem>
                        <MenuItem value="monthly">Last 12 months</MenuItem>
                        <MenuItem value="custom">Custom</MenuItem>
                      </Select>
                      <IconButton
                        onClick={handleDownload1}
                        sx={{
                          // width: "1.5rem",
                          // height: "1.5rem",
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                          // backgroundColor: "#F6F6F6",
                          // padding: "5px",
                          width: "2rem", // Adjust width for better visibility
                          height: "2rem", // Keep height as needed
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#F6F6F6",
                          padding: "5px",
                          borderRadius: "4px",
                          transition: "background-color 0.3s ease", // Smooth transition effect
                          "&:hover": {
                            backgroundColor: "#A6DBFF", // Light gray on hover
                          },
                        }}
                      >
                        <img
                          src={DownloadsIcon}
                          alt="Download"
                          style={{
                            width: "1rem", // Adjust the icon size to match other elements
                            height: "1rem",
                            objectFit: "contain",
                          }}
                        />
                      </IconButton>
                      {/* <IconButton onClick={handleDownload1} sx={{
                      padding: "0px", color: darkMode ? "white" : "black",
                      backgroundColor: "#F6F6F6",
                    }}>
                      <img src={DownloadsIcon} alt="Download" />
                    </IconButton> */}
                    </MDBox>
                  </MDBox>
                  {/* </div> */}
                </Grid>
              }
              {/* <MDBox sx={{
                width: "17%",
                position: "absolute",
                top: "10%",
                zIndex: "14"
              }}>
                <DashboardTopCard lottieicon={animationData} label="Live session" bgcolor="#F6F6F6" count={(dashboardData?.inactiveChargers) || 0} />
              </MDBox> */}
              {/* <DashboardTopCard lottieicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/animation1.json`} label="Live session" bgcolor="#F6F6F6" count={(dashboardData?.inactiveChargers) || 0} /> */}
              <MapComponent locations={locations} givenHeight="80vh" zoomLevel={4} />

              {(mapLoaded) &&
                <Grid container spacing={2}
                  // mx={8} 
                  // px={8} 
                  px={2}
                  // p={2} 
                  sx={{
                    // position: "relative",
                    position: {
                      md: "static", // Default position for xs screens
                      // md: "relative", // Apply relative for md and larger
                      lg: "relative",
                    },
                    display: {
                      xs: "none",
                      lg: "flex",
                    },
                    bottom: "41%"
                    // bottom:"53%"
                  }}>

                  <Grid item xs={12}>
                    <MDBox sx={{
                      width: "18%",
                      // position: "relative",
                      position: {
                        md: "static", // Default position for xs screens
                        // md: "relative", // Apply relative for md and larger
                        lg: "relative",
                      },
                      display: {
                        xs: "none",
                        lg: "block",
                      },
                      top: "0%",
                      zIndex: "14",
                      marginBottom: "1rem"
                    }}>
                      {/* <DashboardTopCard lottieicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/animation1.json`} label="Live session" bgcolor="#F6F6F6" count={(dashboardData?.inactiveChargers) || 0} /> */}
                      <DashboardTopCard lottieicon={animationData} label="Live session" bgcolor="#F6F6F6" count={(dashboardData?.activeSessions) || 0}
                        onClick={() => handleOpenDrawer("Live Session", "dashboard/charger?status=live")}
                      />
                    </MDBox>
                  </Grid>
                  {/* <Grid item xs={12} md={6} lg={3}>
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
          </Grid> */}
                  {/* <Grid item xs={12} md={6} lg={3}>
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
          </Grid> */}
                  {/* <Grid item xs={12} md={6} lg={3}>
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
          </Grid> */}
                  {/* <Grid item xs={12} md={6} lg={3}>
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
          </Grid> */}
                  <Grid item xs={12} md={6} lg={3} onClick={() => handleCardClick("User", graphData?.labels || [], graphData?.users || [])}>
                    <MDBox mb={1.5}>
                      <DashboardCard
                        color="info"
                        colorcode="#49a3f1"
                        selectedCardCode="#E3F2FF"
                        imgicon={dashboard1}
                        title="User"
                        isSelected={selectedTitle === "User"}
                        count={graphData?.total?.users || 0}
                        labels={graphData?.labels?.length || 0}
                        data1={graphData?.users || []}
                        percentage={{
                          color: "success",
                          amount: "+1%",
                          label: "than yesterday",
                        }}
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3} onClick={() => handleCardClick("Session", graphData?.labels || [], graphData?.sessions || [])}>
                    <MDBox mb={1.5}>
                      <DashboardCard
                        color="purple"
                        colorcode="#C5C0FF"
                        selectedCardCode="#F1F0FF"
                        imgicon={dashboard2}
                        title="Session"
                        isSelected={selectedTitle === "Session"}
                        count={graphData?.total?.sessions || 0}
                        labels={graphData?.labels?.length || 0}
                        data1={graphData?.sessions || []}
                        percentage={{
                          color: "success",
                          amount: "+1%",
                          label: "than yesterday",
                        }}
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3} onClick={() => handleCardClick("Energy", graphData?.labels || [], graphData?.energy || [])}>
                    <MDBox mb={1.5}>
                      <DashboardCard
                        color="success"
                        colorcode="#66BB6A"
                        selectedCardCode="#EEFFE3"
                        imgicon={dashboard3}
                        title="Energy"
                        isSelected={selectedTitle === "Energy"}
                        count={(graphData?.total?.energy) + " kWh" || "0 kWh"}
                        labels={graphData?.labels?.length || 0}
                        data1={graphData?.energy || []}
                        percentage={{
                          color: "success",
                          amount: "+1%",
                          label: "than yesterday",
                        }}
                      />
                    </MDBox>
                  </Grid>

                  <Grid item xs={12} md={6} lg={3} onClick={() => handleCardClick("Revenue", graphData?.labels || [], graphData?.revenue || [])}>
                    <MDBox mb={1.5}>
                      <DashboardCard
                        color="warning"
                        colorcode="#FFA726"
                        selectedCardCode="#FFF0DA"
                        imgicon={usersIcon}
                        title="Revenue"
                        isSelected={selectedTitle === "Revenue"}
                        count={"₹ " + (graphData?.total?.revenue || "₹ 0")}
                        labels={graphData?.labels?.length || 0}
                        data1={graphData?.revenue || []}
                        percentage={{
                          color: "success",
                          amount: "+1%",
                          label: "than yesterday",
                        }}
                      />
                    </MDBox>
                  </Grid>

                  {/* <Grid item xs={12} md={6} lg={3}>
                    <MDBox mb={1.5}>
                      <DashboardCard
                        color="info"
                        colorcode="#49a3f1"
                        // color="skyblue"
                        // colorcode="#A6DBFF"
                        // icon="store"
                        imgicon={dashboard1}
                        title="User"
                        count={(graphData?.total?.users) || 0}
                        labels={(graphData?.labels?.length) || 0}
                        data1={(graphData?.users) || []}
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
                      <DashboardCard
                        // color="error"
                        // colorcode="#EF5350"
                        color="purple"
                        colorcode="#C5C0FF"
                        // icon="store"
                        imgicon={dashboard2}
                        title="Session"
                        count={(graphData?.total?.sessions) || 0}
                        labels={(graphData?.labels?.length) || 0}
                        data1={(graphData?.sessions) || []}
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
                      <DashboardCard
                        color="success"
                        // color="lightGreen"
                        colorcode="#66BB6A"
                        // colorcode="#BEFE94"
                        // icon="store"
                        imgicon={dashboard3}
                        title="Energy"
                        count={(graphData?.total?.energy) + ' kWh' || '0 kWh'}
                        labels={(graphData?.labels?.length) || 0}
                        data1={(graphData?.energy) || []}
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
                      <DashboardCard
                        color="warning"
                        colorcode="#FFA726"
                        // color="orange"
                        // colorcode="#FFC484"
                        // icon="store"
                        imgicon={usersIcon}
                        title="Revenue"
                        count={"₹ " + (graphData?.total?.revenue) || "₹ 0"}
                        labels={(graphData?.labels?.length) || 0}
                        data1={(graphData?.revenue) || []}
                        // count="13"
                        percentage={{
                          color: "success",
                          amount: "+1%",
                          label: "than yesterday",
                        }}
                      />
                    </MDBox>
                  </Grid> */}
                  {/* <Grid item xs={12} md={6} lg={3}>
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
          </Grid> */}
                </Grid>
              }
            </div>
            {/* <DashboardMap locations={locations} /> */}
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
        {/* // :
        // <Loader /> */}
        {/* } */}

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
                    {/* Energy Dispersed */}
                    {selectedTitle}
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
                    {/* <DatePicker
                      defaultValue={dayjs(selectedDate, dateFormat)}
                    /> */}
                    {
                      timeRange === "custom" && <RangePicker
                        size="medium"
                        format="YYYY-MM-DD"
                        // format="YYYY-MM-DD HH:mm:ss"
                        onChange={(value, dateString) => {
                          console.log('Formatted Selected Time: ', dateString);
                          setFromDate(dateString[0]);
                          setToDate(dateString[1]);
                        }}
                      />
                    }
                    {/* <DateRangePicker
                      defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                    /> */}
                    <Select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      size="large"
                      sx={{ mx: 1, height: "2rem" }}
                    >
                      <MenuItem value="today">Today</MenuItem>
                      <MenuItem value="yesterday">Yesterday</MenuItem>
                      <MenuItem value="hourly">Last 24 hours</MenuItem>
                      {/* <MenuItem value="hourly">Today</MenuItem> */}
                      <MenuItem value="daily">Last 7 days</MenuItem>
                      <MenuItem value="last30">Last 30 days</MenuItem>
                      <MenuItem value="monthly">Last 12 months</MenuItem>
                      <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                    {/* <IconButton size="large" sx={{ padding: "0px" }} style={{
                      color: darkMode ? "white" : "black"
                    }}>
                      <img src={DownloadsIcon} onClick={handleDownload}
                      //  fontSize="small" 
                      />
                    </IconButton> */}
                    <IconButton
                      onClick={handleDownload}
                      sx={{
                        // width: "1.5rem",
                        // height: "1.5rem",
                        // display: "flex",
                        // alignItems: "center",
                        // justifyContent: "center",
                        // backgroundColor: "#F6F6F6",
                        // padding: "5px",
                        width: "2rem", // Adjust width for better visibility
                        height: "2rem", // Keep height as needed
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#FFF",
                        // backgroundColor: "#F6F6F6",
                        border: "1px solid #E3E3E3",
                        padding: "5px",
                        borderRadius: "8px",
                        // borderRadius: "4px",
                        transition: "background-color 0.3s ease", // Smooth transition effect
                        "&:hover": {
                          backgroundColor: "#A6DBFF", // Light gray on hover
                        },
                      }}
                    >
                      <img
                        src={DownloadsIcon}
                        alt="Download"
                        style={{
                          width: "1rem", // Adjust the icon size to match other elements
                          height: "1rem",
                          objectFit: "contain",
                        }}
                      />
                    </IconButton>
                    {/* <IconButton size="small" onClick={handleMenuOpen}>
                      <MoreVertIcon />
                    </IconButton> */}
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                      <MenuItem onClick={handleDownload}>Download</MenuItem>
                    </Menu>
                  </div>
                </div>
                <EnergyConsumptionCard
                  title={selectedTitle}
                  labels={selectedLabels}
                  data1={selectedData}
                  colorcode={selectedTitle === 'Energy' ? '#66BB6A' : selectedTitle === 'Revenue' ? '#FFA726' : selectedTitle === 'User' ? '#49a3f1' : selectedTitle === 'Session' ? '#C5C0FF' : '#FFF'}
                />
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
            <MDBox mb={1.5}
              sx={{
                height: "340px",
                // overflow: "scroll"
              }}
            >
              <LocationVisitsCard
                title="Vehicles Data"
                items={dashboardData?.topVehicles || []}
                // items={sampleData1}
                headers={headers1}
                type="location"
              />
            </MDBox>
            <MDBox
            // mb={1.5}
            >
              <StackedBarCard
                // title="Vehicle Type"
                data={data}
                type="vehicle"
              // headers={headers1}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={12} lg={8} >
            <MDBox mb={1.5}
              sx={{
                height: "525px"
              }}
            >
              <LocationVisitsCard
                title="Top Locations"
                items={dashboardData?.topLocations || []}
                // items={sampleData}
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
