import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import DataCard from "components/custom/DataCard";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

import Divider from "@mui/material/Divider";
import complete from "assets/images/ok-g1e439af7f_640.png";
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
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";

function ViewUser(props) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { onClose } = props;
    console.log(props)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");


    const handleClose = () => {
        onClose(false);
        window.location.reload();
    };
    const pop = () => {
        setIsBackdrop(false);
    };

    return (
        <>
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    {/* <IconButton aria-label="delete" onClick={back}>
                        <ArrowBackIcon />
                    </IconButton> */}
                    User information
                    <IconButton aria-label="delete" style={darkMode ? { color: "#ffffff" } : theme} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} style={{ display: "flex", justifyContent: "center",flexDirection : "column" }}>
                        <MDBox pt={6} pb={3}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Card>
                                        <MDBox
                                            mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="info"
                                            borderRadius="lg"
                                            coloredShadow="info"
                                        >
                                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                <MDTypography variant="h6" color="white">
                                                    Personal information
                                                </MDTypography>
                                            </Grid>
                                        </MDBox>

                                        <Grid container direction="row" p={2}>
                                            {(<DataCard title="First Name" value={props.value.first_name} count={3} />)}
                                            {(<DataCard title="Last Name" value={props.value.last_name} count={3} />)}
                                            {(<DataCard title="Phone Number" value={props.value.phone_number} count={3} />)}
                                            <Divider />
                                            {(<DataCard title="Email ID" value={props.value.email} count={3} />)}
                                            {(<DataCard title="Gender" value={props.value.gender} count={3} />)}
                                            {(<DataCard title="Date Of Birth" value={props.value.date_of_birth} count={3} />)}
                                            {(<DataCard title="State" value={props.value.state} count={3} />)}
                                            {(<DataCard title="City" value={props.value.city} count={3} />)}

                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </MDBox>
                    {/* </MDBox>
                    <MDBox pt={0} pb={0} style={{ display: "flex", justifyContent: "center", height: "50vh" }}> */}
                        <MDBox pt={6} pb={3}>
                            <Grid container spacing={6}>
                                <Grid item xs={12}>
                                    <Card>
                                        <MDBox
                                            mx={2}
                                            mt={-3}
                                            py={3}
                                            px={2}
                                            variant="gradient"
                                            bgColor="info"
                                            borderRadius="lg"
                                            coloredShadow="info"
                                        >
                                            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                                <MDTypography variant="h6" color="white">
                                                    Vehicle information
                                                </MDTypography>
                                            </Grid>
                                        </MDBox>

                                        <Grid container direction="row" p={2}>
                                            {(<DataCard title="Type" value={props.value.type} count={3} />)}
                                            {(<DataCard title="Make" value={props.value.make} count={3} />)}
                                            {(<DataCard title="Model" value={props.value.model} count={3} />)}
                                            {(<DataCard title="Variant" value={props.value.variant} count={3} />)}
                                            <Divider />
                                            {(<DataCard title="Registeration Number" value={props.value.registeration_number} count={3} />)}
                                            {(<DataCard title="Range" value={props.value.range} count={3} />)}
                                            {/* {(<DataCard title="Variant Image" value='' count={3} />)} */}
                                            <div style={{marginLeft: "16px"}}>
                                            <h5>Vehicle Image</h5>
                                            <img src={props.value.vehicle_img} alt="Variant Image" width={150} height={150} srcset="" />
                                            </div>

                                        </Grid>
                                    </Card>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                {/* <DialogActions style={darkMode ? { backgroundColor: "#202940",justifyContent : "space-evenly", color: "#ffffff" } : {theme,justifyContent : "space-evenly"}}>
                    <MDButton variant="gradient" color="info"
                        // onClick={handleSubmit}
                        onClick={pop}
                    >
                        VIEW
                    </MDButton>
                </DialogActions> */}
            </Dialog>
        </>
    );
}

export default ViewUser;