import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Box, Container, Grid, Typography, Paper, IconButton, Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { green } from '@mui/material/colors';
import { Modal } from 'antd';
import TextField from '@mui/material/TextField';
import { Avatar, List } from 'antd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSnackbar } from "notistack";
import { Divider } from 'antd';
import ImageBox from './Components/ImageBox';
import { Button as Button1 } from '@mui/material';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
// import VideoCanvas from './Components/VideoCanvas';
import { Button } from 'antd';

import { useNavigate } from "react-router-dom";
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

const ViewSitesurvey = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState([]);
  const [reason, setReason] = useState('');
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    if (!reason) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      handleSubmit("Rejected");
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  const data1 = [
    {
      title: (location.state?.userId?.username),
      desc: (location.state?.userId?.email),
      desc1: (location.state?.userId?.phone?.prefix) + ' ' + (location.state?.userId?.phone?.number),
    }
  ];
  console.log(location.state);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setContent(location.state);
  }, []);
  const handleSubmit = (status) => {
    setIsLoading(true);
    const payload = {
      "id": location.state?._id,
      "reason": reason,
      "type": 'site-survey',
      "status": status,
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "charger-dc-box/change-status",
      data: payload, // JSON payload
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
    })
      .then((response) => {
        console.log(response.data.message);
        if (response.data.success === true) {
          console.log(response);
          enqueueSnackbar(response.data.message, { variant: 'success' })
          setIsLoading(false);
          navigate("/site-survey");
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response.data.message, { variant: 'error' });
        setIsLoading(false);
      });
  };
  const handleChange = (event) => {
    setReason(event.target.value);
};
  // const renderContactDetails = (contact) => (
  //   Object.keys(contact).map((key) => (
  //     key !== 'phone' && (
  //       <Box key={key} display="flex" justifyContent="space-between" my={1}>
  //         <Typography variant="body2" fontWeight="bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
  //         <Typography variant="body2">{contact[key].name} - {contact[key].phone}</Typography>
  //       </Box>
  //     )
  //   ))
  // );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="lg" style={{ backgroundColor: "#F0F0F0" }}>
      <Modal
        title="Please Give The Reason For Rejecting"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
         {/* Reason TextField */}
    <div style={{ width: "100%", marginTop: "1.5rem" }}>
      <TextField
        error
        id="outlined-error"
        label="Reason"
        multiline
        rows={4}
        sx={{ width: '100%' }}
        value={reason}
    onChange={handleChange}
      />
    </div>
      </Modal>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12} sm={7}>
              {/* <Flex gap="4px 0" wrap> */}

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  {content?.status === "Approved" ?
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      {content?.status}
                    </Tag>
                    : content?.status === "Rejected" ?
                      <Tag icon={<CloseCircleOutlined />} color="error">
                        {content?.status}
                      </Tag>
                      : content?.status === "Waiting for approval" ?
                        <Tag icon={<ExclamationCircleOutlined />} color="warning">
                          {content?.status}
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
                  <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 1 }}>
                    {content?.locationId?.locationName}
                  </Typography>
                  <Typography variant="subtitle1">
                    {content?.locationId?.city}, {content?.locationId?.state}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                  textAlign: {
                    xs: 'left', // Align text to the left on extra-small screens
                    sm: 'right' // Align text to the right on small screens and larger
                  }
                }}>
                  <Typography variant="body">Site survey done by </Typography>
                  <Typography variant="body" >{data1[0].title} </Typography>
                  <Typography variant="body" sx={{
                    wordBreak: 'break-word', // Break long words
                    overflowWrap: 'break-word', // Break long words and URLs
                    whiteSpace: 'normal', // Allow text to wrap
                    mb: 1 // Margin bottom for spacing
                  }}><a href={`mailto:${data1[0].desc}`}>{data1[0].desc}</a> </Typography>
                  <Typography variant="h6">{data1[0].desc1}</Typography>

                  {/* <List
    itemLayout="horizontal"
    dataSource={data1}
    renderItem={(item, index) => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          // description={item.desc}
          description={`${item.desc} ${item.desc1}`}
          // description={item.desc1}
        />
      </List.Item>
    )}
  /> */}
                </Grid>
              </Grid>
              {/* <List.Item>
        <List.Item.Meta
          avatar={ <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>}
          title={<a href="https://ant.design">{content?.userId?.username}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item> */}
              {/* <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>A</Avatar> */}

              {/* Placeholder for Energy Consumed Graph */}
              <Grid item xs={12} sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Divider>
                    <Typography variant="h2">Power</Typography>
                  </Divider>
                  <Typography variant="h3">Meter Room</Typography>
                  <Typography variant="h6" sx={{ mb: 4 }}>Electric Meter</Typography>
                  {/* <Grid item xs={12}> */}
                  <ImageBox imageList={location?.state?.meterRoom?.electricMeter} />
                  <Typography variant="h6" sx={{ my: 2 }}>Electric Bill</Typography>
                  <ImageBox imageList={location?.state?.meterRoom?.electricBill} />
                  <Typography variant="h3" sx={{ my: 2 }}>Transformer</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Power availability</Typography>
                      <Typography variant="body2">{location?.state?.transformer?.powerAvailability} kW</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Load enhancement</Typography>
                      <Typography variant="body2">{location?.state?.transformer?.loadEnhancement}</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h3" sx={{ my: 2 }}>Wiring & cabling</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Distance - Meter room to DC box</Typography>
                      <Typography variant="body2">{location?.state?.cableLength?.distanceMeterRoomToDcBox} m</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Distance - DC box to charger</Typography>
                      <Typography variant="body2">{location?.state?.cableLength?.distanceDcBoxToDispenser} m</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">CD meter space availability</Typography>
                      <Typography variant="body2">{location?.state?.cableLength?.cdMeterSpAvail}</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" sx={{ my: 2 }}>Cable Length Images</Typography>
                  <ImageBox imageList={location?.state?.cableLength?.wiringAndCablingImages} />

                  <Typography variant="h3" sx={{ my: 2 }}>Conduit</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Requirement</Typography>
                      <Typography variant="body2">{location?.state?.conduit?.conduitRequirement}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Material</Typography>
                      <Typography variant="body2">{location?.state?.conduit?.conduitMaterial}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Distance - Meter room to DC box</Typography>
                      <Typography variant="body2">{location?.state?.conduit?.distanceMeterRoomToDcBox} m</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Distance - DC box to charger</Typography>
                      <Typography variant="body2">{location?.state?.conduit?.distanceDcBoxToCharger} m</Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="h3" sx={{ my: 2 }}>Earthing</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">Requirement</Typography>
                      <Typography variant="body2">{location?.state?.earthingRequirement}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>

            {/* placement of image */}
            <Grid item xs={12} sm={5} display="flex" justifyContent="flex-end">
              {/* <Grid container spacing={3}>
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
                    <Box padding={4}>
                      <Grid container spacing={1} >
                        <Grid item xs={12}>
                          <Typography variant="h6">Hours</Typography>
                          <Typography mb={2}>{content?.address}</Typography>
                          <Typography variant="h6">Phone no</Typography>
                          <Typography mb={3}>{data.contact.phone}</Typography>
                        </Grid>
                        <Grid item xs={12} mb={2}>
                          <Typography variant="h6" mb={1.5}>Facilities</Typography>
                          <Grid container spacing={2}>
                            {[1, 2, 3, 4, 5].map((_, index) => (
                              <Grid item xs={4} sm={2} key={index}> 
                                <Avatar sx={{ bgcolor: green[500], width: 40, height: 40 }}>
                                  <LocationOnIcon />
                                </Avatar>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
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
              </Grid> */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Divider>
                      <Typography variant="h3">Visibility</Typography>
                    </Divider>
                    <Typography variant="h6" sx={{ mb: 4 }}>Pictures</Typography>
                    {/* <Grid item xs={12}> */}
                    <ImageBox imageList={location?.state?.visibility?.pics} />
                    <Typography variant="h6" sx={{ my: 2 }}>Videos</Typography>
                    <video
                      // ref={videoRef}
                      src={`${process.env.REACT_APP_AWS_BASEURL}${location?.state?.visibility?.videos}`}
                      controls
                      style={{ width: '100%', height: '360px' }}
                    />
                    <Typography variant="h6" sx={{ my: 2 }}>Charging Area</Typography>
                    <Grid item xs={6}>
                      <Typography variant="h6">Obstruction</Typography>
                      <Typography variant="body2">{location?.state?.visibility?.obstruction}</Typography>
                    </Grid>
                    <Typography variant="h6" sx={{ my: 2 }}>Obstruction Pictures</Typography>
                    <ImageBox imageList={location?.state?.visibility?.obstructionPics} />
                    {/* <VideoCanvas videoSrc={`${process.env.REACT_APP_AWS_BASEURL}${location?.state?.visibility?.videos}`} /> */}
                    {/* </Grid> */}
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Divider>
                      <Typography variant="h3">Civil</Typography>
                    </Divider>
                    <Grid item xs={6}>
                      <Typography variant="h6">Flooring</Typography>
                      <Typography variant="body2">{location?.state?.civil?.flooring}</Typography>
                    </Grid>
                    <Typography variant="h6" sx={{ my: 2 }}>Flooring Pictures</Typography>
                    {/* <Grid item xs={12}> */}
                    <ImageBox imageList={location?.state?.civil?.pics} />
                    {/* <VideoCanvas videoSrc={`${process.env.REACT_APP_AWS_BASEURL}${location?.state?.visibility?.videos}`} /> */}
                    {/* </Grid> */}
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* {(content?.status === "Waiting for approval")?
            <>
          <Stack direction="row" spacing={2} sx={{mt: 2}}>
            <Button1 variant="contained" onClick={} color="error" startIcon={<CloseIcon />} sx={{ color: "red" }}>
              Reject
            </Button1>
            <Button1 variant="contained" onClick={handleSubmit("Approved")} color="success" startIcon={<DoneIcon />} sx={{ color: "green" }}>
              Approve
            </Button1>
          </Stack>
          <div style={{width: "100%", marginTop:"1.5rem"}}>
            <TextField
              error
              id="outlined-error"
              label="Reason"
              multiline
              rows={4}
            // defaultValue="Default Value"
            sx={{ width: '55%' }} 
            />
          </div>
          </>:null
          } */}
          {content?.status === "Waiting for approval" && (
  <>
    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
      {/* Reject Button */}
      <Button1 
        variant="contained" 
        onClick={showModal}// Add your onClick handler here
        color="error" 
        startIcon={<CloseIcon />} 
        sx={{ color: "red" }}
      >
        Reject
      </Button1>
      
      {/* Approve Button */}
      <Button1 
        variant="contained" 
        onClick={() => handleSubmit("Approved")} // Ensure handleSubmit function is properly defined
        color="success" 
        startIcon={<DoneIcon />} 
        sx={{ color: "green" }}
      >
        Approve
      </Button1>
    </Stack>
    
   
  </>
)}
          {/* <br /> */}
          {/* <Flex wrap gap="small">
    <Button danger>Reject</Button>
        <Button type="primary" ghost>
      Approve
    </Button>
  </Flex> */}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default ViewSitesurvey;