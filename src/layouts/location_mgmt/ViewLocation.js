import React from 'react';
import { Box, Container, Grid, Typography, Paper, Avatar, IconButton, Card, CardContent, CardMedia } from '@mui/material';
import { green } from '@mui/material/colors';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

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
  return (
    <DashboardLayout>
      <DashboardNavbar />
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h4" component="h1" gutterBottom>
              {data.locationName}
            </Typography>
            <Typography variant="subtitle1">
              {data.address}
            </Typography>
            <Typography variant="body2">
              {data.type} | {data.accessibility}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
            <IconButton color="primary">
              <LocationOnIcon />
            </IconButton>
          </Grid>

          {/* Statistics Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6">{data.stats.total}</Typography>
                  <Typography variant="body2">Total</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{data.stats.ac}</Typography>
                  <Typography variant="body2">AC</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{data.stats.dc}</Typography>
                  <Typography variant="body2">DC</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6">{data.stats.twoWheelerDC}</Typography>
                  <Typography variant="body2">2wDC</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Stats */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
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
            </Paper>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12}>
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
          </Grid>

          {/* Placeholder for Energy Consumed Graph */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h6">Energy Consumed</Typography>
              <Box sx={{ height: 300 }}>
                {/* Insert your graph component here */}
              </Box>
            </Paper>
          </Grid>
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

