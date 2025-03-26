import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Tooltip from '@mui/material/Tooltip';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import { useSnackbar } from "notistack";
import Loader from "components/custom/Loader";

import CustomMaterialTable from "../../components/custom/CustomMaterialTable";
import PopAddBasic from "./PopAddBasic";
import { useMaterialUIController } from "context";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Customer_service() {
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editData, setEditData] = useState(null);
  const [isDisabled2, setIsDisabled2] = useState(false);
  console.log(editData)
  const getValues1 = () => {
    return {
      question: "",
      answer: "",
      category: ""
    };
  };
  const { enqueueSnackbar } = useSnackbar();
  const [values1, setValues1] = useState(getValues1);
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "faq",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          setRows(response?.data?.data);
          setIsLoading(false);
        } else {
          enqueueSnackbar(response?.data?.message, { variant: 'error' });
          setIsLoading(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleEdit = (row_data) => {
    setEditData(row_data); // Store selected FAQ
    // setValues1(row_data);
    setIsDisabled2(true); // Open the dialog
  };
  
  const handleDelete = (row_data) => {
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "faq/" + row_data._id,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      // headers: {
      //   "Content-Type": "application/json", 
      // },
    })
      .then((response) => {
        if (response.data.success === true) {
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          window.location.reload();
        } else {
          // console.log("status is false ");
          enqueueSnackbar(response?.data?.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar(error?.response?.data?.message, { variant: 'error' });
      });
  };

  const column = [
    // {
    //   header: "FAQ ID", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "_id", align: "center"
    // },
    {
      header: "Question", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "question", align: "center"
    },
    {
      header: "Answer", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'justify',
      }, accessorKey: "answer", align: "center"
    },
    {
      header: "Category", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "category", align: "center"
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
            <Tooltip title="Edit">
            <MDButton
              onClick={(e) => handleEdit(row.row.original)}
              variant="gradient"
              color="info"
              iconOnly
              >
              <EditIcon />
            </MDButton>
              </Tooltip>
            <Tooltip title="Delete">
            <MDButton
              sx={{
                marginLeft: 2,
              }}
              onClick={(e) => handleDelete(row.row.original)}
              variant="gradient"
              color="error"
              // color="secondary"
              iconOnly
            >
              <DeleteIcon />
            </MDButton>
            </Tooltip>
          </div>
        ) : null
      ),
    },
  ];
  useEffect(() => {
    setColumns(column);
  }, []);
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      A simple {name} alert with{" "}
      <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
        an example link
      </MDTypography>
      . Give it a click if you like.
    </MDTypography>
  );

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  return (
    // <DashboardLayout>
    //   <DashboardNavbar />
    //   <MDBox mt={6} mb={3}>
    //     <Grid container spacing={3} justifyContent="center">
    //       <Grid item xs={12} lg={8}>
    //         <Card>
    //           <MDBox p={2}>
    //             <MDTypography variant="h5">Alerts</MDTypography>
    //           </MDBox>
    //           <MDBox pt={2} px={2}>
    //             <MDAlert color="primary" dismissible>
    //               {alertContent("primary")}
    //             </MDAlert>
    //             <MDAlert color="secondary" dismissible>
    //               {alertContent("secondary")}
    //             </MDAlert>
    //             <MDAlert color="success" dismissible>
    //               {alertContent("success")}
    //             </MDAlert>
    //             <MDAlert color="error" dismissible>
    //               {alertContent("error")}
    //             </MDAlert>
    //             <MDAlert color="warning" dismissible>
    //               {alertContent("warning")}
    //             </MDAlert>
    //             <MDAlert color="info" dismissible>
    //               {alertContent("info")}
    //             </MDAlert>
    //             <MDAlert color="light" dismissible>
    //               {alertContent("light")}
    //             </MDAlert>
    //             <MDAlert color="dark" dismissible>
    //               {alertContent("dark")}
    //             </MDAlert>
    //           </MDBox>
    //         </Card>
    //       </Grid>

    //       <Grid item xs={12} lg={8}>

    //       </Grid>
    //     </Grid>
    //   </MDBox>

    // </DashboardLayout>
    <DashboardLayout>
      <PopAddBasic
        isDialog={isDisabled2}
        // onClose={setIsDisabled2}
        onClose={() => {
          setIsDisabled2(false);
          setEditData(null); // Reset after closing
        }}
        // value={values1}
        value={editData || values1} 
      />
      <DashboardNavbar />
      <MDBox 
      py={3} 
      // mt={4}
      >
        <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="dark"
              // icon="functions"
              imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Total+charger.png`}
              title="Total"
              count={rows.length || 0}
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
                  All FAQs
                </MDTypography>
                <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                >
                  Add FAQ
                </MDButton>
              </Grid>
            </MDBox>
            {isLoading ? (
              <Loader />
            ) : (
              <CustomMaterialTable
                columns={columns}
                data={rows}
                darkMode={darkMode}
              // setVisibleColumns={setVisibleColumns}
              // setFilteredData={setFilteredData}
              />
            )}
          </Card>
        </MDBox>
      </MDBox>
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default Customer_service;
