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
import Loader from "components/custom/Loader";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EnergyCard from "./EnergyCard";
import { MaterialReactTable } from 'material-react-table';
import theme from "assets/theme";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
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
import PopReset from "./PopReset";
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard1";
import { useSnackbar } from "notistack";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

function Charger_mgmt() {
  // const navigate = useNavigate();
  // const { columns, rows } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();
  // const [isDisabled2, setIsDisabled2] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [selected, setSelected] = useState("All Chargers");
  const [total, setTotal] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [columns, setColumns] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const statusList = [
    'Available',
    'Charging',
    'Preparing',
    'Finishing',
    'SuspendedEVSE',
    'Faulted',
    'Inactive',
    // 'Inuse'
  ];
  const statusList1 = [
    'Active',
    'Unpaid',
    'Paid'
    // 'Inuse'
  ];
  const getValues = () => {
    return {
      charger_id: "",
      type: "",
      reason: ""
    };
  };
  const [values, setValues] = useState(getValues);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [rows, setRows] = useState([]);
  const onClick = ({ key }) => {
    console.log(`Click on item ${key}`);
    console.log(key);
    if (key === '0') {
      handleDropdownSelect('All Chargers');
      setColumns(column);
    }
    else {
      handleDropdownSelect('All Sessions');
      setColumns(sessionColumn);
    }
  };

  // Function to convert UTC to IST and format it
  const convertUTCtoIST = (utcDate) => {
    // console.log(utcDate);
    if (!utcDate || isNaN(new Date(utcDate).getTime())) {
      return 'N/A'; // Return 'N/A' if the date is invalid or missing
    }
    const timeZone = 'Asia/Kolkata'; // IST time zone
    const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
  };

  const items = [
    {
      label: 'All Chargers',
      key: '0',
    },
    // {
    //   label: <a href="https://www.aliyun.com">2nd menu item</a>,
    //   key: '1',
    // },
    {
      type: 'divider',
    },
    {
      label: 'All Sessions',
      key: '2',
    },
  ];
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "charger-locations/chargers/all",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          // const filteredUsers = response.data.data.filter(user => {
          // });
          const transformedData = response.data.data.flatMap(location =>
            location.chargerInfo.map(charger => ({
              status: charger.status,
              charger_id: charger.name,
              powerOutput: charger.powerOutput,
              _id: charger._id,
              // charger_id: charger._id,
              c_type: `${charger.type}`,
              locationId: location._id,
              address: location.address,
              location: location.locationName,
              l_type: location.locationType,
              city: location.city,
              state: location.state,
              energy_disp: charger.energyConsumptions,
              last_ping: charger.lastPing ? charger.lastPing : "N/A"
            }))
          );
          console.log(transformedData)
          setRows(transformedData);
          setTotal(transformedData.length);
          setInactive(transformedData?.filter(row => row.status === "Inactive").length);
          // setInactive(transformedData?.filter(row => row.status !== "Inactive").length);
          // setRows(response.data.data);
          setIsLoading(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading(false);
          // console.log("status is false "); 
        }
        setSelected("All Chargers");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDropdownSelect = (selectedValue) => {
    setSelected(selectedValue);
    // console.log(selectedValue);
    if (selectedValue === "All Chargers") {
      // Fetch or filter all chargers data
      fetchAllChargers();
    } else if (selectedValue === "All Sessions") {
      // Fetch or filter all Sessions data
      fetchAllTransactions();
    }
  };
  const fetchAllChargers = () => {
    axios.get(process.env.REACT_APP_BASEURL + "charger-locations/chargers/all", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    }).then((response) => {
      if (response.data.success) {
        const transformedData = response.data.data.flatMap(location =>
          location.chargerInfo.map(charger => ({
            status: charger.status,
            charger_id: charger.name,
            _id: charger._id,
            powerOutput: charger.powerOutput,
            c_type: `${charger.type}`,
            locationId: location._id,
            address: location.address,
            location: location.locationName,
            l_type: location.locationType,
            city: location.city,
            state: location.state,
            energy_disp: charger.energyConsumptions,
            last_ping: charger.lastPing ? charger.lastPing : "N/A"
          }))
        );
        setRows(transformedData);
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    }).catch(error => {
      console.error(error);
    });
  };

  const fetchAllTransactions = () => {
    axios.get(process.env.REACT_APP_BASEURL + "session/", {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    }).then((response) => {
      if (response.data.success) {
        // const updatedRows = response.data.data.map(session => ({
        //   ...session,
        //   status: session.status === "Started" ? "Active"
        //     : session.status === "Stopped" ? "Unpaid"
        //       : session.status === "Completed" ? "Paid"
        //         : session.status // Keep it unchanged if it doesn't match
        // }));
        // const updatedRows = response.data.data.map(session => {
        //   const metadata = session.metadata || [];

        //   // Get the first and last metadata values
        //   const firstEntry = metadata[0]?.values?.["Energy.Active.Import.Register"];
        //   const lastEntry = metadata[metadata.length - 1]?.values?.["Energy.Active.Import.Register"];

        //   // Extract numeric values and handle missing values
        //   const firstMeterValue = firstEntry ? parseFloat(firstEntry.split(" ")[0]) : 0;
        //   const lastMeterValue = lastEntry ? parseFloat(lastEntry.split(" ")[0]) : 0;

        //   // Calculate energy consumed
        //   const energyConsumed = lastMeterValue && firstMeterValue ? (lastMeterValue - firstMeterValue).toFixed(4) : "0";

        //   return {
        //     ...session,
        //     status: session.status === "Started" ? "Active"
        //       : session.status === "Stopped" ? "Unpaid"
        //         : session.status === "Completed" ? "Paid"
        //           : session.status, // Keep it unchanged if it doesn't match
        //     energy_disp: `${energyConsumed} Wh`
        //   };
        // });
        const updatedRows = response.data.data.map(session => {
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

          return {
            ...session,
            status: session.status === "Started" ? "Active"
              : session.status === "Stopped" ? "Unpaid"
                : session.status === "Completed" ? "Paid"
                  : session.status, // Keep it unchanged if it doesn't match
            energy_disp1: `${energyConsumed} Wh`,
            userPhone: maskedPhone
          };
        });
        // Sort by createdAt in descending order (latest first)
        const sortedRows = updatedRows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRows(sortedRows);
        // setRows(updatedRows);
        // setRows(response.data.data);  // Assuming transactions data can be mapped similarly
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    }).catch(error => {
      console.error(error);
    });
  };

  const column = [
    {
      header: "Status",
      accessorKey: "status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      align: "center",
      fixed: "true", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Faulted") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Inactive") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "Available") ?
                <CircleIcon style={{ color: "#198038" }} />
                :
                (row.row.original.status === "Charging") ?
                  <CircleIcon style={{ color: "#1A73E8" }} />
                  :
                  (row.row.original.status === "SuspendedEVSE") ?
                    <CircleIcon style={{ color: "orange" }} />
                    :
                    (row.row.original.status === "Finishing") ?
                      <CircleIcon style={{ color: "#800080" }} />
                      :
                      (row.row.original.status === "Preparing") ?
                        <CircleIcon style={{ color: "#F1C21B" }} />
                        :
                        <CircleIcon style={{ color: "yellow" }} />
          }
        </div>
      ),
    },
    {
      header: "Charger ID", accessorKey: "charger_id", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "C type", accessorKey: "c_type", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Location", accessorKey: "location", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "L Type", accessorKey: "l_type", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "City", accessorKey: "city", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "State", accessorKey: "state", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Energy disp", accessorKey: "energy_disp", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Last ping", accessorKey: "last_ping", align: "center",
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return convertUTCtoIST(cell.getValue());
      },
    },
    {
      header: "Action",
      accessorKey: "action",
      enableColumnFilter: false,
      align: "center", muiTableHeadCellProps: {
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
  const sessionColumn = [
    {
      header: "Status",
      accessorKey: "status",
      filterVariant: 'select',
      filterSelectOptions: statusList1,
      align: "center",
      fixed: "true", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Unpaid") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            // :
            // (row.row.original.status === "Inactive") ?
            //   <CircleIcon style={{ color: "#7B7B7B" }} />
            // :
            // (row.row.original.status === "Available") ?
            :
            (row.row.original.status === "Active") ?
              <CircleIcon style={{ color: "#1A73E8" }} />
              // <CircleIcon style={{ color: "#800080" }} />
              :
              // (row.row.original.status === "SuspendedEVSE") ?
              //   <CircleIcon style={{ color: "orange" }} />
              //   :
              (row.row.original.status === "Paid") ?
                <CircleIcon style={{ color: "#198038" }} />
                // :
                // (row.row.original.status === "Preparing") ?
                //   <CircleIcon style={{ color: "#F1C21B" }} />
                :
                <CircleIcon style={{ color: "yellow" }} />
          }
        </div>
      ),
    },
    {
      header: "Session ID", accessorKey: "_id", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Charger ID", accessorKey: "chargerId", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "User Phone", accessorKey: "userPhone", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Started By", accessorKey: "startCreatedBy", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Stopped By", accessorKey: "stopCreatedBy", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Duration", accessorKey: "duration", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Location", accessorKey: "chargerLocation.locationName", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "City", accessorKey: "chargerLocation.city", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "State", accessorKey: "chargerLocation.state", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Energy disp", accessorKey: "energy_disp1", align: "center", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
    },
    {
      header: "Action",
      accessorKey: "actions",
      enableColumnFilter: false,
      align: "center", muiTableHeadCellProps: {
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
            onClick={(e) => handleTransactionEdit(row.row.original)}
            variant="gradient"
            color="info"
            iconOnly
          >
            <LaunchIcon />
          </MDButton>
          {/* <MDButton
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
          </MDButton> */}
        </div>
      ),
    },
  ];
  useEffect(() => {
    setColumns(column);
  }, []);
  const navigate = useNavigate();
  const handleEdit = (row_data) => {
    // navigate("/view/user", { state: row_data });
    navigate("/charger/view", { state: row_data });
  };
  const handleTransactionEdit = (row_data) => {
    // navigate("/view/user", { state: row_data });
    navigate("/session", { state: { _id: row_data?._id } });
    // navigate("/session", { state: row_data });
  };
  const handleDelete = (row_data) => {
    // console.log(row_data);
    // return enqueueSnackbar("Error Occurred while Deleting Charger. Please try again later.", { variant: 'error' });
    const payload = {
      "location_id": row_data?.locationId,
      "charger_id": row_data._id
    };
    // console.log(payload)
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "charger-locations/delete-charger",
      data: payload, // JSON payload
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
          navigate("/charger");
          window.location.reload();
        } else {
          // console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar("Error Occurred while Deleting Charger. Please try again later.", { variant: 'error' });
      });
  };
  // const handleDelete = (row_data) => {
  //   var bodyFormData = new FormData();
  //   bodyFormData.append("id", row_data.id);
  //   axios({
  //     method: "post",
  //     url: process.env.REACT_APP_BASEURL + "jbackend/deleteservice",
  //     data: bodyFormData
  //   })
  //     .then((response) => {
  //       console.log(response);

  //       if (response.data.status === true) {
  //         console.log(response);
  //         // setIsBackdrop(false);
  //         // setDialogMessage(response.data.message);
  //         // setIsDialog(true);
  //       } else {
  //         console.log("status is false ");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
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
  const handleStateChange1 = (newState) => {
    setIsDisabled1(newState);
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
      <PopReset
        isDialog={isDisabled1}
        onClose={setIsDisabled1}
        value={values}
        onStateChange={handleStateChange1}
      // onHandleChange={handleChange}
      />
      <DashboardNavbar />
      {/* <Box sx={{ flexGrow: 1 }} mt={2}>
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
        </Grid>
      </Box> */}
      {/* <Grid item xs={2}>
          <Item>xs=4</Item>
        </Grid> */}
      {/* <MDBox mt={0} pt={6} pb={3}> */}
      <MDBox mt={0} pt={2} pb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total"
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/Total+charger.png`}
                title1="Active"
                title2="Inactive"
                count={total || 0}
                // count={300}
                // count1={240}
                count1={total - inactive || 0} // Count of Available chargers
                count2={inactive || 0}
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
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/4wac.png`}
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
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/4wdc.png`}
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
                imgicon={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/2wdc.png`}
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
      <MDTypography variant="h6" px={1} mb={1} style={{ fontFamily: "Montserrat", fontSize: "24px", fontWeight: "600", lineHeight: "36px" }}>
        Energy dispersed
      </MDTypography>
      <EnergyCard />
      <MDBox mt={8}>
        <Card>
          <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              {/* <MDTypography variant="h6" color="white" style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "29.26px" }}>
                All Chargers
              </MDTypography> */}
              <Dropdown
                menu={{
                  items,
                  onClick,
                  selectable: true,
                  defaultSelectedKeys: ['0'],
                }}
                trigger={['click']}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MDTypography variant="h6" color="white" style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "29.26px" }}>
                      {selected}
                    </MDTypography>
                    <DownOutlined style={{ color: "white", cursor: "pointer" }} />
                  </Space>
                </a>
              </Dropdown>
              {/* <Dropdown
                overlay={
                  <Space direction="vertical">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        onClick={() => handleDropdownSelect(item.label)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.label}
                      </div>
                    ))}
                  </Space>
                }
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {selected} <DownOutlined />
                  </Space>
                </a>
              </Dropdown> */}
              <MDBox className="admin_btnsHeaderCont" style={{
                display: "flex",
                // width:"50%",
                justifyContent: "space-between"
              }}>
                 <MDButton
                onClick={() => setIsDisabled1(!isDisabled1)}
                variant="outlined"
                color="white"
                style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "19.5px" }}
              >
                Reset Charger
              </MDButton>
              <MDButton
                onClick={() => setIsDisabled(!isDisabled)}
                variant="outlined"
                color="white"
                style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "19.5px", marginLeft: "1rem"  }}
              >
                Start / Stop transaction
              </MDButton>
              </MDBox>

              {/* <MDButton
                onClick={() => setIsDisabled(!isDisabled)}
                variant="outlined"
                color="white"
                style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "19.5px" }}
              >
                Reset Charger
              </MDButton>
              <MDButton
                onClick={() => setIsDisabled(!isDisabled)}
                variant="outlined"
                color="white"
                style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "19.5px" }}
              >
                Start / Stop transaction
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
          />
          )}
        </Card>
      </MDBox>
      {/* </MDBox> */}
    </DashboardLayout>
  );
}

export default Charger_mgmt;