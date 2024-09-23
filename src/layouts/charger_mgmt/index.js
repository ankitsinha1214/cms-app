// @mui material components
import axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "../SignIn/SignIn.css";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import './EnergyCard.css';
import React, { useState, useEffect } from "react";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EnergyCard from "./EnergyCard";
import { MaterialReactTable } from 'material-react-table';
import theme from "assets/theme";
import { useMaterialUIController } from "context";
// Data
import '../SignIn/SignIn.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import authorsTableData from "layouts/charger_mgmt/data/authorsTableData";
import projectsTableData from "layouts/charger_mgmt/data/projectsTableData";
import PopAddMain from "./PopAddMain";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard1";
function Charger_mgmt() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (
  //     localStorage.getItem("login_status") !== "true"
  //   ) {
  //     navigate("/sign-in");
  //   }
  // }, []);
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [columns, setColumns] = useState([]);
  const statusList = [
    'Inactive',
    'Available',
    'Inuse'
  ];
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const rows = [
    {
      "charger_id": "CH001AC",
      "status": "Inactive",
      "c_type": "Malls",
      "location": "HSR layout",
      "l_type": "Toyota",
      "last_ping": "18:20, 29-02-2023",
      "state": "California",
      "city": "Los Angeles",
      "energy_disp": "2500 kWh",
      "charger_type":"AC Charger"
    },
    {
      "charger_id": "CH001DC",
      "status": "Available",
      "c_type": "Highways",
      "location": "Orion Mall",
      "l_type": "Malls",
      "last_ping": "18:20, 24-02-2023",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "300 kWh",
      "charger_type":"AC Charger"
    },
    {
      "charger_id": "Ankit",
      "status": "Inuse",
      "c_type": "Malls",
      "location": "MCC- Kanakpura rd ",
      "l_type": "Malls",
      "last_ping": "18:20, 24-02-2023",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "300 kWh",
      "charger_type":"AC Charger"
    },
    {
      "charger_id": "CH001DC",
      "status": "Available",
      "c_type": "Highways",
      "location": "MCC- Kanakpura rd ",
      "l_type": "Malls",
      "last_ping": "18:20, 24-02-2023",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "300 kWh",
      "charger_type":"AC Charger"
    },
    {
      "charger_id": "CH001DC",
      "status": "Available",
      "c_type": "Highways",
      "location": "MCC- Kanakpura rd ",
      "l_type": "Malls",
      "last_ping": "18:20, 24-02-2023",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "300 kWh",
      "charger_type":"AC Charger"
    },
    {
      "charger_id": "CH001DC",
      "status": "Inactive",
      "c_type": "Highways",
      "location": "Hosur",
      "l_type": "Malls",
      "last_ping": "18:20, 24-02-2023",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "300 kWh",
      "charger_type":"AC Charger"
    },
    // ...more rows
  ];
  const column = [
    {
      header: "Status",
      accessorKey: "status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      align: "center",
      fixed: "true",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Inactive") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            // (row.row.original.status === "grey") ?
            //   <CircleIcon style={{ color: "#7B7B7B" }} />
            //   :
            (row.row.original.status === "Inuse") ?
              <CircleIcon style={{ color: "#F1C21B" }} />
              :
              <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    { header: "Charger ID", accessorKey: "charger_id", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    { header: "C type", accessorKey: "c_type", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    { header: "Location", accessorKey: "location", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    { header: "L Type", accessorKey: "l_type", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    { header: "City", accessorKey: "city", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    { header: "State", accessorKey: "state", align: "center",muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    }, },
    { header: "Energy disp", accessorKey: "energy_disp", align: "center" ,muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },},
    { header: "Last ping", accessorKey: "last_ping", align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, },
    {
      header: "Action",
      accessorKey: "action",
      enableColumnFilter: false,
      align: "center",muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div style={{
          position: 'sticky',
          right: '0',
          // backgroundColor:'white',
          zIndex: '111',
        }}>
          <MDButton
            onClick={(e) => handleEdit(row.row.original)}
            variant="gradient"
            color="info"
            iconOnly
          >
            <LaunchIcon />
          </MDButton>
          <MDButton
            sx={{
              marginLeft: 2,
            }}
            onClick={(e) => handleDelete(row.row.original)}
            variant="gradient"
            color="info"
            // color="secondary"
            iconOnly
          >
            <DeleteIcon />
          </MDButton>
        </div>
      ),
    },
  ];
  useEffect(() => {
    setColumns(column);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    console.log('hello');
    console.log(rows);
    console.log(column);
  }, []);
  const handleEdit = (row_data) => {
    // navigate("/view/user", { state: row_data });
    navigate("/charger/view", { state: row_data });
  };
  const handleDelete = (row_data) => {
    var bodyFormData = new FormData();
    bodyFormData.append("id", row_data.id);
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "jbackend/deleteservice",
      data: bodyFormData
    })
      .then((response) => {
        console.log(response);

        if (response.data.status === true) {
          console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
        } else {
          console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF1CD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.15)'
  }));
  const handleStateChange = (newState) => {
    setIsDisabled(newState);
  };
  return (
    <DashboardLayout>
       <PopAddMain
        isDialog={isDisabled}
        onClose={setIsDisabled}
        // value={values}
        onStateChange={handleStateChange}
        // onHandleChange={handleChange}
      />
      <DashboardNavbar />
      <Box sx={{ flexGrow: 1 }} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: "600", lineHeight: "21.94px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon></AccessTimeIcon>
                <span style={{ paddingLeft: "0.5rem" }}>
                  Unknown chargers
                </span>
              </Box>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <span >45</span>
                <IconButton aria-label="delete">
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Item>
          </Grid>
          {/* <Grid item xs={2}>
          <Item>xs=4</Item>
        </Grid> */}
        </Grid>
      </Box>
      <MDBox mt={0} pt={6} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total"
                title1="Active"
                title2="Inactive"
                count={300}
                count1={240}
                count2={60}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="4wAC"
                title1="Active"
                title2="Inactive"
                count="100"
                count1={80}
                count2={20}
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
                title="4wDC"
                title1="Active"
                title2="Inactive"
                count="100"
                count1={80}
                count2={20}
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
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="2wDC"
                title1="Active"
                title2="Inactive"
                count="100"
                count1={80}
                count2={20}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        </MDBox>
        <MDTypography variant="h6" px={1} mb={1} style={{ fontFamily: "Montserrat",fontSize:"24px", fontWeight: "600", lineHeight: "36px" }}>
        Energy dispersed
              </MDTypography>
        <EnergyCard />
        <MDBox mt={8}>
        <Card>
          <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" color="white" style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "29.26px" }}>
                All Chargers
              </MDTypography>
              <MDButton
                onClick={() => setIsDisabled(!isDisabled)}
                variant="outlined"
                color="white"
                style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "19.5px" }}
              >
                Start / Stop transaction
              </MDButton>
            </Grid>
          </MDBox>
          <MaterialReactTable
              columns={columns}
              data={rows}
              initialState={{ showColumnFilters: true }}
              muiTableProps={{
                sx: darkMode ?
                { backgroundColor: "#202940", color: "#ffffff",
                '& td': {
                  fontFamily:"Montserrat",
            fontSize : "14px",
            fontWeight:"500",
             lineHeight : "17.07px",
             color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                }, } :
                {
                  '& td': {
                    fontFamily:"Montserrat",
              fontSize : "14px",
              fontWeight:"500",
               lineHeight : "17.07px",
                    backgroundColor: '#f5f5f5',
                  },
                },
              }}
              muiTopToolbarProps={{
                sx: darkMode ?
                {  color: "#ffffff",
                '& svg': {
                  fontFamily:"Montserrat",
            fontSize : "14px",
            fontWeight:"500",
             lineHeight : "17.07px",
             color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              }:{
                backgroundColor: '#f5f5f5',
              }
              }}
              muiTableHeadCellProps={{
                sx: darkMode ?
                {  color: "#ffffff",
                '& svg': {
                  fontFamily:"Montserrat",
            fontSize : "14px",
            fontWeight:"500",
             lineHeight : "17.07px",
             color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              }:{
                backgroundColor: '#f5f5f5',
              }
              }}
              muiBottomToolbarProps={{
                sx: darkMode ?
                {  color: "#ffffff",
                '& p,button,div': {
                  fontFamily:"Montserrat",
            // fontSize : "14px",
            fontWeight:"500",
             lineHeight : "17.07px",
             color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              }:{
                backgroundColor: '#f5f5f5',
              }
              }}
              muiTableBodyCellProps={{
                sx: {
                  borderBottom: '2px solid #e0e0e0', //add a border between columns
                  
                },
              }}
            />
        </Card>
      </MDBox>
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default Charger_mgmt;
