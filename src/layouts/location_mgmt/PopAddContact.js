import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MDBackdrop from "components/MDBackdrop";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useSnackbar } from "notistack";
import Completion from "./Completion";
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
function PopAddContact(props) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");

    // const getValues = () => {
    //   return {
    //     make: "",
    //     model: "",
    //     variant: "",
    //     registeration_number: "",
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

    const createUser = (make, model, variant, registeration_number,range) => {
        const axios = require("axios");
        // alert("User Created successfully!!")
        onClose(false);

        setIsDisabled(!isDisabled)
        // var bodyFormData = new FormData();
        // bodyFormData.append("user", localStorage.getItem("userId"));
        // bodyFormData.append("make", make);
        // bodyFormData.append("model", model);
        // bodyFormData.append("variant", variant);
        // bodyFormData.append("state", state);
        // bodyFormData.append("roc", roc);
        // bodyFormData.append("company_status", company_status);
        // bodyFormData.append("gender", gender);
        // bodyFormData.append("date_of_birth", clas);
        // bodyFormData.append("state", state);
        // bodyFormData.append("city", city);
        // bodyFormData.append("paidup_capital", paidup_capital);
        // bodyFormData.append("activity_code", activity_code);
        // bodyFormData.append("activity_description", activity_description);
        // bodyFormData.append("registered_office_address", registered_office_address);
        // bodyFormData.append("registeration_number", registeration_number);
        // bodyFormData.append("range", range);
        // setIsBackdrop(true);
        // axios({
        //   method: "post",
        //   url: BASE_URL + "jbackend/createuser",
        //   data: bodyFormData,
        // })
        //   .then((response) => {
        //     console.log(response.data.message);
        //     setLLP_data(response.data);
        //     setIsBackdrop(false);
        //     setDialogMessage(response.data.message);
        //     setIsDialog(true);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     setIsBackdrop(false);
        //     setDialogMessage(error);
        //     setIsDialog(true);
        //   });
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
        createUser(values.make, values.model, values.variant, values.registeration_number,values.range);
    };
    const reset = (event) => {
        event.preventDefault();
        values.make = "";
        values.model = "";
        values.variant = "";
        values.registeration_number = "";
        values.range = "";
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    const pop = () => {
        if (!values.make || !values.model || !values.variant || !values.registeration_number ) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        createUser(values.make, values.model, values.variant, values.registeration_number,values.range); 
    };
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };

    return (
        <>
        {/* <Completion
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
            /> */}
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" ,display : "flex", alignItems : "center", justifyContent : "space-between"} : {theme,display : "flex", alignItems : "center", justifyContent : "space-between"}}>
                    <IconButton aria-label="delete" onClick={back} style={darkMode ? {color: "#ffffff"} : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                    Contact information
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? {color: "#ffffff"} : theme}>
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
                                    label="Make"
                                    value={values.make}
                                    name="make"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>

                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Model"
                                    value={values.model}
                                    name="model"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Variant"
                                    value={values.variant}
                                    name="variant"
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
                                    label="Registeration number"
                                    value={values.registeration_number}
                                    name="registeration_number"
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
                                    label="Range"
                                    value={values.range}
                                    name="range"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions  style={darkMode ? { backgroundColor: "#202940",justifyContent : "space-evenly", color: "#ffffff" } : {theme,justifyContent : "space-evenly"}}>
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
                        NEXT
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddContact;