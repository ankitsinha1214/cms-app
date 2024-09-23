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
import first from "../../assets/images/demoLocation/1.png";
import first2 from "../../assets/images/demoLocation/2.png";
import first3 from "../../assets/images/demoLocation/3.png";
import first4 from "../../assets/images/demoLocation/4.png";
import first5 from "../../assets/images/demoLocation/5.png";
import first6 from "../../assets/images/demoLocation/6.png";
import WifiIcon from '@mui/icons-material/Wifi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WcIcon from '@mui/icons-material/Wc';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import StoreIcon from '@mui/icons-material/Store';
import NatureIcon from '@mui/icons-material/Nature';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
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

const iconMap = {
  PetrolPumps: <LocalGasStationIcon />,
  ShoppingCenters: <ShoppingCartIcon />,
  Hotels: <HotelIcon />,
  Cafes: <LocalCafeIcon />,
  ATM: <LocalAtmIcon />,
  Pharmacies: <MedicationIcon />,
  "Wi-Fi Zones": <WifiIcon />,
  GroceryStores: <StoreIcon />,
  EVMaintenanceServices: <EngineeringIcon />,
  CarWash: <LocalCarWashIcon />,
  RecreationalAreas: <NatureIcon />,
  FitnessCenters: <FitnessCenterIcon />,
  CulturalSites: <TempleHinduIcon />,
  PublicTransportationHubs: <EmojiTransportationIcon />,
  Toilets: <WcIcon />,
  Parking: <LocalParkingIcon />,
  Restaurant: <RestaurantIcon />,
  // Location: <LocationOnIcon />,
};

const ViewLocation = () => {
  // const { energyCons } = reportsLineChartData;
  const location = useLocation();
  console.log(location.state);
  const additionalImages = [first2, first3, first4, first5, first6];
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
              {content?.status === "Active" ?
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Live
                </Tag>
                : content?.status === "Pending" ?
                  <Tag icon={<SyncOutlined spin />} color="warning">
                    Pending
                  </Tag>
                  : content?.status === "Inactive" ?
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Inactive
                    </Tag>
                    : content?.status === "Waitlisted" ?
                      <Tag icon={<ClockCircleOutlined />} color="default">
                        waiting
                      </Tag> :
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
                {content?.locationName}
              </Typography>
              <Typography variant="subtitle1">
                {content?.city}, {content?.state}
              </Typography>
              <Typography variant="body2">
                {content?.locationType} | {data.accessibility}
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
                      height="200"
                      image={first}
                      alt="main image"
                      style={{ width: '100%', margin: 0, borderRadius: 0, objectFit: "fill" }}
                    />
                    <CardContent style={{ padding: 0 }}>
                      <Grid container spacing={0.2}>
                        {/* Additional images */}
                        {additionalImages.map((image, index) => (
                          <Grid item xs={2.4} key={index}>
                            <CardMedia
                              component="img"
                              height="100"
                              image={image}
                              alt={`image ${index + 1}`}
                              style={{ width: '100%', margin: 0, borderRadius: 0, objectFit: "fill" }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                    {/* Address and Phone Number */}
                    <Box padding={4}>
                      <Grid container spacing={1} >
                        <Grid item xs={12}>
                          <Typography variant="h6">Address</Typography>
                          <Typography mb={2}>{content?.address}</Typography>
                          <Typography variant="h6">Phone no</Typography>
                          <Typography mb={3}>{data.contact.phone}</Typography>
                          <Typography variant="h6">Hours</Typography>
                          <Typography mb={3}>{content?.workingDays} {content?.workingHours}</Typography>
                        </Grid>
                        {/* Facilities */}
                        <Grid item xs={12} mb={2}>
                          <Typography variant="h6" mb={1.5}>Facilities</Typography>
                          <Grid container spacing={2}>
                            {Array.isArray(content?.facilities) && content?.facilities.map((facility, index) => (
                              <Tooltip title={facility.name}>
                                <Grid item xs={4} sm={2} key={index}>
                                  <Avatar sx={{ bgcolor: green[500], width: 40, height: 40 }}>
                                    {iconMap[facility.name] || <MoreHorizIcon />}
                                  </Avatar>
                                </Grid>
                              </Tooltip>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
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

// import React from 'react';
// import {
//   Box, Container, Grid, Typography, Paper, IconButton,
//   Card, CardContent, CardMedia, Avatar
// } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import './Viewlocation.css';

// const data = {
//   locationName: 'MCC - Mysore road',
//   address: 'Bangalore, Karnataka',
//   type: 'Mall',
//   accessibility: 'Public',
//   stats: {
//     total: 5,
//     ac: 2,
//     dc: 1,
//     twoWheelerDC: 1,
//     energyDispersed: 3000,
//     visits: 90,
//     occupancyRate: 75,
//     kmsPowered: 30000,
//     co2Saved: 1245,
//     uptimeRate: 90
//   },
//   contact: {
//     phone: '+91 9090909090',
//     spoc: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     accounts: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     maintenance: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     gm: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     siteEngineer: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     }
//   }
// };

// const ViewLocation = () => {
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Grid container spacing={3}>
//             {/* Header Section */}
//             <Grid item xs={12} sm={8}>
//               <Typography variant="h4" component="h1" gutterBottom>
//                 {data.locationName}
//               </Typography>
//               <Typography variant="subtitle1">
//                 {data.address}
//               </Typography>
//               <Typography variant="body2">
//                 {data.type} | {data.accessibility}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
//               <IconButton color="primary">
//                 <LocationOnIcon />
//               </IconButton>
//             </Grid>

//             {/* Statistics Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="card-header">
//                 <Grid container spacing={2} className="card-content">
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.total}</Typography>
//                     <Typography variant="body2">Total</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.ac}</Typography>
//                     <Typography variant="body2">AC</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.dc}</Typography>
//                     <Typography variant="body2">DC</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.twoWheelerDC}</Typography>
//                     <Typography variant="body2">2wDC</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Additional Stats */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="card-header">
//                 <Grid container spacing={2} className="card-content">
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.energyDispersed}</Typography>
//                     <Typography variant="body2">Energy dispersed (kwh)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.visits}</Typography>
//                     <Typography variant="body2">Visits / Transactions</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.occupancyRate}%</Typography>
//                     <Typography variant="body2">Occupancy rate</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.kmsPowered}</Typography>
//                     <Typography variant="body2">KMS powered (km)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.co2Saved}</Typography>
//                     <Typography variant="body2">CO2 saved (kg)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.uptimeRate}%</Typography>
//                     <Typography variant="body2">Uptime rate</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Contact Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="contact-section">
//                 <Typography variant="h6">Contact Information</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="body2">Phone: {data.contact.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">SPOC</Typography>
//                     <Typography variant="body2">Name: {data.contact.spoc.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.spoc.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Accounts</Typography>
//                     <Typography variant="body2">Name: {data.contact.accounts.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.accounts.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Maintenance</Typography>
//                     <Typography variant="body2">Name: {data.contact.maintenance.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.maintenance.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">GM</Typography>
//                     <Typography variant="body2">Name: {data.contact.gm.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.gm.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Site Engineer</Typography>
//                     <Typography variant="body2">Name: {data.contact.siteEngineer.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.siteEngineer.phone}</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Facilities Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="contact-section">
//                 <Typography variant="h6">Facilities</Typography>
//                 <Box className="facilities">
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Placeholder for Energy Consumed Graph */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="graph">
//                 <Typography variant="h6">Energy Consumed</Typography>
//                 <Box sx={{ height: 300 }}>
//                   {/* Insert your graph component here */}
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </DashboardLayout>
//   );
// };

// export default ViewLocation;

