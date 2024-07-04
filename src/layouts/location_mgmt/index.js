import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import PopAddBasic from "./PopAddBasic";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
import { GoogleMap, Marker } from '@react-google-maps/api';
import { Card } from "@mui/material";
import DataTable from "examples/Tables/DataTable";
import MDTypography from "components/MDTypography";
import { MaterialReactTable } from 'material-react-table';
import theme from "assets/theme";
import { useMaterialUIController } from "context";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import '../SignIn/SignIn.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// images
import mapImage from "assets/images/map.png";

// Location Management Page components

import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Location_mgmt() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const statusList = [
    'Red',
    'Green',
    'Yellow',
    'Grey'
  ];
  const getValues = () => {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "",
      state: "",
      city: "",
      make: "",
      model: "",
      variant: "",
      registeration_number: "",
      range: ""
    };
  };
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
  }, []);
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const [values, setValues] = useState(getValues);
  const center = {
    lat: 51.5074, // Latitude of the center point
    lng: -0.1278, // Longitude of the center point
  };
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [columns, setColumns] = useState([]);
  const rows = [
    {
      "name": "John Doe",
      "status": "red",
      "gender": "Male",
      "l_type": "Car",
      "chargers": "2",
      "c_type": "Camry",
      "state": "California",
      "city": "Los Angeles",
      "energy_disp": "250000 KWH"
    },
    {
      "name": "Jane Smith",
      "status": "yellow",
      "gender": "Female",
      "l_type": "Motorcycle ",
      "chargers": "3",
      "c_type": "CBR600",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "150000 KWH"
    },
    {
      "name": "Ankit",
      "status": "grey",
      "gender": "Male",
      "l_type": "Motorcycle ",
      "chargers": "3",
      "c_type": "CBR600",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "150000 KWH"
    },
    {
      "name": "Jane Smith",
      "status": "green",
      "gender": "Female",
      "l_type": "Motorcycle ",
      "chargers": "3",
      "c_type": "CBR600",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "150000 KWH"
    },
    {
      "name": "Jane Smith",
      "status": "red",
      "gender": "Female",
      "l_type": "Motorcycle ",
      "chargers": "3",
      "c_type": "CBR600",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "150000 KWH"
    },
    {
      "name": "Jane Smith",
      "status": "red",
      "gender": "Female",
      "l_type": "Four Wheeler ",
      "chargers": "3",
      "c_type": "CBR600",
      "state": "New York",
      "city": "New York City",
      "energy_disp": "150000 KWH"
    },
    // ...more rows
  ];
  const column = [
    {
      header: "Status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "status",
      align: "center",
      fixed: "true",
      Cell: (row) => (
        <div>
          {(row.row.original.status === "red") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "grey") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "yellow") ?
                <CircleIcon style={{ color: "#F1C21B" }} />
                :
                <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    { header: "Name", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "name", align: "center" },
    { header: "L Type", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "l_type", align: "center" },
    { header: "City", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "city", align: "center" },
    { header: "State", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "state", align: "center" },
    { header: "Chargers", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "chargers", align: "center" },
    { header: "C type", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "c_type", align: "center" },
    { header: "Energy disp", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "energy_disp", align: "center" },
    {
      header: "Action",
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },accessorKey: "action",
      align: "center",
      Cell: (row) => (
        <div style={{
          position: 'sticky',
          right: '0',
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
    setIsDisabled2(newState);
  };
  const handleChange = (event) => {
    setValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
    }));
};
  return (
    <DashboardLayout>
      <PopAddBasic
        isDialog={isDisabled2}
        onClose={setIsDisabled2}
        value={values}
        onStateChange={handleStateChange}
        onHandleChange={handleChange}
      />
      <DashboardNavbar />
      {/* <MDBox mt={8}> */}
      <Box sx={{ flexGrow: 1 }} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: "600", lineHeight: "21.94px", display: "flex",justifyContent: "space-between", alignItems: "center"}}>
              <Box style={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon></AccessTimeIcon>
              <span style={{ paddingLeft: "0.5rem" }}>
                Incomplete locations
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
      <MDBox py={3} mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total"
                count={287}
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
                title="Malls"
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
                title="Retail outlets"
                count="287"
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
                title="Highways"
                count="287"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Apartments"
                count="287"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* <img src={mapImage} alt="Map Image" srcset="" /> */}
          {/* <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10} // Adjust the desired zoom level
            center={center}
          >
            <Marker position={{ lat: 51.5074, lng: -0.1278 }} />
          </GoogleMap> */}
          <MDBox width="96%" minHeight="40vh"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                mapImage && ` url(${mapImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </MDBox>
        <MDBox mt={8}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  All Locations
                </MDTypography>
                <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                >
                  Add Locations
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
      </MDBox>
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default Location_mgmt;
