import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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
// import PopAddUserVehicle from "./PopAddUserVehicleInfo";
import { useSnackbar } from "notistack";
// import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import PopAddStart from "./PopAddStart";
import PopAddStop from "./PopAddStop";
import IconButton from '@mui/material/IconButton';
function PopAddMain(props) {
    const getValues = () => {
        return {
          tag_id: "",
          location: "",
          charger_id: "",
          reason: ""
        };
      };
      
  const [values, setValues] = useState(getValues);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled2, setIsDisabled2] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;

    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");

    const { enqueueSnackbar } = useSnackbar();
    const createUser = (first_name, last_name, phone_number, email, gender, clas, state, city, paidup_capital, activity_code, activity_description, registered_office_address) => {
        const axios = require("axios");
        alert("All input are correct")
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        // createUser(values.first_name, values.last_name, values.phone_number, values.email, values.gender, values.date_of_birth, values.state, values.city, values.paidup_capital, values.activity_code, values.activity_description, values.registered_office_address);
    };
    const start = (event) => {
        event.preventDefault();
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled)
        // values.first_name = "";
        // values.last_name = "";
        // values.phone_number = "";
        // values.email = "";
        // values.gender = "";
        // values.date_of_birth = "";
        // values.state = "";
        // values.city = "";
        // setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    const stop = (event) => {
        event.preventDefault();
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled2(!isDisabled2)
        // setIsDialog(true);
    };
    
    return (
        <>
            <PopAddStart
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
                onStateChange={props.onStateChange}
            />
            <PopAddStop
                isDialog={isDisabled2}
                onClose={setIsDisabled2}
                value={values}
                onStateChange={props.onStateChange}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth  maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                Start / Stop transaction
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? { color: "#ffffff" } : theme}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} px={3}>
                        <MDBox p={2} component="form" role="form" style={{display : "flex",height : "30vh",flexDirection : "column",justifyContent:"space-around"}}>
                            <MDButton variant="gradient" color="info"  onClick={start}>
                            Start transaction
                            </MDButton>
                            <MDButton variant="gradient" color="info"  
                                // onClick={handleSubmit}
                                onClick={stop}
                            >
                                Stop transaction
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    {/* <Button onClick={handleSubmit} autoFocus>
                        Upload File
                    </Button> */}

                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddMain;