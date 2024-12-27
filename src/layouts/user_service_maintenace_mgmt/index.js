import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import PopAddBasic from "./PopAddBasic";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
// import { Button, Input, Select, Space } from 'antd';
import Loader from "components/custom/Loader";
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
// import { GoogleMap, Marker } from '@react-google-maps/api';
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import { MaterialReactTable } from 'material-react-table';
import { useMaterialUIController } from "context";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import '../SignIn/SignIn.css';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { useSnackbar } from "notistack";
// Location Management Page components

import CircleIcon from '@mui/icons-material/Circle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function User_service_maintenace_mgmt() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const statusList = [
    'Active',
    'Inactive'
  ];
  const getValues = () => {
    return {
      name: "",
      prefix: "",
      number: "",
      email: "",
      username: "",
    };
  };
  const getValues1 = () => {
    return {
      username: "",
      password: "",
      company: "",
      department: ""
    };
  };
  const [columns, setColumns] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  // const showModal = () => {
  //   setOpen(true);
  // };
  const [rows, setRows] = useState([]);
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          const filteredUsers = response.data.data.filter(user => {
            const excludedRoles = ['Admin', 'Manager']; 
            return !excludedRoles.includes(user.role); // Filters out users with the specified roles
          });
          setRows(filteredUsers);
          // setRows(response.data.data);
          setIsLoading(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Function to convert UTC to IST and format it
  const convertUTCtoIST = (utcDate) => {
    const timeZone = 'Asia/Kolkata'; // IST time zone
    const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
  };
  const handleSubmit = () => {
    const payload = {
      "name": values.name,
      "email": values.email,
      "username": values.username,
      "phone": {
        "prefix": values.prefix,
        "number": values.number
      },
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/updateuserdetails",
      data: payload, // JSON payload
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.success === true) {
          console.log(response);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          window.location.reload();
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      });
  };
  const [values, setValues] = useState(getValues);
  const [values1, setValues1] = useState(getValues1);
  const handleOk = () => {
    if (!values.name || !values.email || !values.prefix || !values.number) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      handleSubmit();
      setConfirmLoading(false);
      // window.location.reload();
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const handleChange = (event) => {
    setValues((prevValues) => ({
        ...prevValues,
        [event.target.name]: event.target.value,
    }));
};
  const column = [
    {
      header: "Status",
      size: 200,
      filterVariant: 'select',
      filterSelectOptions: statusList,
      muiTableHeadCellProps: {
        align: 'center',
        style: { width: '200px !important' },
      },
      muiTableBodyCellProps: {
        align: 'center',
        style: { width: '200px !important' },
      }, accessorKey: "status",
      align: "center",
      fixed: "true",
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Inactive") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Active") ?
              <CircleIcon style={{ color: "#198038" }} />
              :
              <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    {
      header: "Name", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "name", align: "center"
    },
    {
      header: "Username", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "username", align: "center"
    },
    {
      header: "Email", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "email", align: "center"
    },
    {
      header: "Company", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "company", align: "center"
    },
    {
      header: "Department", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "department", align: "center"
    },
    {
      header: "Phone", align: "center", filterVariant: 'text',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          {`${row.row.original.phone?.prefix} ${row.row.original.phone?.number}`}
        </div>
      ),
    },
    {
      header: "Created At",
      muiTableHeadCellProps: { align: 'center' },
      muiTableBodyCellProps: { align: 'center' },
      accessorKey: "createdAt",
      Cell: ({ cell }) => {
        return convertUTCtoIST(cell.getValue());
      },
      align: "center",
    },
    {
      header: "Action",
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "action",
      align: "center",
      Cell: (row) => (
        // row.row.depth === 0 ? (
        <div style={{
          position: 'sticky',
          right: '0',
          zIndex: '111',
        }}>
          <MDButton
            onClick={(e) => handleEdit(row.row.original)}
            // onClick={showModal}
            variant="gradient"
            color="info"
            iconOnly
          >
            <EditIcon />
          </MDButton>
          {
            (row.row.original.status === "Inactive") ?
              <Tooltip title="Activate This User">
                <MDButton
                  sx={{
                    marginLeft: 2,
                  }}
                  onClick={(e) => handleDelete(row.row.original)}
                  variant="gradient"
                  // color="info"
                  color="success"
                  iconOnly
                >
                  <AccountCircleIcon />
                </MDButton>
              </Tooltip>
              :
              <Tooltip title="Deactivate This User">
                <MDButton
                  sx={{
                    marginLeft: 2,
                  }}
                  onClick={(e) => handleDelete(row.row.original)}
                  variant="gradient"
                  // color="info"
                  color="error"
                  iconOnly
                >
                  <NoAccountsIcon />
                </MDButton>
              </Tooltip>
          }
          {/* <DeleteIcon /> */}
        </div>
        // ) : null
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
    // console.log('hello');
    // console.log(rows);
    // console.log(column);
  }, []);
  const handleEdit = (row_data) => {
    values.name = row_data.name;
    values.email = row_data.email;
    values.prefix = row_data.phone?.prefix;
    values.number = row_data.phone?.number;
    values.username = row_data.username;
    setOpen(true);
    // navigate("/charger-and-dcbox/view", { state: row_data });
  };
  const handleDelete = (row_data) => {
    var status;
    if (row_data.status === "Active") {
      status = "Inactive";
    }
    else {
      status = "Active";
    }
    const payload = {
      userId: row_data._id,
      status: status
    }
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/update-status",
      data: payload,
      headers: {
        "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          // console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
          // alert(response.data.message);
          enqueueSnackbar(response.data?.message, { variant: 'success' });
          window.location.reload();
        } else {
          // console.log(response.data);
          enqueueSnackbar(response.data?.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      });
  };
  const total = rows.length;
  const countActive = rows.filter(row => row.status === "Active").length;
  const countInactive = rows.filter(row => row.status === "Inactive").length;

  const percentageApproved = ((countActive / total) * 100).toFixed(2);
  const percentageRejected = ((countInactive / total) * 100).toFixed(2);
  return (
    <DashboardLayout>
      <PopAddBasic
        isDialog={isDisabled}
        onClose={setIsDisabled}
        value={values1}
        // onStateChange={handleStateChange}
        onHandleChange={handleChange}
      />
      <DashboardNavbar />
      <Modal
        title="Update Profile"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {/* Reason TextField */}
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <TextField
            id="outlined-error"
            label="Name"
            value={values.name}
            name="name"
            margin="dense"
            // multiline
            // rows={4}
            sx={{ width: '100%' }}
            onChange={handleChange}
          />
          <TextField
            id="outlined-error"
            label="Email ID"
            value={values.email}
            name="email"
            margin="dense"
            // multiline
            // rows={4}
            sx={{ width: '100%' }}
            onChange={handleChange}
          />
          <TextField
            id="filled-adornment-amount"
            label="country code"
            // type="number"
            value={values.prefix}
            name="prefix"
            margin="dense"
            // multiline
            // rows={4}
            sx={{ width: '20%', marginRight: '0.5rem' }}
            onChange={handleChange}
            // startAdornment={<InputAdornment position="start">+</InputAdornment>}
          />
          <TextField
            id="amount"
            label="Phone Number"
            type="number"
            value={values.number}
            name="number"
            margin="dense"
            // multiline
            // rows={4}
            sx={{ width: '78%' }}
            onChange={handleChange}
          />
          {/* <Space.Compact>
      <Input
        style={{
          width: '20%',
        }}
        defaultValue="0571"
      />
      <Input
        style={{
          width: '80%',
        }}
        defaultValue="26888888"
      />
    </Space.Compact> */}
        </div>
      </Modal>
      {/* <MDBox mt={8}> */}
      {/* <Box sx={{ flexGrow: 1 }} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: "600", lineHeight: "21.94px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
        </Grid>
      </Box> */}
      <MDBox py={3} mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                // icon="functions"
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Total+charger.png`}
                title="Total"
                count={total}
              // percentage={{
              //   color: "success",
              //   amount: "+55%",
              //   label: "than last week",
              // }}
              />
            </MDBox>
          </Grid>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="timer"
                title="Waiting"
                count={countWaiting}
                percentage={{
                  color: "warning",
                  amount: `${percentageWaiting}%`,
                  label: "of total",
                }}
              />
            </MDBox>
          </Grid> */}
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="doneoutlined"
                title="Active"
                count={countActive}
                percentage={{
                  color: "success",
                  amount: `${percentageApproved}%`,
                  label: "of total",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="close"
                title="Inactive"
                count={countInactive}
                percentage={{
                  color: "error",
                  amount: `${percentageRejected}%`,
                  label: "of total",
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
                  All User Service & Maintenace
                </MDTypography>
                <MDButton
                  onClick={() => setIsDisabled(!isDisabled)}
                  variant="outlined"
                  color="white"
                  sx={{cursor: "pointer"}}
                >
                  Add User
                </MDButton>
              </Grid>
            </MDBox>
            {isLoading ? (
              <Loader />
            ) : (<MaterialReactTable
              columns={columns}
              data={rows}
              initialState={{ showColumnFilters: true }}
              muiTableProps={{
                sx: darkMode ?
                  {
                    backgroundColor: "#202940", color: "#ffffff",
                    '& td': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } :
                  {
                    '& td': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      backgroundColor: '#f5f5f5',
                    },
                  },
              }}
              muiTopToolbarProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& svg': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
                    backgroundColor: '#f5f5f5',
                  }
              }}
              muiTableHeadCellProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& svg': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
                    backgroundColor: '#f5f5f5',
                  }
              }}
              muiBottomToolbarProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& p,button,div': {
                      fontFamily: "Montserrat",
                      // fontSize : "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
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
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default User_service_maintenace_mgmt;