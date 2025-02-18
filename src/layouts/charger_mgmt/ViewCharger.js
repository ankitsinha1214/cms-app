import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Container, Grid, Typography, Paper, Avatar, IconButton, Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import reportsLineChartData from "./components/reportsLineChartData";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart/New";
// import first from "";
import charger from "../../assets/images/charger.png";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import MDTypography from "components/MDTypography";
import Loader from "components/custom/Loader";
import MDBox from "components/MDBox";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DoneIcon from '@mui/icons-material/Done';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Divider } from 'antd';
import InfoCard from '../location_mgmt/components/Infocard';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
import { useMaterialUIController } from "context";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import { useSnackbar } from "notistack";
import { MaterialReactTable } from 'material-react-table';
import MDButton from "components/MDButton";
import LaunchIcon from "@mui/icons-material/Launch";
import CircleIcon from '@mui/icons-material/Circle';
import './somestyle.css';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  ...theme.applyStyles('dark', {
    color: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        color: '#784af4',
      },
    },
  ],
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    color: '#42424a'
  },
  [`&.${stepConnectorClasses.line}`]: {
    height: 3,
    border: `1px dashed grey`,
    // border: 0,
    // borderStyle: 'dashed', // Dashed line for the connector
    // borderColor: 'grey', // Grey color for the connector
    backgroundColor: 'transparent', // Making the background transparent
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: ownerState.completed
    ? green[500] // Green for completed (tick)
    : ownerState.active
      ? 'yellow' // Yellow for active (clock)
      : 'red', // Red for failed (cross)
}));

function ColorlibStepIcon(props) {
  const { active, completed, icon, className } = props;

  const icons = {
    1: <DoneIcon />, // Tick
    2: <DoneIcon />, // Clock
    3: <DoneIcon />, // Clock
    4: <ScheduleIcon />, // Cross
    // 1: <DoneIcon />, // Tick
    // 2: <ScheduleIcon />, // Clock
    // 3: <ScheduleIcon />, // Clock
    // 4: <CloseIcon />, // Cross
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Site survey', 'Installation', 'Commissioning', 'Maintanence'];
const data = {
  locationName: 'MCC - Mysore road',
  address: 'Bangalore, Karnataka',
  type: 'Mall',
  accessibility: 'Public',
  stats: {
    total: 5,
    ac: 2,
    dc: 1,
    twoWheelerDC: 1,
    energyDispersed: 3000,
    visits: 90,
    occupancyRate: 75,
    kmsPowered: 30000,
    co2Saved: 1245,
    uptimeRate: 90
  },
  contact: {
    phone: '+91 9090909090',
    spoc: {
      name: 'Visswanath',
      phone: '9876543210'
    },
    accounts: {
      name: 'Visswanath',
      phone: '9876543210'
    },
    maintenance: {
      name: 'Visswanath',
      phone: '9876543210'
    },
    gm: {
      name: 'Visswanath',
      phone: '9876543210'
    },
    siteEngineer: {
      name: 'Visswanath',
      phone: '9876543210'
    }
  }
};
const statusList1 = [
  'Active',
  'Unpaid',
  'Paid'
  // 'Inuse'
];

const ViewCharger = () => {
  // const { energyCons } = reportsLineChartData;
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  console.log(location.state);
  const [content, setContent] = useState([]);
  const [columns, setColumns] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [co2Saved, setCo2Saved] = useState('0 kg');
  const [kmsPowered, setKmsPowered] = useState('0 km');
  const [uptimeRate, setUptimeRate] = useState('99 %');
  const [isLoading1, setIsLoading1] = useState(true);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const navigate = useNavigate();
  const handleTransactionEdit = (row_data) => {
    navigate("/session", { state: { _id: row_data?._id } });
  };
  const fetchSession = async () => {
    // await axios.post(process.env.REACT_APP_BASEURL + `session/get-session-by-charger`, {
    //   headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    // })
    const payload = {
      "chargerId": location.state.charger_id
    };
    await axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "session/get-session-by-charger",
      data: payload,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success) {
          setCo2Saved(response.data.data.CO2Saved);
          setKmsPowered(response.data.data.kmsPowered);
          setUptimeRate(response.data.data.uptimeRate);
          const updatedRows = response.data.data.sessions.map(session => {
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
          setRows1(sortedRows);
          setIsLoading1(false);
          // setContent(sortedRows);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading1(false);
        }
      }).catch(error => {
        console.error(error);
      });
  };
  console.log(isLoading1)
  useEffect(() => {
    setContent(location.state);
    fetchSession();
    setColumns(sessionColumn);
  }, []);
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
  const handleView = (row_data) => {
    // console.log(content)
    navigate("/location/view", { state: content?.locationId });
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="lg" style={{ backgroundColor: "#F0F0F0" }}>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12} sm={8}>
              {/* <Flex gap="4px 0" wrap> */}
              {content?.status === "Available" ?
                <Tag icon={<CheckCircleOutlined />} color="success" style={{ marginBottom: "1rem" }}>
                  Available
                </Tag>
                : content?.status === "Preparing" ?
                  <Tag icon={<SyncOutlined spin />} color="warning" style={{ marginBottom: "1rem" }}>
                    Preparing
                  </Tag>
                  : content?.status === "Inactive" ?
                    <Tag icon={<CloseCircleOutlined />} color="error" style={{ marginBottom: "1rem" }}>
                      Inactive
                    </Tag>
                    :
                    content?.status === "Charging" ?
                      <Tag icon={<LoadingOutlined />} color="#1A73E8" style={{ marginBottom: "1rem" }}>
                        Charging
                      </Tag>
                      :
                      content?.status === "Finishing" ?
                        <Tag icon={<ExclamationCircleOutlined />} color="#800080" style={{ marginBottom: "1rem" }}>
                          Finishing
                        </Tag>
                        :
                        content?.status === "Faulted" ?
                          <Tag icon={<MinusCircleOutlined />} color="#E64A19" style={{ marginBottom: "1rem" }}>
                            Faulted
                          </Tag>
                          :
                          <Tag icon={<ClockCircleOutlined />} color="default" style={{ marginBottom: "1rem" }}>
                            {content?.status}
                          </Tag>
              }
              {/* <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  warning
                </Tag> */}
              {/* {JSON.stringify(data)} */}
              {/* </Flex> */}
              <Typography variant="h4" component="h1" gutterBottom>
                {content?.charger_id}
              </Typography>
              <Typography variant="subtitle1" sx={{ lineHeight: "36px" }}>
                {content?.c_type} &nbsp; | &nbsp; {content?.energy_disp}
              </Typography>
              <Typography variant="subtitle1" sx={{ lineHeight: "36px" }}>
                {content?.location} &nbsp;|&nbsp; {content?.l_type} &nbsp;|&nbsp; {data.accessibility}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: "36px" }}>
                {content?.city}, {content?.state}
              </Typography>
              {/* Statistics Section */}
              <Grid item xs={12}
              // md={6}
              // style={{ marginTop: "2rem" }}
              >
                <br />
                <Stepper alternativeLabel activeStep={4} connector={<ColorlibConnector />}
                  style={{ background: "none", boxShadow: "none" }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={ColorlibStepIcon} style={{ color: 'black !important', textTransform: "none" }}
                        sx={{
                          '& .MuiStepLabel-label': {
                            color: 'black !important', // Enforce black color for all labels
                            fontWeight: 'bold', // Optional: Make the text bold
                            fontSize: '1rem', // Optional: Make the text bold
                            textTransform: 'none', // Optional: Disable automatic text transform
                          },
                          '& .MuiStepLabel-label.Mui-active': {
                            color: 'black !important', // Override the default active color
                          },
                          '& .MuiStepLabel-label.Mui-completed': {
                            color: 'black !important', // Override the completed color
                          },
                        }}
                      >{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Grid>

              {/* Additional Stats */}
              <Grid item
                xs={12}
                mt={6}
              // xs={12} md={8} lg={6}
              // md={6}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value={kmsPowered} label="KMS powered (km)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value={co2Saved} label="CO2 saved (kg)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value={uptimeRate} label="Uptime rate (%)" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {/* placement of image */}
            <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card style={{ padding: "0 4rem" }}>
                    <CardMedia
                      component="img"
                      height="600"
                      image={charger}
                      alt="Charger Image"
                      style={{ width: '100%', margin: 0, borderRadius: 0, objectFit: "fill" }}
                    />
                  </Card>
                </Grid>
              </Grid>
            </Grid>
            <Divider dashed
              style={{
                borderColor: 'rgba(0, 0, 0, 0.15)',
              }}
            />
            <Grid item xs={12}>
            <Card
              style={{ marginTop: '2rem' }}
            // style={{ marginTop: '4rem' }}
            >
              <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                  <MDTypography variant="h6" color="white">
                    All Sessions of Chargers {content?.charger_id}
                  </MDTypography>
                  {/* <Button icon={<AddIcon />} iconPosition="start" variant="outlined" size="large" onClick={() => setOpenDialog(true)}>
              Add Charger
            </Button> */}
                </Grid>
              </MDBox>
              {isLoading1 ? (
                <Loader />
              ) : (<MaterialReactTable
                id="tble"
                columns={columns}
                data={rows1}
                initialState={{ showColumnFilters: true }}
                muiTableContainerProps={{
                  id: 'tble', // Attach the ID here to the container of the table
                }}
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
            </Grid>
            <Grid item xs={12} sm={8} sx={{ my: 4 }}>
              <Box sx={{ height: 300 }}>
                <Grid item xs={12}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      sx={{ backgroundColor: "#E4F4D9" }}
                    >
                      <Typography variant="h6">Maintenance</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box my={2}>
                        {/* First Section */}
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Charge Status:</Typography>
                              <Typography variant="body2" width={"60%"}>Offline</Typography>
                            </Box>
                            <Link style={{ textDecoration: "underline !important", cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Registration State:</Typography>
                              <Typography variant="body2" width={"60%"}>Accepted</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Heartbeat Interval:</Typography>
                              <Typography variant="body2" width={"60%"}>5 sec</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Site Survey Team:</Typography>
                              <Typography variant="body2" width={"60%"}>Lorem ipsum</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Diagnostics:</Typography>
                              <Typography variant="body2" width={"60%"}>Lorem ipsum</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Firmware Update:</Typography>
                              <Typography variant="body2" width={"60%"}>Lorem ipsum</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Installation Team:</Typography>
                              <Typography variant="body2" width={"60%"}>Lorem ipsum</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                      sx={{ backgroundColor: "#E4F4D9" }}
                    >
                      <Typography variant="h6">Location</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box my={2}>
                        {/* Second Section */}
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Location Name:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.location}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Location Type:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.l_type}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Location Address:</Typography>
                              {/* <Typography variant="body2">Lorem ipsum dolor sit amet consectetur...</Typography> */}
                              <Typography variant="body2" width={"60%"}>{content?.address}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Link style={{ cursor: "pointer" }} onClick={handleView}>View Location</Link>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                      sx={{ backgroundColor: "#E4F4D9" }}
                    >
                      <Typography variant="h6">More info</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box my={2}>
                        {/* Third Section */}
                        <Box display="flex" flexDirection="column" gap={2}>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Charger Name/ID:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.charger_id}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Charger Type:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.c_type}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between" >
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Charger Power:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.powerOutput}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Make:</Typography>
                              <Typography variant="body2" width={"60%"}>ChrgUp</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Model:</Typography>
                              <Typography variant="body2" width={"60%"}>Chrgup7</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">OCPP Version:</Typography>
                              <Typography variant="body2" width={"60%"}>1.6</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Firmware Version:</Typography>
                              <Typography variant="body2" width={"60%"}>0.0.4.6</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                          <Box display="flex" justifyContent="space-between">
                            <Box display="flex" justifyContent="space-between" width={"80%"}
                              sx={{
                                flexDirection: {
                                  xs: 'column',
                                  sm: 'row'
                                }
                              }}
                            >
                              <Typography variant="body2" fontWeight="bold">Serial Number:</Typography>
                              <Typography variant="body2" width={"60%"}>{content?.charger_id}</Typography>
                            </Box>
                            <Link style={{ cursor: "pointer" }}>Edit</Link>
                          </Box>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ my: 4, textAlign: 'right' }}>
              <Link href="#" sx={{ textDecoration: 'underlined !important' }}>Activity log</Link>
            </Grid>
          </Grid>

        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ViewCharger;