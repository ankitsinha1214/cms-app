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
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Flex, Tag } from 'antd';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      borderColor: theme.palette.grey[800],
    }),
  },
}));

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
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      },
    },
  ],
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <DoneIcon />,
    2: <ScheduleIcon />,
    3: <ScheduleIcon />,
    4: <CloseIcon />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
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
  const renderContactDetails = (contact) => (
    Object.keys(contact).map((key) => (
      key !== 'phone' && (
        <Box key={key} display="flex" justifyContent="space-between" my={1}>
          <Typography variant="body2" fontWeight="bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
          <Typography variant="body2">{contact[key].name} - {contact[key].phone}</Typography>
        </Box>
      )
    ))
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="lg" style={{ backgroundColor: "#F0F0F0" }}>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12} sm={7}>
              {/* <Flex gap="4px 0" wrap> */}
              {content?.status === "Available" ?
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Available
                </Tag>
                : content?.status === "Inuse" ?
                  <Tag icon={<SyncOutlined spin />} color="warning">
                    Pending
                  </Tag>
                  : content?.status === "Inactive" ?
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Inactive
                    </Tag>
                    :
                    <Tag icon={<MinusCircleOutlined />} color="default">
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
              <Typography variant="subtitle1">
                {content?.charger_type} &nbsp; | &nbsp; {content?.energy_disp}
              </Typography>
              <Typography variant="subtitle1">
                {content?.location} &nbsp;|&nbsp; {content?.l_type} &nbsp;|&nbsp; {data.accessibility}
              </Typography>
              <Typography variant="body2">
                {content?.city}, {content?.state}
              </Typography>
              {/* Statistics Section */}
              <Grid item xs={12}
                // md={6}
                style={{ marginTop: "2rem" }}
              >
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.total}</Typography>
                      <Typography variant="body2">Total</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.ac}</Typography>
                      <Typography variant="body2">AC</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.dc}</Typography>
                      <Typography variant="body2">DC</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.twoWheelerDC}</Typography>
                      <Typography variant="body2">2wDC</Typography>
                    </Grid>
                  </Grid>
                </Paper>
                <br />
                  <Stepper alternativeLabel activeStep={3} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
              </Grid>
              <Divider dashed
                style={{
                  borderColor: '#D9D9D9',
                }}
              />
              {/* Additional Stats */}
              <Grid item
                xs={12}
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
                {/* <Paper elevation={3} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.energyDispersed}</Typography>
                      <Typography variant="body2">Energy dispersed (kwh)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.visits}</Typography>
                      <Typography variant="body2">Visits / Transactions</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.occupancyRate}%</Typography>
                      <Typography variant="body2">Occupancy rate</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.kmsPowered}</Typography>
                      <Typography variant="body2">KMS powered (km)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.co2Saved}</Typography>
                      <Typography variant="body2">CO2 saved (kg)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.uptimeRate}%</Typography>
                      <Typography variant="body2">Uptime rate</Typography>
                    </Grid>
                  </Grid>
                </Paper> */}
              </Grid>
              {/* Placeholder for Energy Consumed Graph */}
              <Grid item xs={12} sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  {/* <Typography variant="h6">Energy Consumed</Typography> */}
                  <Box sx={{ height: 300 }}>
                    {/* Insert your graph component here */}
                    {/* <Grid item xs={12}>
                      <Box mb={3}>
                        <ReportsLineChart
                          color="success"
                          title="Energy Consumed"
                          // description="Last Campaign Performance"
                          // date="just updated"
                          chart={energyCons}
                        />
                      </Box>
                    </Grid> */}
                    {/* Personal Information */}
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ backgroundColor: "#E4F4D9" }}
                        >
                          <Typography variant="h6">Personal Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box my={2}>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">First Name:</Typography>
                              <Typography variant="body2">Visswanath</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Last Name:</Typography>
                              <Typography variant="body2">Baskaran</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Phone No:</Typography>
                              <Typography variant="body2">XXXXXX5035</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Email ID:</Typography>
                              <Typography variant="body2">vissxxxx02@gmail.com</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Gender:</Typography>
                              <Typography variant="body2">Male</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Date of Birth:</Typography>
                              <Typography variant="body2">04-06-1999</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">State:</Typography>
                              <Typography variant="body2">Karnataka</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">City:</Typography>
                              <Typography variant="body2">Bangalore</Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} mt={0}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                          sx={{ backgroundColor: "#E4F4D9" }}
                        >
                          <Typography variant="h6">Contact Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {renderContactDetails(data.contact)}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {/* placement of image */}
            <Grid item xs={12} sm={5} display="flex" justifyContent="flex-end">
              {/* <IconButton color="primary">
                <LocationOnIcon />
              </IconButton> */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
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

            {/* Contact Section */}
            {/* <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Contact Information</Typography>
                    <Typography variant="body2">Phone: {data.contact.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">SPOC</Typography>
                    <Typography variant="body2">Name: {data.contact.spoc.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.spoc.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Accounts</Typography>
                    <Typography variant="body2">Name: {data.contact.accounts.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.accounts.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Maintenance</Typography>
                    <Typography variant="body2">Name: {data.contact.maintenance.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.maintenance.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">GM</Typography>
                    <Typography variant="body2">Name: {data.contact.gm.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.gm.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Site Engineer</Typography>
                    <Typography variant="body2">Name: {data.contact.siteEngineer.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.siteEngineer.phone}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid> */}


          </Grid>
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ViewLocation;