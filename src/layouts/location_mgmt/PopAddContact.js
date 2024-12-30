import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import axios from "axios";
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

    // const createUser = (make, model, variant, registeration_number,range) => {
    const createUser = (salesManager, dealer) => {
        // alert("User Created successfully!!")
        onClose(false);
        const updatedChargersData = (props.value.chargerInfo).map(charger => ({
            ...charger,
            powerOutput: `${charger.powerOutput} w`, // Add 'w' to powerOutput for each charger
            energyConsumptions: `${charger.energyConsumptions} kWh`, // Adding 'w' to powerOutput
        }));
        // console.log(updatedChargersData);
        // return;

        // setIsDisabled(!isDisabled)
        const bodyFormData = new FormData();
        // bodyFormData.append("user", localStorage.getItem("userId"));
        // bodyFormData.append("locationImage", props.value.locationImage);
        (props.value?.locationImage || []).forEach((file, index) => {
            console.log(file)
            bodyFormData.append('locationImage', file?.originFileObj);
        });
        bodyFormData.append("locationName", props.value.locationName);
        bodyFormData.append("locationType", props.value.locationType);
        bodyFormData.append("state", props.value.state);
        bodyFormData.append("city", props.value.city);
        bodyFormData.append("address", props.value.address);
        bodyFormData.append("status", props.value.status);
        bodyFormData.append("workingDays", props.value.workingDays);
        bodyFormData.append("workingHours", props.value.workingHours);
        // bodyFormData.append("direction", props.value.direction);
        // bodyFormData.append("freepaid", props.value.freepaid);
        // bodyFormData.append("salesManager", props.value.salesManager);
        // bodyFormData.append("dealer", props.value.dealer);
        // bodyFormData.append("facilities", props.value.facilities);
        // bodyFormData.append("chargerInfo", props.value.chargerInfo);
        bodyFormData.append("direction", JSON.stringify(props.value.direction));
        bodyFormData.append("freepaid", JSON.stringify(props.value.freepaid));
        bodyFormData.append("salesManager", JSON.stringify(salesManager));
        bodyFormData.append("dealer", JSON.stringify(dealer));
        bodyFormData.append("facilities", JSON.stringify(props.value.facilities));
        bodyFormData.append("chargerInfo", JSON.stringify(updatedChargersData));
        // bodyFormData.append("chargerInfo", JSON.stringify(props.value.chargerInfo));
        // setIsBackdrop(true);
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "charger-locations",
            data: bodyFormData,
            headers: {
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((response) => {
                console.log(response.data.message);
                if (response.data.success === true) {
                    console.log(response);
                    // setIsBackdrop(false);
                    // setDialogMessage(response.data.message);
                    // setIsDialog(true);
                    //   alert(response.data.message);
                    setIsDisabled(!isDisabled);
                } else {
                    // console.log("status is false ");
                    // alert("Status is false");
                    enqueueSnackbar(response.data.message, { variant: 'error' })
                    // window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error.response.data.message, { variant: 'error' })
                // setIsDisabled(!isDisabled);
                // setIsBackdrop(false);
                // setDialogMessage(error);
                // setIsDialog(true);
            });
    };

    const [values, setValues] = useState(props.value);
    console.log(values);
    console.log(props.value);
    useEffect(() => {
        setValues(props.value);
    }, [props.value]);
    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSalesManagerChange = (event) => {
        const { name, value } = event.target;
        // Handle nested object updates
        setValues((prevValues) => ({
            ...prevValues,
            salesManager: {
                ...prevValues.salesManager,
                [name.split('.')[1]]: value
            }
        }));
    };

    const handleDealerChange = (event) => {
        const { name, value } = event.target;
        // Handle nested object updates
        setValues((prevValues) => ({
            ...prevValues,
            dealer: {
                ...prevValues.dealer,
                [name.split('.')[1]]: value
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser(values.make, values.model, values.variant, values.registeration_number, values.range);
    };
    const reset = (event) => {
        event.preventDefault();
        values.salesManager = { name: '', phoneNumber: '', email: '' };
        values.dealer = { name: '', phoneNumber: '', email: '' };
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    const pop = () => {
        if (!values.salesManager.name || !values.salesManager.phoneNumber || !values.salesManager.email || !values.dealer.name || !values.dealer.phoneNumber || !values.dealer.email) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        // setIsBackdrop(false);
        createUser(values.salesManager, values.dealer);
    };
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };

    return (
        <>
            <Completion
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton aria-label="delete" onClick={back} style={darkMode ? { color: "#ffffff" } : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                    Contact information
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
                                    label="Sales Manager Name"
                                    value={values.salesManager.name}
                                    name="salesManager.name"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleSalesManagerChange}
                                />
                            </MDBox>

                            <MDBox p={1}>
                                <MDInput
                                    type="email"
                                    label="Sales Manager Email"
                                    value={values.salesManager.email}
                                    name="salesManager.email"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    pattern=".+@+.+.com"
                                    fullWidth={true}
                                    onChange={handleSalesManagerChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Sales Manager Phone"
                                    value={values.salesManager.phoneNumber}
                                    name="salesManager.phoneNumber"
                                    // multiline
                                    // rows={5}
                                    inputProps={{
                                        pattern: "\\+[1-9]{1}[0-9]{1,2}[0-9]{10}"
                                    }}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleSalesManagerChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Dealer Name"
                                    value={values.dealer.name}
                                    name="dealer.name"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleDealerChange}
                                />
                            </MDBox>

                            <MDBox p={1}>
                                <MDInput
                                    type="email"
                                    label="Dealer Email"
                                    value={values.dealer.email}
                                    name="dealer.email"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    pattern=".+@+.+.com"
                                    fullWidth={true}
                                    onChange={handleDealerChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Dealer Phone"
                                    value={values.dealer.phoneNumber}
                                    name="dealer.phoneNumber"
                                    // multiline
                                    // rows={5}
                                    inputProps={{
                                        pattern: "\\+[1-9]{1}[0-9]{1,2}[0-9]{10}"
                                    }}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleDealerChange}
                                />
                            </MDBox>
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
                        NEXT
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddContact;