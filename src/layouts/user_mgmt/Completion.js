import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import tick from "assets/images/tick.gif"
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
import ViewUser from "./ViewUser";

function Completion(props) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { onClose } = props;

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");


    const handleClose = () => {
        onClose(false);
        window.location.reload();
    };
    const pop = () => {
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled);
    };

    return (
        <>
        <ViewUser
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={props.value}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" ,display : "flex", alignItems : "center", justifyContent : "space-between"} : {theme,display : "flex", alignItems : "center", justifyContent : "space-between"}}>
                
                    {/* <IconButton aria-label="delete" onClick={back}>
                        <ArrowBackIcon />
                    </IconButton> */}
                    User Created successfully!!
                    <IconButton aria-label="delete" style={darkMode ? {color: "#ffffff"} : theme} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} style={{display : "flex" , justifyContent : "center", height : "50vh"}}>
                        <img src={tick} alt="User Created successfully!!" />
                        {/* {tick} */}
                        </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940",justifyContent : "space-evenly", color: "#ffffff" } : {theme,justifyContent : "space-evenly"}}>
                    <MDButton variant="gradient" color="info"
                        // onClick={handleSubmit}
                        onClick={pop}
                    >
                        VIEW
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default Completion;