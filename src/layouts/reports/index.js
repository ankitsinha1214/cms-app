import axios from "axios";
import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import OutlinedInput from "@mui/material/OutlinedInput";
// import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import { useSnackbar } from "notistack";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from 'antd';
import { Typography } from 'antd';
import MDBox from 'components/MDBox';
const { RangePicker } = DatePicker;

const Reports = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [type, setType] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            type,
        });
        const isoDate = new Date(fromDate).toISOString();
        const isoDate1 = new Date(toDate).toISOString();
        const payload = {
            "fromDate": isoDate,
            "toDate": isoDate1,
            "type": type,
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "reports/generate-report",
            data: payload, // JSON payload
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
            },
        })
            .then((response) => {
                console.log(response);

                if (response.data.success === true) {
                    console.log(response);
                    setIsDisabled(!isDisabled)
                } else {
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

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                        <MDBox my={4} mx={4}>
                            <Typography.Title level={5}>Time Range</Typography.Title>
                            <RangePicker 
                            showTime={{
                                format: 'HH:mm:ss',
                            }}
                            size="large"
                            format="YYYY-MM-DD HH:mm:ss"
                            onChange={(value, dateString) => {
                                console.log('Formatted Selected Time: ', dateString);
                                setFromDate(dateString[0]);
                                setToDate(dateString[1]);
                              }}
                            />
                        </MDBox>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                sx={{
                                    height: 50,
                                }}
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                name="locationType"
                                label="Type"
                                onChange={handleTypeChange}
                                input={<OutlinedInput label="Type" />}
                            >
                                <MenuItem value={"Users"}>Users</MenuItem>
                                <MenuItem value={"Locations"}>Locations</MenuItem>
                                <MenuItem value={"Chargers"}>Chargers</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{color:"white", cursor:"pointer"}}>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            {/* </LocalizationProvider> */}
        </DashboardLayout>
    );
};

export default Reports;