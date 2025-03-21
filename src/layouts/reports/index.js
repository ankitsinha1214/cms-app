import axios from "axios";
import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem, Button } from '@mui/material';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import OutlinedInput from "@mui/material/OutlinedInput";
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import Loader from "components/custom/Loader";
import { useSnackbar } from "notistack";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DatePicker } from 'antd';
import locale from "antd/es/date-picker/locale/en_US";
import { Avatar, Segmented } from 'antd';
import { Typography } from 'antd';
import { Card } from "@mui/material";
import { useMaterialUIController } from "context";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import MDBox from 'components/MDBox';
import CustomMaterialTable from "../../components/custom/CustomMaterialTable";
const { RangePicker } = DatePicker;

const Reports = () => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [isDisabled, setIsDisabled] = useState(false);
    const [visibleColumns, setVisibleColumns] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType] = useState('Sessions');
    const { enqueueSnackbar } = useSnackbar();
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [filteredData, setFilteredData] = useState(rows); 
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
    // Function to convert UTC to IST and format it
    const convertUTCtoIST = (utcDate) => {
        // console.log(utcDate);
        if (!utcDate || isNaN(new Date(utcDate).getTime())) {
            return 'N/A'; // Return 'N/A' if the date is invalid or missing
        }
        const timeZone = 'Asia/Kolkata'; // IST time zone
        const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
        return format(zonedDate, 'yyyy-MM-dd \u00A0\u00A0 HH:mm:ss'); // Format the date as desired
    };
    const sessionColumn = [
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
    // useEffect(() => {
    //     setColumns(sessionColumn);
    // }, []);
    useEffect(() => {
        if (fromDate && toDate) {
            setIsLoading(true);
            handleGetTable();
        }
    }, [fromDate, toDate, type]);

    const handleGetTable = () => {
        // e.preventDefault();
        // console.log({
        //     type,
        // });
        const isoDate = new Date(fromDate).toISOString();
        const isoDate1 = new Date(toDate).toISOString();
        const payload = {
            "fromDate": isoDate,
            "toDate": isoDate1,
            "filter": type,
        };
        axios({
            method: "post",
            url: process.env.REACT_APP_BASEURL + "reports/generate-report-new",
            data: payload, // JSON payload
            // responseType: "blob",
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
            },
        })
            .then((response) => {
                // console.log(response);
                // Clean up after download
                // if (response.data.success === true) {
                if (response.data.status === true) { // Clean up after download
                    const { columns, data } = response.data;
                    const newColumns = columns.map(col => ({
                        header: col.header,
                        accessorKey: col.key,
                        align: "center",
                        muiTableHeadCellProps: { align: "center" },
                        muiTableBodyCellProps: { align: "center" },
                        ...(col.key === "startTime" || col.key === "endTime"
                            ? { Cell: ({ cell }) => convertUTCtoIST(cell.getValue()) }
                            : {})
                    }));
                    setColumns(newColumns);
                    setRows(data);
                    setIsLoading(false);
                    enqueueSnackbar(response.data.message, { variant: 'success' })

                } else {
                    console.log(response.data);
                    enqueueSnackbar(response.data.message, { variant: 'error' })
                    // window.location.reload();
                }
            })
            .catch((error) => {
                console.log(error);
                enqueueSnackbar(error?.response?.data?.message || error.message, { variant: 'error' });
                // window.location.reload();
            });
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // console.log({
    //     //     type,
    //     // });
    //     const isoDate = new Date(fromDate).toISOString();
    //     const isoDate1 = new Date(toDate).toISOString();
    //     const payload = {
    //         "fromDate": isoDate,
    //         "toDate": isoDate1,
    //         "filter": type,
    //     };
    //     axios({
    //         method: "post",
    //         url: process.env.REACT_APP_BASEURL + "reports/generate-report",
    //         data: payload, // JSON payload
    //         responseType: "blob",
    //         headers: {
    //             "Content-Type": "application/json", // Set the Content-Type header
    //         },
    //     })
    //         .then((response) => {
    //             console.log(response);
    //             const contentDisposition = response.headers['content-disposition'];
    //             let fileName = 'report.xlsx'; // Default file name

    //             // Extract file name from content-disposition header if available
    //             if (contentDisposition) {
    //                 const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
    //                 if (fileNameMatch?.length === 2) fileName = fileNameMatch[1];
    //             }

    //             // Create a new Blob object using the response data
    //             const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //             const url = window.URL.createObjectURL(blob);
    //             window.open(url);
    //             const link = document.createElement('a');
    //             link.href = url;
    //             link.setAttribute('download', fileName); // Set filename for download
    //             document.body.appendChild(link);
    //             link.click();
    //             link.remove(); // Clean up after download
    //             // if (response.data.success === true) {
    //             // if (response.data) {
    //             //     console.log(response);
    //             //     const url = window.URL.createObjectURL(new Blob([response.data])); // Create blob URL
    //             //     const link = document.createElement('a');
    //             //     link.href = url;
    //             //     link.setAttribute('download', 'report.xlsx'); // Set the desired file name
    //             //     document.body.appendChild(link);
    //             //     link.click(); // Programmatically click the link to trigger the download
    //             //     link.remove(); // Clean up after download
    //             //     setIsDisabled(!isDisabled)
    //             // } else {
    //             //     enqueueSnackbar(response.data.message, { variant: 'error' })
    //             //     // window.location.reload();
    //             // }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             // enqueueSnackbar(error.response.data.message, { variant: 'error' })
    //             // alert("Error Occured! " + error);
    //             // window.location.reload();
    //         });
    // };

    const exportToExcel = async () => {
        if(!fromDate || !toDate){
            return enqueueSnackbar("Please select a date range!", { variant: 'error' })
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Report");
    
        // Filter visible columns
        const filteredColumns = columns.filter(col => visibleColumns[col.accessorKey] !== false);
    
        // Add column headers
        worksheet.addRow(filteredColumns.map(col => col.header));
    
        // Add filtered row data
        filteredData.forEach(row => {
          const rowData = filteredColumns.map(col => row[col.accessorKey] || "");
          worksheet.addRow(rowData);
        });
    
        // Style headers
        worksheet.getRow(1).eachCell(cell => {
          cell.font = { bold: true };
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFCCCCCC" },
          };
        });
    
        // Auto-adjust column widths
        worksheet.columns.forEach(column => {
          let maxLength = 0;
          column.eachCell({ includeEmpty: true }, cell => {
            const cellValue = cell.value ? cell.value.toString() : "";
            maxLength = Math.max(maxLength, cellValue.length);
          });
          column.width = maxLength + 2;
        });
    
        // Generate and download file
        const buffer = await workbook.xlsx.writeBuffer();
        const fileBlob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const fileName = `Report_${type}_${new Date().toISOString().replace(/[:.-]/g, "_")}.xlsx`;
        saveAs(fileBlob, fileName);
      };
    // const exportToExcel = async () => {
    //     const workbook = new ExcelJS.Workbook();
    //     const worksheet = workbook.addWorksheet("Report");
    
    //     // Filter visible columns
    //     const filteredColumns = columns.filter(col => visibleColumns[col.accessorKey] !== false);
    
    //     // Add column headers
    //     worksheet.addRow(filteredColumns.map(col => col.header));
    
    //     // Add row data
    //     rows.forEach(row => {
    //       const rowData = filteredColumns.map(col => row[col.accessorKey] || "");
    //       worksheet.addRow(rowData);
    //     });
    
    //     // Style headers
    //     worksheet.getRow(1).eachCell(cell => {
    //       cell.font = { bold: true };
    //       cell.alignment = { vertical: "middle", horizontal: "center" };
    //       cell.fill = {
    //         type: "pattern",
    //         pattern: "solid",
    //         fgColor: { argb: "FFCCCCCC" }, // Light Gray Background
    //       };
    //     });
    
    //     // Auto-adjust column widths
    //     worksheet.columns.forEach(column => {
    //       let maxLength = 0;
    //       column.eachCell({ includeEmpty: true }, cell => {
    //         const cellValue = cell.value ? cell.value.toString() : "";
    //         maxLength = Math.max(maxLength, cellValue.length);
    //       });
    //       column.width = maxLength + 2;
    //     });
    
    //     // Generate and download file
    //     const buffer = await workbook.xlsx.writeBuffer();
    //     const fileBlob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    //     saveAs(fileBlob, `Report_${type}.xlsx`);
    //   };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            {/* <form onSubmit={handleSubmit}> */}
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
                        vertical={isMobile ? true : false}
                        // vertical
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
                                value: 'Sessions',
                            },
                            // {
                            //     label: (
                            //         <div
                            //             style={{
                            //                 padding: 4,
                            //                 display: "flex",
                            //                 flexDirection: "row",
                            //                 alignItems: "center",
                            //                 justifyContent: "center",
                            //                 alignContent: "center"
                            //             }}
                            //         >
                            //             <Avatar
                            //                 shape="square"
                            //                 gap={4}
                            //                 src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/energy11.svg`}
                            //                 style={{
                            //                     // backgroundColor: '#87d068',
                            //                 }}
                            //             // src={usernotification}
                            //             // icon={<UserOutlined />}
                            //             />
                            //             <div

                            //                 style={{
                            //                     paddingLeft: "8px"
                            //                 }}
                            //             >Energy</div>
                            //         </div>
                            //     ),
                            //     value: 'Energy',
                            // },
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
                                value: 'Users',
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
                                            src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/location11.svg`}
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
                                        >Location</div>
                                    </div>
                                ),
                                value: 'Locations',
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
                                            src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/charger11.svg`}
                                            style={{
                                                // backgroundColor: '#87d068',
                                                // height: "30px",
                                                // width: "24px",
                                            }}
                                        // src={usernotification}
                                        // icon={<UserOutlined />}
                                        />
                                        <div

                                            style={{
                                                paddingLeft: "8px"
                                            }}
                                        >Charger
                                            {/* charger */}
                                        </div>
                                    </div>
                                ),
                                value: 'Chargers',
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
                                            src={`${process.env.REACT_APP_AWS_BASEURL}cms-icons/payment11.svg`}
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
                                        >Payment
                                            {/* charger */}
                                        </div>
                                    </div>
                                ),
                                value: 'Payments',
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
                                // showTime={{ 
                                // }}
                                showTime={{
                                    format: 'HH:mm:ss',
                                    defaultValue: [dayjs().startOf('day'), dayjs().endOf('day')]
                                }}
                                size="large"
                                format="YYYY-MM-DD HH:mm:ss"
                                onChange={(value, dateString) => {
                                    console.log('Formatted Selected Time: ', dateString);
                                    setFromDate(dateString[0]);
                                    setToDate(dateString[1]);
                                }}
                                locale={{
                                    ...locale,
                                    lang: {
                                      ...locale.lang,
                                      ok: "Set",
                                    }
                                  }}
                            // onSelect={(value) => {
                            //     if (value) {
                            //         const formattedValues = value.map(date => date.format("YYYY-MM-DD HH:mm:ss"));
                            //         setFromDate(formattedValues[0]);
                            //         setToDate(formattedValues[1]);
                            //     }
                            // }}
                            // onOk={() => {}}
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
            {/* </form> */}
            <MDBox mt={8}>
                <Card>
                    <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <MDTypography variant="h6" color="white">
                                Report of {type}
                            </MDTypography>
                            <MDButton
                                //   onClick={() => setIsDisabled(!isDisabled)}
                                onClick={exportToExcel}
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
                            exportExcel={true}
                            setVisibleColumns={setVisibleColumns}
                            setFilteredData={setFilteredData}
                        />
                    )}
                </Card>
            </MDBox>
            {/* </LocalizationProvider> */}
        </DashboardLayout>
    );
};

export default Reports;