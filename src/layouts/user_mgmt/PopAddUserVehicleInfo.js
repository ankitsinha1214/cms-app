import axios from "axios";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from '@mui/material/Select';
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
function PopAddUserVehicle(props) {
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = useState([]);
    const [makeShow, setMakeShow] = useState([]);
    const [typeShow, setTypeShow] = useState([]);
    const [modelShow, setModelShow] = useState([]);
    const [variantShow, setVariantShow] = useState([]);
    const navigate = useNavigate();
    const [vehicleId, setVehicleId] = useState("");

    const createUser = (type, make, model, variant, registeration_number, range, vehicle_img) => {
        onClose(false);
        const uservehicle = {
            "type": type,
            "make": make,
            "model": model,
            "variant": variant,
            "vehicle_reg": registeration_number,
            "range": range,
            "vehicle_img": vehicle_img
        }
        const arruservehicle = [];
        arruservehicle.push(uservehicle);
        values.first_name = props.value.first_name;
        values.last_name = props.value.last_name;
        values.phone_number = props.value.phone_number;
        values.email = props.value.email;
        values.gender = props.value.gender;
        values.date_of_birth = props.value.date_of_birth;
        values.state = props.value.state;
        values.city = props.value.city;
        console.log(values);
        const payload = {
            "ocpp_tag_pk": "1",
            "firstName": values.first_name,
            "lastName": values.last_name,
            "state": values.state,
            "city": values.city,
            "dob": parseDate(values.date_of_birth),
            "gender": values.gender,
            "phoneNumber": values.phone_number,
            "email": values.email,
            "user_vehicle": arruservehicle,
            // "vehicle_reg": registeration_number,
            // "user_range": range,
            // "vehicle_id": vehicleId.toString(),
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "users",
            data: payload, // JSON payload
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
            },
        })
            .then((response) => {
                console.log(response);

                if (response.data.success === true) {
                    console.log(response);
                    // setIsBackdrop(false);
                    // setDialogMessage(response.data.message);
                    // setIsDialog(true);
                    //   alert(response.data.message);
                    setIsDisabled(!isDisabled)
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
                // alert("Error Occured! " + error);
                // window.location.reload();
            });
    };
    console.log(props.value);
    const parseDate = (dateString) => {
        if (!dateString) return "";

        // Split the date string into parts
        const [year, month, day] = dateString.split("-");

        // Pad single-digit day and month with leading zeros
        const paddedDay = day.padStart(2, "0");
        const paddedMonth = month.padStart(2, "0");

        // Return the formatted date string
        return `${paddedDay}/${paddedMonth}/${year}`;
    };
    const [values, setValues] = useState(props.value);
    console.log(values);
    const getMake = () => {
        axios({
            method: "get",
            url: process.env.REACT_APP_BASEURL + "vehicle/all",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    // setMake_show(response.data);
                    const data = response.data.data[0];
                    setData(response.data.data[0]);
                    const makes = Object.keys(data);
                    setTypeShow(makes);
                    setMakeShow([]);
                    // setMakeShow(makes);
                    setModelShow([]);
                    setVariantShow([]);
                } else {
                    console.log("status is false ");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        // values.type = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            type: selectedType,
            make: "",
            model: "",
            variant: "",
        }));
        const makes = Object.keys(data[selectedType]);
        setMakeShow(makes);
        setModelShow([]);
        setVariantShow([]);
    };

    const handleMakeChange = (event) => {
        const selectedMake = event.target.value;
        values.make = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            make: selectedMake,
            model: "",
            variant: "",
        }));
        const models = Object.keys(data[values.type][selectedMake]);
        setModelShow(models);
        setVariantShow([]);
    };

    const handleModelChange = (event) => {
        const selectedModel = event.target.value;
        values.model = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            model: selectedModel,
            variant: "",
        }));
        const variants = data[values.type][values.make][selectedModel];
        setVariantShow(variants);
    };

    const handleVariantChange = (event) => {
        const selectedVariant = event.target.value;
        values.variant = event.target.value;
        const selectedVariantData = variantShow.find(
            (variant) => variant.variant === selectedVariant
        );
        console.log(selectedVariantData)
        setValues((prevValues) => ({
            ...prevValues,
            variant: selectedVariant,
            vehicle_img: selectedVariantData.image
        }));
        setVehicleId(selectedVariantData.vehicle_id);
    };

    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };
    const reset = (event) => {
        event.preventDefault();
        values.type = "";
        values.make = "";
        values.model = "";
        values.variant = "";
        values.registeration_number = "";
        values.range = "";
        setMakeShow([]);
        setModelShow([]);
        setVariantShow([]);
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    const pop = () => {
        if (!values.type || !values.make || !values.model || !values.variant || values.type === '' || values.make === '' || values.model === '' || values.variant === '') return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        createUser(values.type, values.make, values.model, values.variant, values.registeration_number, values.range, values.vehicle_img);
    };
    console.log(values);
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };
    useEffect(() => {
        getMake();
    }, []);
    // useEffect(() => {
    //     getModel();
    //     values.variant="";
    // }, [values.make]);
    // useEffect(() => {
    //     getVariant();
    // }, [values.model]);
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
                    Vehicle information
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
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Vehicle Type</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Type"
                                        value={values.type}
                                        name="type"
                                        onChange={handleTypeChange}
                                        input={<OutlinedInput label="Type" />}
                                    >
                                        {typeShow.map((name, index) => (
                                            <MenuItem
                                                key={index}
                                                value={name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Make</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Make"
                                        value={values.make}
                                        name="make"
                                        onChange={handleMakeChange}
                                        input={<OutlinedInput label="Make" />}
                                    >
                                        {makeShow.map((name, index) => (
                                            <MenuItem
                                                key={index}
                                                value={name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Model</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Model"
                                        value={values.model}
                                        name="model"
                                        onChange={handleModelChange}
                                        input={<OutlinedInput label="Model" />}
                                    >
                                        {modelShow.map((name, index) => (
                                            <MenuItem
                                                key={index}
                                                value={name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Variant</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Variant"
                                        value={values.variant}
                                        name="variant"
                                        onChange={handleVariantChange}
                                        // onChange={(event) => {
                                        //     const selected_variant = variant_show.find(item => item.variant === event.target.value);
                                        //     handleChange(event); // Call the original handleChange function
                                        //     setVehicle_id(selected_variant.vehicle_id);
                                        // }}
                                        input={<OutlinedInput label="Variant" />}
                                    >
                                        {variantShow.map((name, index) => (
                                            <MenuItem
                                                key={index}
                                                value={name.variant}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {name.variant}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Registeration number (Optional)"
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
                                    type="number"
                                    label="Range (Optional)"
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
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    {/* <Button onClick={handleSubmit} autoFocus>
                        Upload File
                    </Button> */}
                    <MDButton variant="gradient" color="info" onClick={reset}>
                        Reset
                    </MDButton>
                    <MDButton variant="gradient" color="info"
                        onClick={pop}
                    >
                        NEXT
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddUserVehicle;