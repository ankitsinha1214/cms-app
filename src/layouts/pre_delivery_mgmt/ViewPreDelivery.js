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


const ViewPreDelivery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [content, setContent] = useState([]);
  const [questions, setQuestions] = useState([]);
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
      title: (location.state?.userServiceAndMaintenance?.username),
      desc: (location.state?.userServiceAndMaintenance?.email),
      desc1: (location.state?.userServiceAndMaintenance?.phone?.prefix) + ' ' + (location.state?.userServiceAndMaintenance?.phone?.number),
    }
  ];
  console.log(location.state);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setContent(location.state);
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "pre-delivery-question",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          const questionsWithResponses = response.data.data.map((question, index) => ({
            ...question,
            response: location.state.responses[index] || '', // Pair each question with its corresponding response
          }));
          setQuestions(questionsWithResponses);
          // setQuestions(response.data.data);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          navigate("/service-maintenace/pre-delivery");
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/service-maintenace/pre-delivery");
      });
  }, []);
  const handleSubmit = (status) => {
    setIsLoading(true);
    const payload = {
      "id": location.state?._id,
      "reason": reason,
      "type": 'charger-dc-box',
      "status": status,
    };
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "charger-dc-box/change-status",
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
          enqueueSnackbar(response.data.message, { variant: 'success' })
          setIsLoading(false);
          navigate("/service-maintenace/pre-delivery");
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
        {/* <Modal
          title="Please Give The Reason For Rejecting"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
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
        </Modal> */}
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {/* <Grid item xs={12} sm={7}> */}

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} sm={6}>
                  {/* {content?.status === "Approved" ?
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
                  } */}
                  {/* <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  warning
                </Tag> */}
                  {/* {JSON.stringify(data)} */}
                  {/* </Flex> */}
                  <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 1 }}>
                    Chargebox ID
                  </Typography>
                  <Typography variant="subtitle1">
                    {content?.chargebox_id}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{
                  textAlign: {
                    xs: 'left', // Align text to the left on extra-small screens
                    sm: 'right' // Align text to the right on small screens and larger
                  }
                }}>
                  <Typography variant="body">Pre Delivery done by </Typography>
                  <Typography variant="body" >{data1[0].title} </Typography>
                  <br/>
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
                    <Typography variant="h2">Responses</Typography>
                  </Divider>

                  {/* <Typography variant="h3">Meter Room</Typography> */}
                  {questions?.map((item, index) => (
                    // <div key={index}>
                    <Grid container spacing={2} key={index} sx={{ mb: 4}}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6" sx={{ mb: 2 }}>{index + 1}. {item.question}</Typography>
                        {
                          (item.response?.response) ?
                            (
                              <Typography variant="h6" sx={{ mb: 2 }}><Tag color="green">Yes</Tag></Typography>

                            ) :
                            <Typography variant="h6" sx={{ mb: 2 }}><Tag color="red">No</Tag></Typography>
                        }
                      </Grid>
                      {
                        (item.response.response_img !== "")?
                      <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end" >
                        <ImageBox imageList={item?.response} />
                      </Grid>:null
                      }
                    </Grid>
                  ))}
                  
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
          {/* {content?.status === "Waiting for approval" && (
            <>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button1 
                variant="contained" 
                onClick={showModal}
                color="error" 
                startIcon={<CloseIcon />} 
                sx={{ color: "red" }}
              >
                Reject
              </Button1>
              
              <Button1 
                variant="contained" 
                onClick={() => handleSubmit("Approved")} 
                color="success" 
                startIcon={<DoneIcon />} 
                sx={{ color: "green" }}
              >
                Approve
              </Button1>
            </Stack>
              </>
            )} */}
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

export default ViewPreDelivery;