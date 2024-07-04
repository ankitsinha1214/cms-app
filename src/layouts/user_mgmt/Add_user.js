import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import MDBackdrop from "components/Custom/MDBackdrop";
// import MDDialog from "components/Custom/MDDialog";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";

function Add_user() {
  //   const [isBackdrop, setIsBackdrop] = useState(false);
  //   const [isDialog, setIsDialog] = useState(false);
  const navigate = useNavigate();
  const [dialogMessage, setDialogMessage] = useState("");

  const getValues = () => {
    return {
      first_name: "",
      last_name: "",
      phone_number: "",
      email: "",
      gender: "",
      date_of_birth: "",
      state: "",
      city: "",
      paidup_capital: "",
      activity_code: "",
      activity_description: "",
      registered_office_address: "",
      roc: "",
      company_status: ""
    };
  };

  const createUser = (first_name, last_name, phone_number, email, gender, clas, state, city, paidup_capital, activity_code, activity_description, registered_office_address) => {
    const axios = require("axios");
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

  const [values, setValues] = useState(getValues);

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
  const reset =(event)=>{
    event.preventDefault();
    values.first_name="";
    values.last_name="";
    values.phone_number="";
    values.email="";
    values.gender="";
    values.date_of_birth="";
    values.state="";
    values.city="";
    values.first_name="";
  }
  const dialogSubmit = () => {
    navigate("/uploadedIndianCompanies");
  };

  return (
    <DashboardLayout>
      {/* <MDBackdrop isBackdrop={isBackdrop} /> */}
      {/* <MDDialog
        isDialog={isDialog}
        dialogText={dialogMessage}
        action={dialogSubmit}
        buttonText="Go to Uploaded Indian Companies"
      /> */}
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
                  <MDInput
                    type="text"
                    label="Gender"
                    value={values.gender}
                    name="gender"
                    // multiline
                    // rows={5}
                    margin="dense"
                    fullWidth={true}
                    onChange={handleChange}
                  />
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
                </MDBox>
                <MDBox p={1}>
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
                </MDBox>
                {/* <MDBox p={1}>
                  <MDInput
                  type="Number"
                    label="Paidup Capital"
                    value={values.paidup_capital}
                    name="paidup_capital"
                    // multiline
                    // rows={5}
                    margin="dense"
                    fullWidth={true}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
                  <MDInput
                  type="Number"
                    label="Activity Code"
                    value={values.activity_code}
                    name="activity_code"
                    // multiline
                    // rows={5}
                    margin="dense"
                    fullWidth={true}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
                  <MDInput
                    label="Activity Description"
                    value={values.activity_description}
                    name="activity_description"
                    multiline
                    rows={5}
                    // margin="dense"
                    fullWidth={true}
                    onChange={handleChange}
                  />
                </MDBox>
                <MDBox p={1}>
                  <MDInput
                    label="Registered Office Address"
                    value={values.registered_office_address}
                    name="registered_office_address"
                    // multiline
                    // rows={5}
                    margin="dense"
                    fullWidth={true}
                    onChange={handleChange}
                  />
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

export default Add_user;