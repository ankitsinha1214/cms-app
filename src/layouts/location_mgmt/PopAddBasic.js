import MDBox from "components/MDBox";
// import { DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from "axios";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { Grid } from '@mui/material';
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
import PopAddLocation from "./PopAddLocation";
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

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel';
import LocationPicker from "./components/LocationPicker";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import { Flex, TimePicker } from 'antd';
import { TextField, InputAdornment } from "@mui/material";
import './Somecss.css';
const { RangePicker } = TimePicker;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
function PopAddBasic(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(props.isDialog);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const handlePreview = async (file) => {
        setIsBackdrop(false);
        setIsDialogOpen(false);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
                color: 'grey'
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );
    const handleUploadChange = ({ fileList: newFileList }) => setFileList(newFileList);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [isDisabled, setIsDisabled] = useState(false);
    const [fileName, setFileName] = useState("");
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [states, setStates] = useState(State.getStatesOfCountry('IN'));
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");
    const currentLocation = JSON.parse(localStorage.getItem("Currentlocation"));
    const initialLocation = { lat: currentLocation?.lat, lng: currentLocation?.lng } || {};

    const { enqueueSnackbar } = useSnackbar();

    // const createUser = (locationName, locationType, address, state, city,status, paidup_capital, activity_code, activity_description, registered_office_address) => {
    //     const axios = require("axios");
    //     alert("All input are correct");
    // };
    console.log(fileList)
    const [values, setValues] = useState(props.value);
    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };
    const handleFreePaidChange = (event) => {
        setValues((prevValues) => {
            return {
                ...prevValues,
                ["freepaid"]: {
                    ...prevValues["freepaid"],
                    ["parking"]: event,
                },
            };
        });
    };
    const handleFreePaidChangeCharging = (event) => {
        setValues((prevValues) => {
            return {
                ...prevValues,
                ["freepaid"]: {
                    ...prevValues["freepaid"],
                    ["charging"]: event,
                },
            };
        });
    };

    const [selectAfterValue, setSelectAfterValue] = useState("INR"); // Default currency
    // State for parking cost (amount)
    // const [parkingCost, setParkingCost] = useState(props.values.parkingCost);
    const [parkingCost, setParkingCost] = useState({
        // amount: row_data.parkingCost.amount || "",
        amount: "",
        currency: "INR",
    });

    // Handle changes to the currency
    const handleCurrencyChange = (event) => {
        const newCurrency = event.target.value;
        setSelectAfterValue(newCurrency);
        setParkingCost((prev) => ({
            ...prev,
            currency: newCurrency,
        }));
    };

    // Handle changes to the amount
    const handleAmountChange = (event) => {
        const newAmount = event.target.value;
        setParkingCost((prev) => ({
            ...prev,
            amount: newAmount,
        }));
    };

    const handleLocationChange = (location) => {
        setValues((prevValues) => ({
            ...prevValues,
            direction: location,
        }));
    };
    const handleRangeChange = (values1) => {
        // `values` is an array of moment objects
        // setRange(values);

        if (values1) {
            const [start, end] = values1;
            const workingHr = start.format('ha') + '-' + end.format('ha');
            console.log('Time : ', workingHr);
            setValues((prevValues) => ({
                ...prevValues,
                workingHours: workingHr,
            }));
        }
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     createUser(values.locationName, values.locationType, values.address, values.state, values.city,values.status, values.paidup_capital, values.activity_code, values.activity_description, values.registered_office_address);
    // };
    const reset = (event) => {
        event.preventDefault();
        values.locationName = "";
        values.locationType = "";
        values.address = "";
        values.state = "";
        values.city = "";
        values.status = "";
        values.freepaid = {
            "parking": true,
            "charging": true
        };
        values.parkingCost = {
            amount: "",
            currency: "INR"
        };
        setParkingCost({
            // amount: row_data.parkingCost.amount || "",
            amount: "",
            currency: "INR",
        });
        setSelectAfterValue('INR');
        setFileList([]);
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
        // Check if fileList has at least one file and if that file is an image
        const hasImages = Array.from(fileList).some(file => isValidImage(file));
        if (!hasImages) {
            // Show error notification if no images are found
            return enqueueSnackbar('Please upload at least one location image!', { variant: 'error' });
        }
        if (!values.locationName || !values.locationType || !values.address || !values.state || !values.city || !values.status) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
        if (!values.direction.latitude || !values.direction.longitude) return enqueueSnackbar('Please Enter the location correctly !!!', { variant: 'error' })
        if (!values.freepaid.parking && parkingCost.amount === '') {
            return enqueueSnackbar('Parking Amount is necessary when selected paid parking.', { variant: 'error' });
        }
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled);
        values.locationImage = fileList;
        values.parkingCost = parkingCost;
        // setIsDialog(true);
    };

    const handleStateChange = (event) => {
        const selectedState = event.target.value;
        setValues((prevValues) => ({
            ...prevValues,
            state: selectedState,
            city: '',
        }));
        const stateIsoCode = states.find(state => state.name === selectedState)?.isoCode;
        setCities(City.getCitiesOfState('IN', stateIsoCode));
    };
    useEffect(() => {
        setIsDialogOpen(props.isDialog);
    }, [props.isDialog]);
    const handlePopStateChange = (newState) => {
        setIsDisabled(newState);
    };
    const handlePreviewClose = () => {
        setPreviewImage('');
        setPreviewOpen(false);
        // props.isDialog = true;
        setIsDialogOpen(true);
    };
    return (
        <>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                        // zIndex: 1050,
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => {
                            setPreviewOpen(visible);
                            if (!visible) handlePreviewClose(); // Handle dialog reopening when preview closes
                        },
                        afterOpenChange: (visible) => {
                            if (!visible) handlePreviewClose();
                        },
                        // onVisibleChange: (visible) => setPreviewOpen(visible),
                        // afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
            <PopAddLocation
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
                onStateChange={props.onStateChange}
                onStateChange1={handlePopStateChange}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            {/* <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md" > */}
            <Dialog open={isDialogOpen} onClose={handleClose} fullWidth maxWidth="md" >
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    Basic Information
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
                                    label="Location Name"
                                    value={values.locationName}
                                    name="locationName"
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>

                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="location-type-label">Location Type</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="location-type-label"
                                        id="location-type-select"
                                        value={values.locationType}
                                        name="locationType"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Location Type" />}
                                    >
                                        <MenuItem value="Petrol Pumps">Petrol Pumps</MenuItem>
                                        <MenuItem value="Malls">Malls</MenuItem>
                                        <MenuItem value="Highways">Highways</MenuItem>
                                        <MenuItem value="Resorts">Resorts</MenuItem>
                                        <MenuItem value="Airports">Airports</MenuItem>
                                        <MenuItem value="Hotels">Hotels</MenuItem>
                                        <MenuItem value="Parking Garages">Parking Garages</MenuItem>
                                        <MenuItem value="Office Complexes">Office Complexes</MenuItem>
                                        <MenuItem value="Supermarkets">Supermarkets</MenuItem>
                                        <MenuItem value="Train Stations">Train Stations</MenuItem>
                                        <MenuItem value="Restaurants">Restaurants</MenuItem>
                                        <MenuItem value="Residential Areas">Residential Areas</MenuItem>
                                        <MenuItem value="Parks and Recreational Areas">Parks and Recreational Areas</MenuItem>
                                        <MenuItem value="University Campuses">University Campuses</MenuItem>
                                        <MenuItem value="Convention Centers">Convention Centers</MenuItem>
                                        <MenuItem value="Stadiums and Sports Arenas">Stadiums and Sports Arenas</MenuItem>
                                        <MenuItem value="Movie Theaters">Movie Theaters</MenuItem>
                                        <MenuItem value="Hospitals">Hospitals</MenuItem>
                                        <MenuItem value="Government Buildings">Government Buildings</MenuItem>
                                        <MenuItem value="Libraries">Libraries</MenuItem>
                                        <MenuItem value="Community Centers">Community Centers</MenuItem>
                                        <MenuItem value="Beach Parking Lots">Beach Parking Lots</MenuItem>
                                        <MenuItem value="Tourist Attractions">Tourist Attractions</MenuItem>
                                        <MenuItem value="Car Dealerships">Car Dealerships</MenuItem>
                                        <MenuItem value="Metro Stations">Metro Stations</MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Address"
                                    value={values.address}
                                    name="address"
                                    multiline
                                    rows={4}
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
                                                value={state.name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {state.name}
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
                                                value={city.name}
                                            //   style={getStyles(name.name, values.service, theme)}
                                            >
                                                {city.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        // name="row-radio-buttons-group"
                                        value={values.status}
                                        name="status"
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="Inactive" control={<Radio />} label="Inactive" />
                                        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                                        <FormControlLabel value="Waitlisted" control={<Radio />} label="Waitlisted" />
                                    </RadioGroup>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-multiple-name-label">Working Days</InputLabel>
                                    <Select
                                        sx={{
                                            height: 50,
                                        }}
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        placeholder="Select Working Days"
                                        value={values.workingDays}
                                        name="workingDays"
                                        onChange={handleChange}
                                        input={<OutlinedInput label="Working Days" />}
                                    >
                                        <MenuItem
                                            value={"Everyday"}
                                        //   style={getStyles(name.name, values.service, theme)}
                                        >
                                            Everyday
                                        </MenuItem>
                                        <MenuItem
                                            value={"Monday-Saturday"}
                                        //   style={getStyles(name.name, values.service, theme)}
                                        >
                                            Monday-Saturday
                                        </MenuItem>
                                        <MenuItem
                                            value={"Monday-Friday"}
                                        //   style={getStyles(name.name, values.service, theme)}
                                        >
                                            Monday-Friday
                                        </MenuItem>
                                        <MenuItem
                                            value={"Monday-Thrusday"}
                                        //   style={getStyles(name.name, values.service, theme)}
                                        >
                                            Monday-Thrusday
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </MDBox>
                            <MDBox p={1}>
                                <FormLabel>Working Hours</FormLabel>
                                <Flex gap={8}>
                                    <RangePicker use12Hours format="h a" placeholder={['Start Time', 'End Time']} changeOnScroll needConfirm={false} onChange={handleRangeChange} />
                                </Flex>
                            </MDBox>
                            <Grid container>
                                <Grid item xs={6}>
                                    <MDBox p={1}>
                                        <FormLabel>Free Parking</FormLabel><br />
                                        <Switch
                                            checked={values.freepaid.parking}
                                            // name="parking"
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            onChange={handleFreePaidChange}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={6}>
                                    <MDBox p={1}>
                                        <FormLabel>Free Charging</FormLabel><br />
                                        <Switch
                                            checked={values.freepaid.charging}
                                            // name="charging"
                                            checkedChildren={<CheckOutlined />}
                                            unCheckedChildren={<CloseOutlined />}
                                            onChange={handleFreePaidChangeCharging}
                                        />
                                    </MDBox>
                                </Grid>
                            </Grid>

                            {!values.freepaid.parking && (
                                <MDBox p={1}>
                                    <FormControl fullWidth
                                    // sx={{ mb: 2 }}
                                    >
                                        <TextField
                                            label="Parking Cost"
                                            name="parkingCost"
                                            required
                                            variant="outlined"
                                            type="number"
                                            value={parkingCost.amount}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FormControl variant="standard" size="small">
                                                            <Select
                                                                value={selectAfterValue}
                                                                // variant="outlined"
                                                                onChange={handleCurrencyChange}
                                                            >
                                                                <MenuItem value="INR">₹</MenuItem>
                                                                <MenuItem value="USD">$</MenuItem>
                                                                <MenuItem value="EUR">€</MenuItem>
                                                                <MenuItem value="GBP">£</MenuItem>
                                                                <MenuItem value="CNY">¥</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            onChange={handleAmountChange}
                                        />
                                    </FormControl>
                                </MDBox>
                            )}

                            <MDBox p={1}>
                                {
                                    initialLocation &&
                                    <LocationPicker
                                        initialLocation={initialLocation}
                                        onLocationChange={handleLocationChange}
                                    />
                                }
                            </MDBox>
                            <MDBox p={1}>
                                <FormLabel >Location Image</FormLabel>

                            </MDBox>

                            <MDBox p={1}>
                                <Upload
                                    // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleUploadChange}
                                >
                                    {fileList.length >= 6 ? null : uploadButton}
                                </Upload>

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

export default PopAddBasic;