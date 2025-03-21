import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
// import PopAddBasic from "./PopAddBasic";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

import { useSnackbar } from "notistack";
// Location Management Page components

import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function Pre_delivery_mgmt() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const statusList = [
    'Rejected',
    'Approved',
    'Waiting for approval'
  ];
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [count, setCount] = useState({});
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "pre-delivery-chargebox-response",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          setRows(response.data.data);
          // Count the number of Approved and Rejected statuses
          // const statusCounts = response?.data?.data?.reduce(
          //   (counts, item) => {
          //     if (item.status === "Approved") {
          //       counts.approved += 1;
          //     } else if (item.status === "Rejected") {
          //       counts.rejected += 1;
          //     }
          //     return counts;
          //   },
          //   { approved: 0, rejected: 0 }
          // );
          // setCount(statusCounts);
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
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };
// Function to convert UTC to IST and format it
const convertUTCtoIST = (utcDate) => {
  const timeZone = 'Asia/Kolkata'; // IST time zone
  const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
};
  const column = [
    // {
    //   header: "Status",
    //   size: 200,
    //   filterVariant: 'select',
    //   filterSelectOptions: statusList,
    //   muiTableHeadCellProps: {
    //     align: 'center',
    //     style: { width: '200px !important' },
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //     style: { width: '200px !important' },
    //   }, accessorKey: "status",
    //   align: "center",
    //   fixed: "true",
    //   Cell: (row) => (
    //     <div>
    //       {(row.row.original.status === "Rejected") ?
    //         <CircleIcon style={{ color: "#DA1E28" }} />
    //         :
    //         (row.row.original.status === "Waiting for approval") ?
    //           <CircleIcon style={{ color: "#7B7B7B" }} />
    //           :
    //           (row.row.original.status === "Approved") ?
    //             <CircleIcon style={{ color: "#198038" }} />
    //             :
    //             <CircleIcon style={{ color: "#198038" }} />
    //       }
    //     </div>
    //   ),
    // },
    {
      header: "Chargebox Id", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "chargebox_id", align: "center"
    },
    // {
    //   header: "Address", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "locationId.address", align: "center"
    // },
    // {
    //   header: "City", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "locationId.city", align: "center"
    // },
    // {
    //   header: "State", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "locationId.state", align: "center"
    // },
    {
      header: "Username", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "userServiceAndMaintenance.username", align: "center"
    },
    {
      header: "email", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "userServiceAndMaintenance.email", align: "center"
    },
    {
      header: "Phone", align: "center", filterVariant: 'text',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, // default
      Cell: (row) => (
        <div>
          {`${row.row.original.userServiceAndMaintenance?.phone?.prefix} ${row.row.original.userServiceAndMaintenance?.phone?.number}`}
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
        row.row.depth === 0 ? (
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
        ) : null
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
    navigate("/service-maintenace/pre-delivery/view", { state: row_data });
  };
  const handleDelete = (row_data) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "pre-delivery-chargebox-response/" + row_data._id,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      // headers: {
      //   "Content-Type": "application/json", 
      // },
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
          // console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
      });
  };
  const total = rows.length;
  // const countApproved = rows.filter(row => row.status === "Approved").length;
  // const countRejected = rows.filter(row => row.status === "Rejected").length;
  // const countWaiting = total - countApproved - countRejected;

  // const percentageApproved = ((countApproved / total) * 100).toFixed(2);
  // const percentageRejected = ((countRejected / total) * 100).toFixed(2);
  // const percentageWaiting = ((countWaiting / total) * 100).toFixed(2);
  return (
    <DashboardLayout>
      {/* <PopAddBasic
        isDialog={isDisabled2}
        onClose={setIsDisabled2}
        value={values}
        onStateChange={handleStateChange}
        onHandleChange={handleChange}
      /> */}
      <DashboardNavbar />
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
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="doneoutlined"
                title="Approved"
                count={countApproved}
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
                title="Rejected"
                count={countRejected}
                percentage={{
                  color: "error",
                  amount: `${percentageRejected}%`,
                  label: "of total",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={8}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  All Pre Delivery
                </MDTypography>
                {/* <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                >
                  Add Locations
                </MDButton> */}
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

export default Pre_delivery_mgmt;