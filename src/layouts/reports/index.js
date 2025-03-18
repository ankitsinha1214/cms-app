import axios from "axios";
import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import OutlinedInput from "@mui/material/OutlinedInput";
// import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import Loader from "components/custom/Loader";
import { useSnackbar } from "notistack";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from 'antd';
import { Avatar, Segmented } from 'antd';
import { Typography } from 'antd';
import { Card } from "@mui/material";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from 'components/MDBox';
import CustomMaterialTable from "../../components/custom/CustomMaterialTable";
const { RangePicker } = DatePicker;

const Reports = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('Sessions');
    const { enqueueSnackbar } = useSnackbar();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleTypeChange = (event) => {
        setType(event.target.value);
    };
    const sessionColumn = [
        // {
        //   header: "Status",
        //   accessorKey: "status",
        //   filterVariant: 'select',
        //   filterSelectOptions: statusList1,
        //   align: "center",
        //   fixed: "true", muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   },
        //   Cell: (row) => (
        //     <div>
        //       {(row.row.original.status === "Unpaid") ?
        //         <CircleIcon style={{ color: "#DA1E28" }} />
        //         // :
        //         // (row.row.original.status === "Inactive") ?
        //         //   <CircleIcon style={{ color: "#7B7B7B" }} />
        //         // :
        //         // (row.row.original.status === "Available") ?
        //         :
        //         (row.row.original.status === "Active") ?
        //           <CircleIcon style={{ color: "#1A73E8" }} />
        //           // <CircleIcon style={{ color: "#800080" }} />
        //           :
        //           // (row.row.original.status === "SuspendedEVSE") ?
        //           //   <CircleIcon style={{ color: "orange" }} />
        //           //   :
        //           (row.row.original.status === "Paid") ?
        //             <CircleIcon style={{ color: "#198038" }} />
        //             // :
        //             // (row.row.original.status === "Preparing") ?
        //             //   <CircleIcon style={{ color: "#F1C21B" }} />
        //             :
        //             <CircleIcon style={{ color: "yellow" }} />
        //       }
        //     </div>
        //   ),
        // },
        {
            header: "Session ID", accessorKey: "_id", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Charger ID", accessorKey: "chargerId", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Location", accessorKey: "chargerLocation.locationName", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "User Phone", accessorKey: "userPhone", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Started By", accessorKey: "startCreatedBy", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Energy disp", accessorKey: "energy_disp1", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        {
            header: "Stopped By", accessorKey: "stopCreatedBy", align: "center", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
        },
        // {
        //   header: "Start Date & Time", accessorKey: "createdAt", align: "center",  
        //   muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   },
        //   Cell: ({ cell }) => {
        //     return convertUTCtoIST(cell.getValue());
        //   },
        // },
        // {
        //   header: "Duration", accessorKey: "duration", align: "center", muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   },
        // }, 
        // {
        //   header: "City", accessorKey: "chargerLocation.city", align: "center", muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   },
        // },
        // {
        //   header: "State", accessorKey: "chargerLocation.state", align: "center", muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   },
        // },

    ];
    useEffect(() => {
        setColumns(sessionColumn);
    }, []);

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
                        {/* <MDBox my={4} mx={4}>
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
                        </MDBox> */}
                        <Segmented
                        // vertical={isMobile ? true : false}
                        vertical
                        style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",  // This makes the whole segmented control vertical
                            width: isMobile ? "100%" : "auto"
                        }}
                            options={[
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                            gap={4}
                                            // size={24}
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/session11.svg`}
                                                //  width={100}
                                                //  src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" 
                                                // src={usergroup}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                            >Session</div>
                                        </div>
                                    ),
                                    value: 'Session',
                                },
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                            gap={4}
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/energy11.svg`}
                                                style={{
                                                    // backgroundColor: '#87d068',
                                                }}
                                                // src={usernotification}
                                            // icon={<UserOutlined />}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                            >Energy</div>
                                        </div>
                                    ),
                                    value: 'Energy',
                                },
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                            gap={4}
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/user11.svg`}
                                                style={{
                                                    // backgroundColor: '#87d068',
                                                }}
                                                // src={usernotification}
                                            // icon={<UserOutlined />}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}

                                            >User</div>
                                        </div>
                                    ),
                                    value: 'User',
                                },
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/revenue11.svg`}
                                                style={{
                                                    // backgroundColor: '#87d068',
                                                }}
                                                // src={usernotification}
                                            // icon={<UserOutlined />}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                            >Revenue</div>
                                        </div>
                                    ),
                                    value: 'Revenue',
                                },
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/activecharger1.svg`}
                                                style={{
                                                    // backgroundColor: '#87d068',
                                                }}
                                                // src={usernotification}
                                            // icon={<UserOutlined />}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                            >Active 
                                            {/* charger */}
                                            </div>
                                        </div>
                                    ),
                                    value: 'Active charger',
                                },
                                {
                                    label: (
                                        <div
                                            style={{
                                                padding: 4,
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                alignContent: "center"
                                            }}
                                        >
                                            <Avatar
                                            shape="square"
                                                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/inactivecharger1.svg`}
                                                style={{
                                                    // backgroundColor: '#87d068',
                                                }}
                                                // src={usernotification}
                                            // icon={<UserOutlined />}
                                            />
                                            <div
                                            
                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                            >Inactive 
                                            {/* charger */}
                                            </div>
                                        </div>
                                    ),
                                    value: 'Inactive charger',
                                },
                            ]}
                            onChange={(value) => {
                                // console.log(value); // string
                                // setSelectedVal(value);
                                setType(value);
                            }}
                        />
                        <MDBox 
                        my={2} 
                        // mx={4}
                        >
                            
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
                        {/* <FormControl fullWidth>
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
                        </FormControl> */}
                    </Grid>

                    {/* Submit Button */}
                    {/* <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ color: "white", cursor: "pointer" }}>
                            Submit
                        </Button>
                    </Grid> */}
                </Grid>
            </form>
            <MDBox mt={8}>
                <Card>
                    <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <MDTypography variant="h6" color="white">
                                All {type}
                            </MDTypography>
                            <MDButton
                                //   onClick={() => setIsDisabled(!isDisabled)}
                                variant="outlined"
                                color="white"
                            >
                                Download Data
                            </MDButton>
                        </Grid>
                    </MDBox>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <CustomMaterialTable
                            columns={columns}
                            data={rows}
                            darkMode={darkMode}
                        />
                    )}
                </Card>
            </MDBox>
            {/* </LocalizationProvider> */}
        </DashboardLayout>
    );
};

export default Reports;