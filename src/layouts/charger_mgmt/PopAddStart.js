import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
// import Dialog from "assets/theme/components/dialog";
import MDTypography from "components/MDTypography";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import { Select, Space } from 'antd';
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import IconButton from '@mui/material/IconButton';
import Completion from "./Completion";
import { Image } from "antd";

function PopAddStart(props) {
    // const data = useSelector((s) => s);
    // console.log(data);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [fileName, setFileName] = useState("");
    const [vehicles, setVehicles] = useState([]);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;

    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    // const getValues = () => {
    //   return {
    //     first_name: "",
    //     last_name: "",
    //     phone_number: "",
    //     email: "",
    //     gender: "",
    //     date_of_birth: "",
    //     state: "",
    //     city: "",
    //     paidup_capital: "",
    //     activity_code: "",
    //     activity_description: "",
    //     registered_office_address: "",
    //     roc: "",
    //     company_status: ""
    //   };
    // };

    const createUser = (tag_id, charger_id, vehicleId, connectorId, reason) => {
        // alert("All input are correct")
        const payload = {
            "action": "start",
            "chargerId": charger_id,
            "vehicleId": vehicleId,
            "payload": {
                "idTag": tag_id,
                "connectorId": connectorId,
            },
            "sessionReason": reason
        };
        const token = localStorage.getItem("token");
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "session/transaction",
            data: payload, // JSON payload
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.data.status) {
                    enqueueSnackbar(response.data.message, { variant: 'success' });
                    // navigate("/location");
                    window.location.reload();
                } else {
                    console.log("status is false ");
                    enqueueSnackbar(response.data.message, { variant: 'error' });

                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar("An error occurred while stopping the charger.", { variant: 'error' });
                // enqueueSnackbar(error, { variant: 'error' });
            });
    };

    const [values, setValues] = useState(props.value);
    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values)
        if (!values.tag_id || !values.charger_id || !values.vehicleId || !values.connectorId || !values.reason) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        createUser(values.tag_id, values.charger_id, values.vehicleId, values.connectorId, values.reason);
    };
    const handleClose = () => {
        onClose(false);
    };
    const pop = () => {
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled)
        // setIsDialog(true);
    };
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };

    const getAllVehiclesOfUser = () => {
        const token = localStorage.getItem("token");
        axios({
            method: "get",
            url: process.env.REACT_APP_BASEURL + `users/${values.tag_id}/vehicles`,
            headers: {
                "Authorization": `Bearer ${token}`
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    const data = response.data.data;
                    // const structuredData = {};
                    // console.log(data);
                    // data.forEach(stateObj => {
                    //     const state = Object.keys(stateObj)[0];
                    //     const cities = stateObj[state];
                    //     structuredData[state] = cities;
                    // });
                    // setStateData(structuredData);
                    // setVehicles(Object.keys(structuredData));
                    setVehicles(data);
                    // setState_show(response.data.data);
                } else {
                    console.log("status is false ");
                    setVehicles([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setVehicles([]);
            });
    };

    useEffect(() => {
        if (
            localStorage.getItem("login_status") !== "true"
        ) {
            navigate("/sign-in");
        }
        if (values.tag_id) {
            getAllVehiclesOfUser();
        }
        else {
            setVehicles([]);
        }
    }, [values.tag_id]);
    return (
        <>
            <Completion
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton aria-label="delete" onClick={back} style={darkMode ? { color: "#ffffff" } : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                    Start transaction
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? { color: "#ffffff" } : theme}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} px={3}>
                        <MDBox pt={0}>
                        </MDBox>
                        <MDBox p={2} component="form" role="form">
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Mobile number / Tag ID"
                                    placeholder="Enter mobile number / Tag ID"
                                    value={values.tag_id}
                                    name="tag_id"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>

                            {/* <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Location"
                                    value={values.location}
                                    name="location"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox> */}
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Charger name / ID"
                                    value={values.charger_id}
                                    name="charger_id"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Vehicle</InputLabel>
                                    <Select
                                        showSearch
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Vehicle"
                                        value={values.vehicleId}
                                        name="vehicleId"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Vehicle" />}
                                    >
                                        {vehicles.length > 0 ? (
                                            vehicles.map((city, index) => (
                                                <MenuItem key={index} value={city._id}>
                                                    {city.vehicle_img && (
                                                        <Image src={process.env.REACT_APP_AWS_BASEURL + city.vehicle_img} width={24} height={24} preview={false} alt="logo" />
                                                    )}
                                                    {city.make} {city.model} {city.variant}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled>No Data</MenuItem>
                                        )}
                                    </Select>
                                    {/* <Select
                                        status="error"
                                        style={{
                                            width: '100%',
                                        }}
                                    /> */}
                                </FormControl>
                            </MDBox>
                            {/* <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Vehicle ID"
                                    value={values.vehicleId}
                                    name="vehicleId"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox> */}
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Connector ID"
                                    value={values.connectorId}
                                    name="connectorId"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Start reason"
                                    value={values.reason}
                                    name="reason"
                                    multiline
                                    rows={5}
                                    placeholder="Enter Reason for Starting the Charger.. "
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    {/* <Button onClick={handleSubmit} autoFocus>
                        Upload File
                    </Button> */}
                    <MDButton style={{ width: "87%", }} variant="gradient" color="info" onClick={handleSubmit}>
                        START
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddStart;