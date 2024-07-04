import Grid from "@mui/material/Grid";
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

function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const row_data = location.state || {}; // Get the state data passed via navigate
  console.log(row_data);
  const getInitialValues = () => ({
    first_name: row_data.firstName || "",
    last_name: row_data.lastName || "",
    phone_number: row_data.phoneNumber || "",
    email: row_data.email || "",
    gender: row_data.gender || "",
    date_of_birth: row_data.dob || "",
    state: row_data.state || "",
    city: row_data.city || "",
  });

  const [values, setValues] = useState(getInitialValues);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    setValues(getInitialValues);
  }, [row_data]);

  const createUser = (first_name, last_name, phone_number, email, gender, clas, state, city) => {
    const axios = require("axios");
    alert("All input are correct");
    // Implement your axios request here
  };

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
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
                    type="text"
                    label="Gender"
                    value={values.gender}
                    name="gender"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox>
                {/* <MDBox p={1}>
                  <MDInput
                    type="date"
                    label="Date Of Birth"
                    value={values.date_of_birth}
                    name="date_of_birth"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox> */}
                <MDBox p={1}>
                  <FormControl fullWidth variant="outlined" margin="dense">
                    <InputLabel
                      shrink={values.date_of_birth ? true : undefined}
                      htmlFor="date-of-birth"
                    >
                      Date Of Birth
                    </InputLabel>
                    <OutlinedInput
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
                <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="State"
                    value={values.state}
                    name="state"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
                  <MDInput
                    type="text"
                    label="City"
                    value={values.city}
                    name="city"
                    margin="dense"
                    fullWidth
                    onChange={handleChange}
                  />
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
