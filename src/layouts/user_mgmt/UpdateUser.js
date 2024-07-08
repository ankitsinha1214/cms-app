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
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from "notistack";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function UpdateUser() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const [stateData, setStateData] = useState({});
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const row_data = location.state || {}; // Get the state data passed via navigate
  useEffect(() => {
    getState();
  }, []);
  const getInitialValues = () => ({
    first_name: row_data.firstName || "",
    last_name: row_data.lastName || "",
    phone_number: row_data.phoneNumber || "",
    email: row_data.email || "",
    gender: row_data.gender || "",
    date_of_birth: formatDate(row_data.dob) || "",
    state: row_data.state || "",
    city: row_data.city || "",
  });
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
  
  const [values, setValues] = useState(getInitialValues);
  const [dialogMessage, setDialogMessage] = useState("");
  
  useEffect(() => {
    setValues(getInitialValues);
  }, [row_data]);
  console.log(values);
  const getState = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "location/structured/all",
    })
    .then((response) => {
      if (response.data.success === true) {
        const data = response.data.data[0].India;
        const structuredData = {};
        // console.log(data);
        data.forEach(stateObj => {
          const state = Object.keys(stateObj)[0];
          const cities = stateObj[state];
          structuredData[state] = cities;
          });

          setStateData(structuredData);
          setStates(Object.keys(structuredData));
          setCities(structuredData[row_data.state]);
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
  const createUser = (first_name, last_name, phone_number, email, gender, dob, state, city) => {
    const payload = {
      "firstName": first_name,
      "lastName": last_name,
      "state": values.state,
      "city": values.city,
    };
    axios({
      method: "patch",
      url: process.env.REACT_APP_BASEURL + "users/" + phone_number,
      data: payload, // JSON payload
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
      },
    })
      .then((response) => {
        if (response.data.success === true) {
          // console.log(response.data);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          navigate("/User-Management");
          // window.location.reload();
          // setState_show(response.data.data);
        } else {
          console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.data.message, { variant: 'error' });
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
    if (values.first_name === '' || values.last_name === '' || values.city === '' || values.state === '') {
      return enqueueSnackbar('All fields are necessary', { variant: 'error' });
    }
    createUser(
      values.first_name,
      values.last_name,
      values.phone_number,
      values.email,
      values.gender,
      values.date_of_birth,
      values.state,
      values.city
    );
  };

  const reset = (event) => {
    event.preventDefault();
    setValues(getInitialValues());
  };

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
                  Personal information
                </MDTypography>
              </MDBox>

              <MDBox p={4} component="form" role="form">
                <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="First Name"
                    value={values.first_name}
                    name="first_name"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox>

                <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="Last Name"
                    value={values.last_name}
                    name="last_name"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
                  <MDInput
                    disabled
                    type="text"
                    label="Phone Number"
                    value={values.phone_number}
                    name="phone_number"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
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
                </MDBox>
                <MDBox p={1}>
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
                </MDBox>
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
                <MDBox p={1}>
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
                </MDBox>
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

export default UpdateUser;
