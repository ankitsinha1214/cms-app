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

function PopAddBasic(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(props.isDialog);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("Created");

    const { enqueueSnackbar } = useSnackbar();
    const [values, setValues] = useState(props.value);
    console.log(props.value);
    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };
    const reset = (event) => {
        event.preventDefault();
        values.question = "";
        values.answer = "";
        values.category = "";
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
        if (!values.question || !values.answer || !values.category) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        createUser();
        // setIsDisabled(!isDisabled);
        // setIsDialog(true);
    };
    const createUser = () => {
        onClose(false);
        const payload = {
            "question": values.question,
            "answer": values.answer,
            "category": values.category
        };
        const isUpdate = values._id ? true : false; // Check if it's an update
        const method = isUpdate ? "put" : "post"; // Use PUT for updates
        const url = isUpdate
            ? `${process.env.REACT_APP_BASEURL}faq/${values._id}` // Update URL with ID
            : `${process.env.REACT_APP_BASEURL}faq`; // Create URL
        if(isUpdate){
            setDialogMessage("Updated")
        }
        axios({
            method: method,
            url: url,
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
    useEffect(() => {
        setValues(props.value);
    }, [props.value]);
    return (
        <>
            <Completion
                isDialog={isDisabled}
                onClose={setIsDisabled}
                message={dialogMessage}
            // value={values}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            {/* <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" > */}
            <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                   
                {values._id ? "Update" : "Create"} Faq Information
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
                                    label="Question"
                                    value={values.question}
                                    name="question"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Answer"
                                    value={values.answer}
                                    name="answer"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Category"
                                    value={values.category}
                                    name="category"
                                    // margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
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
                        {values._id ? "Update" : "Create"}
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddBasic;