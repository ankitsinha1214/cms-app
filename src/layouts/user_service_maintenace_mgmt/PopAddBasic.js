import MDBox from "components/MDBox";
import axios from "axios";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Grid } from '@mui/material';
// import Dialog from "assets/theme/components/dialog";
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
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// import { Flex, TimePicker } from 'antd';
import './Somecss.css';
// const { RangePicker } = TimePicker;

function PopAddBasic(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(props.isDialog);
    const [fileList, setFileList] = useState([
        // {
        //     uid: '-1',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-2',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-3',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-4',
        //     name: 'image.png',
        //     status: 'done',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-xxx',
        //     percent: 50,
        //     name: 'image.png',
        //     status: 'uploading',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
        // {
        //     uid: '-5',
        //     name: 'image.png',
        //     status: 'error',
        // },
    ]);
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                color: 'grey'
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const handleUploadChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");

    const { enqueueSnackbar } = useSnackbar();

    // const createUser = (locationName, locationType, address, state, city,status, paidup_capital, activity_code, activity_description, registered_office_address) => {
    //     const axios = require("axios");
    //     alert("All input are correct");
    // };
    console.log(fileList)
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
        if (!values.username || !values.password || !values.company || !values.department) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        createUser();
        // setIsDisabled(!isDisabled);
        // setIsDialog(true);
    };
    const createUser = () => {
        onClose(false);
        const payload = {
            "username": values.username,
            "password": values.password,
            "company": values.company,
            "department": values.department,
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/register",
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
                    User Information
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
                                        <MenuItem value="Esyasoft">Esyasoft</MenuItem>
                                        <MenuItem value="Esyasoft1">Esyasoft1</MenuItem>
                                        <MenuItem value="Esyasoft2">Esyasoft2</MenuItem>
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
                                        <MenuItem value="Chargeup">Chargeup</MenuItem>
                                        <MenuItem value="Chargeup1">Chargeup1</MenuItem>
                                        <MenuItem value="Chargeup2">Chargeup2</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>

                            {/* <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="location-type-label">Location Type</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="location-type-label"
                                        id="location-type-select"
                                        value={values.locationType}
                                        name="locationType"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Location Type" />}
                                    >
                                        <MenuItem value="Petrol Pumps">Petrol Pumps</MenuItem>
                                        <MenuItem value="Malls">Malls</MenuItem>
                                        <MenuItem value="Highways">Highways</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Address"
                                    value={values.address}
                                    name="address"
                                    multiline
                                    rows={4}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">State</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select State"
                                        value={values.state}
                                        name="state"
                                        onChange={handleStateChange}
                                        input={<OutlinedInput label="State" />}
                                    >
                                        {states.map((state, index) => (
                                            <MenuItem
                                                key={index}
                                                value={state.name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">City</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select City"
                                        value={values.city}
                                        name="city"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="City" />}
                                    >
                                        {cities.map((city, index) => (
                                            <MenuItem
                                                key={index}
                                                value={city.name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        // name="row-radio-buttons-group"
                                        value={values.status}
                                        name="status"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                                        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                        <FormControlLabel value="Waitlisted" control={<Radio />} label="Waitlisted" />
                                    </RadioGroup>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                            <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Working Days</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Working Days"
                                        value={values.workingDays}
                                        name="workingDays"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Working Days" />}
                                    >
                                            <MenuItem
                                                value={"Everyday"}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                Everyday
                                            </MenuItem>
                                            <MenuItem
                                                value={"Monday-Saturday"}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                Monday-Saturday
                                            </MenuItem>
                                            <MenuItem
                                                value={"Monday-Friday"}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                Monday-Friday
                                            </MenuItem>
                                            <MenuItem
                                                value={"Monday-Thrusday"}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                Monday-Thrusday
                                            </MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormLabel>Working Days</FormLabel>
                                    <Flex gap={8}>
                                        <RangePicker use12Hours format="h a" placeholder={['Start Time', 'End Time']} changeOnScroll needConfirm={false} onChange={handleRangeChange} />
                                    </Flex>
                            </MDBox>
                            <Grid container>
                                <Grid item xs={6}>
                                    <MDBox p={1}>
                                        <FormLabel>Free Parking</FormLabel><br />
                                        <Switch
                                            checked={values.freepaid.parking}
                                            // name="parking"
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            onChange={handleFreePaidChange}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={6}>
                                    <MDBox p={1}>
                                        <FormLabel>Free Charging</FormLabel><br />
                                        <Switch
                                            checked={values.freepaid.charging}
                                            // name="charging"
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            onChange={handleFreePaidChangeCharging}
                                        />
                                    </MDBox>
                                </Grid>
                            </Grid>


                            <MDBox p={1}>
                                {
                                    initialLocation &&
                                    <LocationPicker
                                        initialLocation={initialLocation}
                                        onLocationChange={handleLocationChange}
                                    />
                                }
                            </MDBox>
                            <MDBox p={1}>
                                <FormLabel >Location Image</FormLabel>

                            </MDBox>

                            <MDBox p={1}>
                                <Upload
                                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleUploadChange}
                                >
                                    {fileList.length >= 6 ? null : uploadButton}
                                </Upload>

                            </MDBox> */}
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    {/* <Button onClick={handleSubmit} autoFocus>
                        Upload File
                    </Button> */}
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

export default PopAddBasic;