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
            "filter": type,
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "reports/generate-report",
            data: payload, // JSON payload
            responseType: "blob", 
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
            },
        })
            .then((response) => {
                console.log(response);
                const contentDisposition = response.headers['content-disposition'];
                let fileName = 'report.xlsx'; // Default file name
        
                // Extract file name from content-disposition header if available
                if (contentDisposition) {
                    const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
                    if (fileNameMatch?.length === 2) fileName = fileNameMatch[1];
                }
        
                // Create a new Blob object using the response data
                const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const url = window.URL.createObjectURL(blob);
                window.open(url); 
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName); // Set filename for download
                document.body.appendChild(link);
                link.click();
                link.remove(); // Clean up after download
                // if (response.data.success === true) {
                // if (response.data) {
                //     console.log(response);
                //     const url = window.URL.createObjectURL(new Blob([response.data])); // Create blob URL
                //     const link = document.createElement('a');
                //     link.href = url;
                //     link.setAttribute('download', 'report.xlsx'); // Set the desired file name
                //     document.body.appendChild(link);
                //     link.click(); // Programmatically click the link to trigger the download
                //     link.remove(); // Clean up after download
                //     setIsDisabled(!isDisabled)
                // } else {
                //     enqueueSnackbar(response.data.message, { variant: 'error' })
                //     // window.location.reload();
                // }
            })
            .catch((error) => {
                console.log(error);
                // enqueueSnackbar(error.response.data.message, { variant: 'error' })
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
                                <MenuItem value={"users"}>Users</MenuItem>
                                <MenuItem value={"locations"}>Locations</MenuItem>
                                <MenuItem value={"chargers"}>Chargers</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ color: "white", cursor: "pointer" }}>
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