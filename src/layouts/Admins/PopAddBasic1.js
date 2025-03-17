import MDBox from "components/MDBox";
import axios from "axios";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Grid } from '@mui/material';
import MDTypography from "components/MDTypography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MDBackdrop from "components/MDBackdrop";
import { useSnackbar } from "notistack";
import FormLabel from '@mui/material/FormLabel';
import { Checkbox, Col, Row } from 'antd';
// import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import { Country, State, City } from 'country-state-city';

import Completion from "./Completion";
import '../user_service_maintenace_mgmt/Somecss.css';

const services = [
    {
        name: "Charger Mgmt",
        id: 1
    },
    {
        name: "User Mgmt",
        id: 2
    },
    {
        name: "Location Mgmt",
        id: 3
    },
    {
        name: "Service & maintenance",
        id: 4
    },
    {
        name: "Push Notifications",
        id: 5
    },
    {
        name: "Customer service",
        id: 6
    },
    {
        name: "Reports",
        id: 7
    },
];


function PopAddBasic1(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(props.isDialog);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const [values, setValues] = useState(props.value);
    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };
    const reset = (event) => {
        event.preventDefault();
        values.username = "";
        values.password = "";
        values.company = "";
        values.department = "";
        values.serviceID = [];
        values.email = ""
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    console.log(values);
    const isValidImage = (file) => {
        // Check if the file type starts with 'image'
        return file.type.startsWith('image/');
    };
    const pop = () => {
        if (!values.username || !values.email || !values.password || !values.company || !values.department) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        createUser();
        // setIsDisabled(!isDisabled);
        // setIsDialog(true);
    };
    const createUser = () => {
        onClose(false);
        const payload = {
            "email": values.email,
            "username": values.username,
            "password": values.password,
            "company": values.company,
            "serviceID": values.serviceID,
            "department": values.department,
            "role": "Manager",
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/create-manager",
            data: payload, // JSON payload
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    console.log(response.data);
                    setIsDisabled(!isDisabled);
                } else {
                    enqueueSnackbar(response.data.message, { variant: 'error' });
                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
            });
    };
    const onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        // setCheckedValues(values);
        setValues((prevValues) => ({
            ...prevValues,
            serviceID: checkedValues,
        }));
    };
    useEffect(() => {
        setIsDialogOpen(props.isDialog);
    }, [props.isDialog]);
    return (
        <>
            <Completion
                isDialog={isDisabled}
                onClose={setIsDisabled}
            // value={values}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            {/* <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" > */}
            <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Add Manager Information
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? { color: "#ffffff" } : theme}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} px={3}>
                        <MDBox pt={0}>
                            {/* <MDBox pt={6} pb={3}> */}
                            {/* <Grid container spacing={6}> */}
                            {/* <Grid item xs={12}> */}
                            {/* <Card> */}
                            {/* <MDBox
                                                mx={2}
                                                mt={-3}
                                                py={3}
                                                px={2}
                                                variant="gradient"
                                                bgColor="info"
                                                borderRadius="lg"
                                                coloredShadow="info"
                                            > */}
                            {/* <MDTypography variant="h6" color="white">
                                                    Personal information
                                                </MDTypography> */}
                        </MDBox>

                        <MDBox p={1} component="form" role="form">
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Username"
                                    value={values.username}
                                    name="username"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="password"
                                    label="Password"
                                    value={values.password}
                                    name="password"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="email"
                                    label="Email"
                                    value={values.email}
                                    name="email"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="location-type-label">Company</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="company-label"
                                        id="company-select"
                                        value={values.company}
                                        name="company"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Company" />}
                                    >
                                        <MenuItem value="Esyasoft Tech">Esyasoft Tech</MenuItem>
                                        <MenuItem value="Esyasoft Mobility">Esyasoft Mobility</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="location-type-label">Department</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="department-label"
                                        id="department-select"
                                        value={values.department}
                                        name="department"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Department" />}
                                    >
                                        <MenuItem value="Chrgup">Chrgup</MenuItem>
                                        <MenuItem value="IT & Support">IT & Support</MenuItem>
                                        <MenuItem value="Human Resources">Human Resources</MenuItem>
                                        <MenuItem value="Finance & Accounting">Finance & Accounting</MenuItem>
                                        <MenuItem value="Operations">Operations</MenuItem>
                                        <MenuItem value="Sales & Marketing">Sales & Marketing</MenuItem>
                                        <MenuItem value="Product Management">Product Management</MenuItem>
                                        <MenuItem value="Engineering & Development">Engineering & Development</MenuItem>
                                        <MenuItem value="Quality Assurance">Quality Assurance</MenuItem>
                                        <MenuItem value="Legal & Compliance">Legal & Compliance</MenuItem>
                                        <MenuItem value="Procurement & Vendor Management">Procurement & Vendor Management</MenuItem>
                                        <MenuItem value="Others">Others</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormLabel>Services</FormLabel>
                            </MDBox>
                            <MDBox p={1}>
                                <Checkbox.Group
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={onChange}
                                    value={values.serviceID}
                                >
                                    <Row gutter={16}>
                                        {services.map((service, index) => (
                                            <Col key={index} xs={24} sm={12} md={8}>
                                                <Checkbox value={service.id}>{service.name}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    <MDButton variant="gradient" color="info" onClick={reset}>
                        Reset
                    </MDButton>
                    <MDButton variant="gradient" color="info"
                        // onClick={handleSubmit}
                        onClick={pop}
                    >
                        Submit
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddBasic1;