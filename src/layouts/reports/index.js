import React, { useState } from 'react';
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;

const Reports = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [type, setType] = useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, like sending data to an API or logging it
        console.log({
            fromDate: dayjs(fromDate).format('YYYY-MM-DD'),
            toDate: dayjs(toDate).format('YYYY-MM-DD'),
            type,
        });
    };

    return (
    <DashboardLayout>
    <DashboardNavbar />
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {/* From Date */}
                    <RangePicker />
                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label={type ? 'Type' : 'Select Type'}
                            value={type || ''}
                            onChange={handleTypeChange}
                            fullWidth
                        >
                            <MenuItem value="type1">Type 1</MenuItem>
                            <MenuItem value="type2">Type 2</MenuItem>
                            <MenuItem value="type3">Type 3</MenuItem>
                        </TextField>
                    </Grid>

                    {/* Submit Button */}
                    <Grid item xs={12} sm={6}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
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