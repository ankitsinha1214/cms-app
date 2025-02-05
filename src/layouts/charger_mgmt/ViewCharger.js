import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Paper, Avatar, IconButton, Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { green } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import reportsLineChartData from "./components/reportsLineChartData";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart/New";
import first from "../../assets/images/chrger.png";
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
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

const ViewLocation = () => {
  // const { energyCons } = reportsLineChartData;
  const location = useLocation();
  console.log(location.state);
  const [content, setContent] = useState([]);
  useEffect(() => {
    setContent(location.state);
  }, []);
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
                    <InfoCard value='30000' label="KMS powered (km)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='1245' label="CO2 saved (kg)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='90%' label="Uptime rate (%)" />
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
                      image={first}
                      alt="main image"
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
                          </Box>
                          <Link href="/location">View Location</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
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
                            <Link style={{cursor: "pointer"}}>Edit</Link>
                          </Box>
                        </Box>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ my: 4, textAlign: 'right' }}>
              <Link href="#" sx={{textDecoration: 'underlined !important'}}>Activity log</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ViewLocation;