import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import IconButton from '@mui/material/IconButton';
function PopAddStop(props) {
    // const data = useSelector((s) => s);
    // console.log(data);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [fileName, setFileName] = useState("");
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

    const createUser = (charger_id, session_id, reason ) => {
        // alert("All input are correct")
        const payload = {
            "action": "stop",
            "chargerId": charger_id,
            "payload": {
                "sessionId": session_id,
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
        if (!values.charger_id || !values.session_id || !values.reason) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        createUser(values.charger_id, values.session_id, values.reason);
    };
    const handleClose = () => {
        onClose(false);
    };
    // const pop = () => {
    //     setIsBackdrop(false);
    //     onClose(false);
    //     setIsDisabled(!isDisabled)
    //     // setIsDialog(true);
    // };
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };
    return (
        <>
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" ,display : "flex", alignItems : "center", justifyContent : "space-between"} : {theme,display : "flex", alignItems : "center", justifyContent : "space-between"}}>
                <IconButton aria-label="delete" onClick={back} style={darkMode ? {color: "#ffffff"} : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                         Stop transaction
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? {color: "#ffffff"} : theme}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} px={3}>
                        <MDBox pt={0}>
                        </MDBox>
                        <MDBox p={2} component="form" role="form">
                            {/* <MDBox p={1}>
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
                            </MDBox> */}

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
                                <MDInput
                                    type="text"
                                    label="Session ID"
                                    value={values.session_id}
                                    name="session_id"
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
                                    label="Stop reason"
                                    value={values.reason}
                                    name="reason"
                                    multiline
                                    rows={5}
                                    placeholder="Enter start reason"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940",justifyContent : "space-evenly", color: "#ffffff" } : {theme,justifyContent : "space-evenly"}}>
                    <MDButton style={{width:"87%",}} variant="gradient" color="info" 
                    onClick={handleSubmit}
                    >
                    STOP
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddStop;