import axios from "axios";
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
import PopAddUserVehicle from "./PopAddUserVehicleInfo";
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
function PopAddUser(props) {
    // const data = useSelector((s) => s);
    // console.log(data);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    // const [state_show, setState_show] = useState([]);
    // const [city_show, setCity_show] = useState([]);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [stateData, setStateData] = useState({});
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);
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
    const createUser = (first_name, last_name, phone_number, email, gender, clas, state, city, paidup_capital, activity_code, activity_description, registered_office_address) => {
        alert("All input are correct")
        // var bodyFormData = new FormData();
        // bodyFormData.append("user", localStorage.getItem("userId"));
        // bodyFormData.append("first_name", first_name);
        // bodyFormData.append("last_name", last_name);
        // bodyFormData.append("phone_number", phone_number);
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
        // bodyFormData.append("email", email);
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
        createUser(values.first_name, values.last_name, values.phone_number, values.email, values.gender, values.date_of_birth, values.state, values.city, values.paidup_capital, values.activity_code, values.activity_description, values.registered_office_address);
    };
    const reset = (event) => {
        event.preventDefault();
        // values.first_name = "";
        // values.last_name = "";
        // values.phone_number = "";
        // values.email = "";
        // values.gender = "";
        // values.date_of_birth = "";
        // values.state = "";
        // values.city = "";
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    const getState = () => {
        axios({
            method: "get",
            url: process.env.REACT_APP_BASEURL + "location/structured/all",
        })
            .then((response) => {
                if (response.data.success === true) {
                    const data = response.data.data[0].India;
                    const structuredData = {};
            
                    data.forEach(stateObj => {
                      const state = Object.keys(stateObj)[0];
                      const cities = stateObj[state];
                      structuredData[state] = cities;
                    });
            
                    setStateData(structuredData);
                    setStates(Object.keys(structuredData));

                    // setState_show(response.data.data);
                } else {
                    console.log("status is false ");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        values.state = selectedState;
        setSelectedState(selectedState);
        setCities(stateData[selectedState]);
        values.city = '';
      };
    const pop = () => {
        console.log(values);
        if (!values.first_name || !values.last_name || !values.phone_number || !values.email || !values.gender || !values.date_of_birth || !values.state || !values.city) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled)
        // setIsDialog(true);
    };
    useEffect(() => {
        getState();
    }, []);
    return (
        <>
            <PopAddUserVehicle
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
                onStateChange={props.onStateChange}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Personal information
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

                        <MDBox p={2} component="form" role="form">
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="First Name"
                                    value={values.first_name}
                                    name="first_name"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>

                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Last Name"
                                    value={values.last_name}
                                    name="last_name"
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
                                    label="Phone Number"
                                    value={values.phone_number}
                                    name="phone_number"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="email"
                                    label="E-mail ID"
                                    value={values.email}
                                    name="email"
                                    // multiline
                                    // rows={5}
                                    placeholder="username@gmail.com"
                                    pattern=".+@+.+.com"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                    sx={{
                                        height: 50,
                                    }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={values.gender}
                                        label="Gender"
                                        name="gender"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                {/* <MDInput
                                    type="text"
                                    label="Gender"
                                    value={values.gender}
                                    name="gender"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                /> */}
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="date"
                                    label="Date Of Birth"
                                    value={values.date_of_birth}
                                    name="date_of_birth"
                                    // multiline
                                    // rows={5}
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
                                                value={state}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {state}
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
                                                value={city}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {city}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            {/* <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="State"
                                    value={values.state}
                                    name="state"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox> */}
                            {/* <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="City"
                                    value={values.city}
                                    name="city"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
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
                        NEXT
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddUser;