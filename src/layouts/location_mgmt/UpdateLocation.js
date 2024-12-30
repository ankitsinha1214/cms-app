import Grid from "@mui/material/Grid";
import axios from "axios";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from '@mui/material/FormLabel';
import { Flex, TimePicker } from 'antd';
import OutlinedInput from "@mui/material/OutlinedInput";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from "notistack";
import { Space, Switch } from 'antd';
import { Country, State, City } from 'country-state-city';
import { Checkbox, Col, Row } from 'antd';
import services from './components/Services';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const { RangePicker } = TimePicker;
function UpdateLocation() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();
    const [states, setStates] = useState(State.getStatesOfCountry('IN'));
    const [cities, setCities] = useState([]);
    // const [stateData, setStateData] = useState({});
    // const [states, setStates] = useState([]);
    // const [selectedState, setSelectedState] = useState("");
    // const [cities, setCities] = useState([]);
    const row_data = location.state || {}; // Get the state data passed via navigate
    useEffect(() => {
        getState();
    }, []);
    const getInitialValues = () => ({
        locationName: row_data.locationName || "",
        locationType: row_data.locationType || "",
        state: row_data.state || "",
        city: row_data.city || "",
        address: row_data.address || "",
        facilities: row_data.facilities || [],
        workingDays: row_data.workingDays || "",
        workingHours: row_data.workingHours || "",
        freepaid: row_data.freepaid || {
            "parking": true,
            "charging": true
        },
        salesManager: row_data.salesManager || { name: '', phoneNumber: '', email: '' },
        dealer: row_data.dealer || { name: '', phoneNumber: '', email: '' },
    });
    const [values, setValues] = useState(getInitialValues);
    const [dialogMessage, setDialogMessage] = useState("");
    const onChange = (checkedValues) => {
        // console.log('checked = ', checkedValues);
        // setCheckedValues(values);
        setValues((prevValues) => ({
            ...prevValues,
            facilities: checkedValues,
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
    const formatDate = (dateString) => {
        if (!dateString) return "";

        // Split the date string into parts
        const [day, month, year] = dateString.split("/");
        if (!month || !year) {
            return '';
        }
        // Pad single-digit day and month with leading zeros
        const paddedDay = day.padStart(2, "0");
        const paddedMonth = month.padStart(2, "0");

        // Return the date in YYYY-MM-DD format
        return `${year}-${paddedMonth}-${paddedDay}`;
    };

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

    console.log(values.facilities);
    useEffect(() => {
        setValues(getInitialValues);
    }, [row_data]);
    console.log(values);
    const getState = () => {
        try {
            const selectedState = row_data?.state;
            setValues((prevValues) => ({
                ...prevValues,
                state: selectedState,
                city: '',
            }));
            const stateIsoCode = states.find(state => state.name === selectedState)?.isoCode;
            setCities(City.getCitiesOfState('IN', stateIsoCode));
        } catch (error) {
            console.log(error);
        }
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
    const createUser = (locationName, locationType, state, city, address, facilities, workingDays, workingHours, freepaid, salesManager, dealer) => {
        const payload = {
            "locationName": locationName,
            "locationType": locationType,
            "state": state,
            "city": city,
            "address": address,
            "facilities": facilities,
            "workingDays": workingDays,
            "workingHours": workingHours,
            "freepaid": freepaid,
            "salesManager": salesManager,
            "dealer": dealer,
        };
        const token = localStorage.getItem("token");
        axios({
            method: "put",
            url: process.env.REACT_APP_BASEURL + "charger-locations/" + row_data?._id,
            data: payload, // JSON payload
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
                "Authorization": `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    // console.log(response.data);
                    enqueueSnackbar("Location Updated Successfully!!", { variant: 'success' });
                    navigate("/location");
                    // window.location.reload();
                    // setState_show(response.data.data);
                } else {
                    console.log("status is false ");
                    enqueueSnackbar("An error occurred while updating the location.", { variant: 'error' });

                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error, { variant: 'error' });
            });
        // console.log(parseDate(dob));
    };

    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.locationName === '' || values.locationType === '' || values.state === '' || values.city === '' || values.address === '' || values.facilities === '' || values.workingDays === '' || values.workingHours === '' || values.freepaid === '') {
            return enqueueSnackbar('All fields are necessary', { variant: 'error' });
        }
        createUser(
            values.locationName,
            values.locationType,
            values.state,
            values.city,
            values.address,
            values.facilities,
            values.workingDays,
            values.workingHours,
            values.freepaid,
            values.salesManager,
            values.dealer,
        );
    };

    const reset = (event) => {
        event.preventDefault();
        setValues(getInitialValues());
    };
    console.log(cities);
    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                                <MDTypography variant="h6" color="white">
                                    Update Location Information
                                </MDTypography>
                            </MDBox>

                            <MDBox p={4} component="form" role="form">
                                <MDBox p={1}>
                                    <MDInput
                                        type="text"
                                        label="Location Name"
                                        value={values.locationName}
                                        name="locationName"
                                        margin="dense"
                                        fullWidth
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
                                <MDBox p={1}>
                                    <FormLabel >Facilities</FormLabel>
                                </MDBox>
                                <MDBox p={1}>
                                    <Checkbox.Group
                                        style={{
                                            width: '100%',
                                        }}
                                        onChange={onChange}
                                        value={values.facilities}
                                        defaultValue={values.facilities}
                                    >
                                        <Row gutter={16}>
                                            {services.map((service, index) => (
                                                <Col key={index} xs={24} sm={12} md={8}>
                                                    <Checkbox 
                                                    value={service}
                                                    checked={true}
                                                    // checked={values.facilities.some(facility => facility.name === service.name)}
                                                    >{service.name}</Checkbox>
                                                </Col>
                                            ))}
                                        </Row>
                                    </Checkbox.Group>
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
                                {/* <MDBox p={1}>
                                    <MDInput
                                        disabled
                                        type="email"
                                        label="E-mail ID"
                                        value={values.email}
                                        name="email"
                                        placeholder="username@gmail.com"
                                        pattern=".+@+.+.com"
                                        margin="dense"
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </MDBox>
                                <MDBox p={1}>
                                    <MDInput
                                        disabled
                                        type="text"
                                        label="Gender"
                                        value={values.gender}
                                        name="gender"
                                        margin="dense"
                                        fullWidth
                                        onChange={handleChange}
                                    />
                                </MDBox> */}
                                {/* <MDBox p={1}>
                                    <FormControl fullWidth variant="outlined" margin="dense">
                                        <InputLabel
                                            shrink={true}
                                            htmlFor="date-of-birth"
                                        >
                                            Date Of Birth
                                        </InputLabel>
                                        <OutlinedInput
                                            disabled
                                            id="date-of-birth"
                                            type="date"
                                            label="Date Of Birth"
                                            value={values.date_of_birth}
                                            name="date_of_birth"
                                            onChange={handleChange}
                                            notched={true}
                                        />
                                    </FormControl>
                                </MDBox> */}
                                {/* <MDBox p={1}>
                  <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel shrink={Boolean(values.date_of_birth)} htmlFor="date-of-birth">
                      Date Of Birth
                    </InputLabel>
                    <OutlinedInput
                      id="date-of-birth"
                      type="date"
                      value={parseDate(values.date_of_birth)}
                      name="date_of_birth"
                      onChange={handleChange}
                    />
                  </FormControl>
                </MDBox> */}
                                {/* <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="State"
                    value={values.state}
                    name="state"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox> */}
                                {/* <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="City"
                    value={values.city}
                    name="city"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox> */}
                                {/* <MDBox p={1}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-multiple-name-label">State</InputLabel>
                                        <Select
                                            sx={{
                                                height: 50,
                                            }}
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            placeholder="State"
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
                                            placeholder="City"
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
                                </MDBox> */}
                                <Grid container direction="row" justifyContent="space-around" p={2}>
                                    <MDButton variant="gradient" color="info" onClick={reset}>
                                        Reset
                                    </MDButton>
                                    <MDButton variant="gradient" color="info" onClick={handleSubmit}>
                                        Submit
                                    </MDButton>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default UpdateLocation;
