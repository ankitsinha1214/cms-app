import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import '../charger_mgmt/EnergyCard.css';
import MDButton from "components/MDButton";
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import React, { useState, useEffect } from "react";
import { MaterialReactTable } from 'material-react-table';
import theme from "assets/theme";
import { useMaterialUIController } from "context";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React examples
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import PopAddUser from "./PopAddUser";

import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import Loader from "components/custom/Loader";
import { useSnackbar } from "notistack";
// User_mgmt page components

function User_mgmt() {
  const [controller] = useMaterialUIController();
  const [isLoading, setIsLoading] = useState(true);
  const [dataRec, setDataRec] = useState([]);
  const { darkMode } = controller;
  const { enqueueSnackbar } = useSnackbar();
  const statusList = [
    'active',
    'Inactive',
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
      range: "",
      vehicle_img: "",
    };
  };
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    console.log(process.env.REACT_APP_BASEURL);
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "users",
    })
      .then((response) => {
        console.log(response.data.data);

        if (response.data.success === true) {
          console.log(response.data);
          setDataRec(response.data.data);
          setIsLoading(false);
        } else {
          console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [isDisabled, setIsDisabled] = useState(false);
  const [columns, setColumns] = useState([]);
  const [values, setValues] = useState(getValues);
  const rows = dataRec;
  const handleEdit = (row_data) => {
    navigate("/update-user", { state: row_data });
  };
  const handleDelete = (row_data) => {
    // const payload = { "id": row_data.app_user_pk };
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "users/" + row_data.phoneNumber,
      // data: payload, // JSON payload
    headers: {
      "Content-Type": "application/json", // Set the Content-Type header
    },
    })
      .then((response) => {
        if (response.data.success === true) {
          // console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
          // alert(response.data.message);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          window.location.reload();
        } else {
          console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.data.message, { variant: 'error' });
      });
  };
  const column = [
    {
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      header: "Status",
      accessorKey: "status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      // size: 50,
      align: "center",
      fixed: "true",
      Cell: (row) => (
        <div >
          {(row.row.original.status === "active") ?
            <CircleIcon style={{ color: "#198038" }} />
            :
            <CircleIcon style={{ color: "#DA1E28" }} />
          }
        </div>
      ),
    },
    { header: "Full Name", align: "center",filterVariant: 'text',
    muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    }, // default
    Cell: (row) => (
      <div>
        {`${row.row.original.firstName} ${row.row.original.lastName}`}
      </div>
    ),
     },
    { header: "Gender", accessorKey: "gender", align: "center" ,
      muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },},
    { header: "Vehicle type", filterVariant: 'text', align: "center",
      muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: (row) => (
      <div>
      {row.row.original.user_vehicle.map((vehicle, index) => (
        <div key={index}>
          {vehicle.vehicle_reg}
        </div>
      ))}
    </div>
    ),
  },
    { header: "Make", filterVariant: 'text', align: "center",muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: (row) => (
      <div>
      {row.row.original.user_vehicle.map((vehicle, index) => (
        <div key={index}>
          {vehicle.make}
        </div>
      ))}
    </div>
    ),
  },
    { header: "Model", filterVariant: 'text', align: "center" ,muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },
    Cell: (row) => (
      <div>
      {row.row.original.user_vehicle.map((vehicle, index) => (
        <div key={index}>
          {vehicle.model}
        </div>
      ))}
    </div>
    ),
  },
    { header: "State", accessorKey: "state", align: "center",muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    }, },
    { header: "City", accessorKey: "city", align: "center" ,muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },},
    { header: "Energy cons", accessorKey: "energy_cons", align: "center" ,muiTableHeadCellProps: {
      align: 'center',
    },
    muiTableBodyCellProps: {
      align: 'center',
    },},
    {
      header: "Action",
      accessorKey: "action",
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      align: "center",
      Cell: (row) => (
        <div style={{
          position: 'sticky',
          right: '0',
          // backgroundColor:'white',
          // zIndex: '111',
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

  // const pop = () => {
  //   navigate("/Add-user");
  // };

  const handleStateChange = (newState) => {
    setIsDisabled(newState);
  };
  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };
  return (
    <DashboardLayout>
      <PopAddUser
        isDialog={isDisabled}
        onClose={setIsDisabled}
        value={values}
        onStateChange={handleStateChange}
        onHandleChange={handleChange}
      />
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total"
                count={300}
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
                title="Active"
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
                title="2 Wheeler"
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
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="4 Wheeler"
                count="91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={8}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  All Users
                </MDTypography>
                <MDButton
                  // onClick={() => pop()}
                  onClick={() => setIsDisabled(!isDisabled)}
                  variant="outlined"
                  color="white"
                >
                  Add user
                </MDButton>
              </Grid>
            </MDBox>
            {isLoading ? (
                  <Loader />
                ) : (
            <MaterialReactTable
              columns={columns}
              data={dataRec}
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
            />)}
          </Card>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default User_mgmt;
