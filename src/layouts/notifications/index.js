import { useState } from "react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Tooltip } from "@mui/material";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import { UserOutlined } from '@ant-design/icons';
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";
import CircleIcon from '@mui/icons-material/Circle';
import { Avatar, Segmented } from 'antd';
import { useSnackbar } from "notistack";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import usergroup from '../../assets/images/icons/usergroup.svg';
import usernotification from '../../assets/images/icons/usernotification.svg';
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CustomMaterialTable from "../../components/custom/CustomMaterialTable"; 
// import Device from "react-device-frame";
// import { Emulator } from "react-device-emulator";
// import DeviceEmulator from 'react-device-emulator';
// import 'react-device-emulator/lib/styles/style.css';


import { TextField, Button, Typography, CardContent, Switch, FormControlLabel, Stack } from "@mui/material";
import { AccessTime, CalendarToday, Opacity, Visibility } from "@mui/icons-material";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import utc from "dayjs/plugin/utc";
import { useMaterialUIController } from "context";
import { MaterialReactTable } from 'material-react-table';
import Loader from "components/custom/Loader";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

function Notifications() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const [columns, setColumns] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedVal, setSelectedVal] = useState("allUser");
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  // console.log(selectedDate)
  const dateFormat = 'YYYY-MM-DD HH:mm';
  const [preview, setPreview] = useState(false);
  const [visibile, setVisibile] = useState(true);
  const [schedule, setSchedule] = useState(false);
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setColumns(column);
  }, []);
  const statusList = [
    'Failed',
    // 'Scheduled',
    'Sent',
    // 'Pending'
  ];
  const statusList1 = [
    'Failed',
    'Scheduled',
    // 'Sent',
    // 'Pending'
  ];
  const handleDelete = (row_data) => {
    // const payload = { "id": row_data.app_user_pk };
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "notification/" + row_data._id,
      // data: payload, // JSON payload
      headers: {
        "Content-Type": "application/json", // Set the Content-Type header
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.data.status === true) {
          // console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
          // alert(response.data.message);
          enqueueSnackbar(response?.data?.message, { variant: 'success' });
          window.location.reload();
        } else {
          console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(error.response?.data?.message, { variant: 'error' });
        if(error?.response?.status === 401){
          localStorage.clear();
          navigate('/sign-in');
        }
      });
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
    // Function to convert schedule cron time to normal time and format it
    const convertSchedule = (utcDate) => {
      if (!utcDate) return 'N/A';
    
      // Ensure it matches the cron format: "minute hour day month *"
      const cronRegex = /^(\d{1,2}) (\d{1,2}) (\d{1,2}) (\d{1,2}) \*$/;
      const match = utcDate.match(cronRegex);
    
      if (!match) return 'N/A'; // Return 'N/A' if format is incorrect
    
      const [_, minute, hour, day, month] = match.map(Number); // Extract values as numbers
    
      // Get current year
      const year = new Date().getFullYear();
    
      // Construct a valid Date object in UTC
      const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
    
      // Convert to readable format
      return format(date, "d'th' MMMM HH:mm"); // Example: "13th March 18:09"
    };
    const handleView = (row_data) => {
      // console.log(row_data);
      window.scrollTo({ top: 0, behavior: "smooth" }); 
      if(visibile){
        setPreview(true);
        setTitle(row_data.title);
        setPhoneNumber(row_data.phoneNumber);
        setDescription(row_data.description);
      }
      else{
        setTitle('');
        setPhoneNumber('');
        setDescription('');
      }
      setVisibile(!visibile);
      // navigate("/location/view", { state: row_data?._id });
    };
  const column = [
    {
      header: "Status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "status",
      align: "center",
      fixed: "true",
      // filterFn: (row, id, columnFilterValue) => {
       
      //   return row.original.status === columnFilterValue;
      // },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Failed") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Pending") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "Scheduled") ?
                <CircleIcon style={{ color: "#F1C21B" }} />
                :
                (row.row.original.status === "Sent") ?
                  <CircleIcon style={{ color: "#198038" }} />
                  :
                  <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    {
      header: "Title", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "title", align: "center"
    },
    {
      header: "Description", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'justify',
      }, accessorKey: "description", align: "center"
    },
    {
      header: "Sent to", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "type", align: "center"
    },
    {
      header: "Created By", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "userId.username", align: "center"
    },
    {
      header: "Sent Date & Time", accessorKey: "updatedAt", align: "center",
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return convertUTCtoIST(cell.getValue());
      },
    },
    {
      header: "Created Date & Time", accessorKey: "createdAt", align: "center",
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return convertUTCtoIST(cell.getValue());
      },
    },
    // {
    //   header: "Action",
    //   enableColumnFilter: false,
    //   muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "action",
    //   align: "center",
    //   Cell: (row) => (
    //     row.row.depth === 0 ? (
    //       <div style={{
    //         position: 'sticky',
    //         right: '0',
    //         zIndex: '111',
    //       }}>
    //         <MDButton
    //           onClick={(e) => handleView(row.row.original)}
    //           variant="gradient"
    //           color="info"
    //           iconOnly
    //         >
    //           <LaunchIcon />
    //         </MDButton>
    //         {/* <MDButton
    //           sx={{
    //             marginLeft: 2,
    //           }}
    //           onClick={(e) => handleEdit(row.row.original)}
    //           variant="gradient"
    //           color="info"
    //           // color="secondary"
    //           iconOnly
    //         >
    //           <EditIcon />
    //         </MDButton>
    //         <MDButton
    //           sx={{
    //             marginLeft: 2,
    //           }}
    //           onClick={(e) => handleDelete(row.row.original)}
    //           variant="gradient"
    //           color="info"
    //           // color="secondary"
    //           iconOnly
    //         >
    //           <DeleteIcon />
    //         </MDButton> */}
    //       </div>
    //     ) : null
    //   ),
    // },
  ];
  const column1 = [
    {
      header: "Status",
      filterVariant: 'select',
      filterSelectOptions: statusList1,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "status",
      align: "center",
      fixed: "true",
      // filterFn: (row, id, columnFilterValue) => {
       
      //   return row.original.status === columnFilterValue;
      // },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Failed") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Pending") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "Scheduled") ?
                <CircleIcon style={{ color: "#F1C21B" }} />
                :
                (row.row.original.status === "Sent") ?
                  <CircleIcon style={{ color: "#198038" }} />
                  :
                  <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    {
      header: "Title", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "title", align: "center"
    },
    {
      header: "Description", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'justify',
      }, accessorKey: "description", align: "center",
    },
    {
      header: "Schedule Date", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, 
      accessorKey: "scheduleTime", 
      align: "center",
      Cell: ({ cell }) => {
        return convertSchedule(cell.getValue());
      },
    },
    {
      header: "Sent to", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "type", align: "center"
    },
    {
      header: "Created By", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "userId.username", align: "center"
    },
    // {
    //   header: "Scheduled Date & Time", accessorKey: "createdAt", align: "center",
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
    {
      header: "Created Date & Time", accessorKey: "createdAt", align: "center",
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: ({ cell }) => {
        return convertUTCtoIST(cell.getValue());
      },
    },
    {
      header: "Action",
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "action",
      align: "center",
      Cell: (row) => (
        row.row.depth === 0 ? (
          <div style={{
            position: 'sticky',
            right: '0',
            zIndex: '111',
          }}>
            <Tooltip title={visibile ? "Show Preview" : "Hide Preview"} arrow>
              <MDButton
                onClick={(e) => handleView(row.row.original)}
                variant="gradient"
                color={visibile ? "info" : "success"}
                iconOnly
              >
                {
                  (visibile) ?
                    <VisibilityIcon />
                    :
                    <VisibilityOffIcon />
                }
              </MDButton>
            </Tooltip>
            {/* <MDButton
              sx={{
                marginLeft: 2,
              }}
              onClick={(e) => handleEdit(row.row.original)}
              variant="gradient"
              color="info"
              // color="secondary"
              iconOnly
            >
              <EditIcon />
            </MDButton>*/}
            {/* Delete Button */}
            <Tooltip title="Delete" arrow>
              <MDButton
                sx={{
                  marginLeft: 2,
                }}
                onClick={(e) => handleDelete(row.row.original)}
                variant="gradient"
                color="error"
                // color="secondary"
                iconOnly
              >
                <DeleteIcon />
              </MDButton>
            </Tooltip>
          </div>
        ) : null
      ),
    },
  ];
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "notification/scheduled",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        // console.log(response.data.data);

        if (response.data.status === true) {
          setRows(response.data.data);
          setIsLoading(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
        if(error?.response?.status === 401){
          localStorage.clear();
          navigate('/sign-in');
        }
      });
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "notification/sent-or-failed",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        // console.log(response.data.data);

        if (response.data.status === true) {
          setRows1(response.data.data);
          setIsLoading1(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading1(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
        if(error?.response?.status === 401){
          localStorage.clear();
          navigate('/sign-in');
        }
      });
  }, []);
  const createUser = (title, description,phoneNumber) => {
    let payload;
    if(schedule){
      // Convert selected date to UTC
      // const utcDate = dayjs(selectedDate).utc().format("YYYY-MM-DD HH:mm");
      const scheduleDate = dayjs(selectedDate)
            .utc() // Convert to UTC
            .format("m H D M *"); 
      // console.log(scheduleDate);
      // const scheduleDate = `${utcDate.$m} ${utcDate.$H} ${utcDate.$D} ${utcDate.$M + 1} *`
      // const scheduleDate = `${selectedDate.$m} ${selectedDate.$H} ${selectedDate.$D} ${selectedDate.$M + 1} *`
      payload = {
        "title": title,
        "message": description,
        "phoneNumber": phoneNumber,
        "scheduleTime": scheduleDate
    };
    } else{
      payload = {
        "title": title,
        "message": description,
        "phoneNumber": phoneNumber
    };
    }
    // console.log(selectedDate)
    // const diffMinutes = dayjs().diff(selectedDate, 'minute');
    // const diffHours = dayjs().diff(selectedDate, 'hour');
    // const diffDays = dayjs().diff(selectedDate, 'day');
    // const diffMonths = dayjs().diff(selectedDate, 'month');
    // console.log(diffMinutes)
    // console.log(scheduleDate)
      // return;
    const token = localStorage.getItem("token");
    axios({
        method: "post",
        // url: process.env.REACT_APP_BASEURL + "notification/" + {schedule ? "schedule-notification-to-all" : "send-notification-to-all"},
        url: `${process.env.REACT_APP_BASEURL}notification/${schedule ? "schedule-notification-to-all" : selectedVal === 'singleUser' ? "send-notification" : "send-notification-to-all"}`,
        data: payload, // JSON payload
        headers: {
            "Content-Type": "application/json", // Set the Content-Type header
            "Authorization": `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.data.status === true) {
                setTitle('');
                setDescription('');
                setPhoneNumber('');
                enqueueSnackbar(response?.data?.message, { variant: 'success' });
                // window.location.reload();
            } else {
                console.log("status is false ");
                enqueueSnackbar(response?.data?.message, { variant: 'error' });

            }
        })
        .catch((error) => {
            console.log(error);
            enqueueSnackbar(error, { variant: 'error' });
            if(error?.response?.status === 401){
              localStorage.clear();
              navigate('/sign-in');
            }
        });
};
  const handleSubmit = (event) => {
    event.preventDefault();
    if (title === '' || description === '') {
        return enqueueSnackbar('All fields are necessary', { variant: 'error' });
    }
    if (selectedVal === 'singleUser' && phoneNumber === '') {
        return enqueueSnackbar('All fields are necessary', { variant: 'error' });
    }
   createUser(title,description,phoneNumber);
};

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={2} mb={2}>
      <Grid container spacing={2}>
      {/* Left Panel - Form */}
      <Grid item xs={12} md={8}>
        <Card variant="outlined" style={{
          padding: "8px"
        }}>
          <CardContent>
            {/* <Typography variant="h6">Send Notification</Typography> */}

                <MDTypography variant="h6" mb={2}>Send Notification</MDTypography>

            {/* <Button variant="contained" size="small" sx={{ mt: 1, mb: 2 }}>
              All User
            </Button> */}
            <Segmented
      options={[
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
              //  src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" 
               src={usergroup}
               />
              <div> All user</div>
            </div>
          ),
          value: 'allUser',
        },
        {
          label: (
            <div
              style={{
                padding: 4,
              }}
            >
              <Avatar
                style={{
                  // backgroundColor: '#87d068',
                }}
                src={usernotification}
                // icon={<UserOutlined />}
              />
              <div>Single User</div>
            </div>
          ),
          value: 'singleUser',
        },
      ]}
      onChange={(value) => {
        // console.log(value); // string
        setSelectedVal(value);
      }}
    />
                {
                  selectedVal === 'singleUser' ?
                    <TextField
                      type="text"
                      label="Mobile number"
                      placeholder="Enter mobile number"
                      value={phoneNumber}
                      margin="normal"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth={true}
                    />
                    : null
                }
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              margin="normal"
              multiline
              rows={3}
            />

            {/* Scheduling Options */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item>
                <MDButton 
                  variant={schedule ? "outlined" : "contained"}
                  color="info"
                // variant="gradient"
                //  color="success" 
                  startIcon={<AccessTime />}
                  onClick={() => setSchedule(false)}
                                // onClick={openSuccessSB}
                                // fullWidth
                                >
                                Now
                    </MDButton>
              </Grid>
              <Grid item>
                <MDButton 
                  variant={schedule ? "contained" : "outlined"}
                  color="info"
                // variant="gradient"
                //  color="success" 
                  startIcon={<CalendarToday />}
                  onClick={() => setSchedule(true)}
                                // onClick={openSuccessSB}
                                // fullWidth
                                >
                                Schedule
                    </MDButton>
              </Grid>
              <Grid item>
              {schedule &&
                      <DatePicker 
                      variant="filled"
                      showTime={{
                        format: 'HH:mm',
                    }}
                      defaultValue={dayjs(selectedDate, dateFormat)}
                      onChange={(date) => setSelectedDate(date)} 
                      />
}
              </Grid>
            </Grid>

            {/* Preview Toggle */}
            <FormControlLabel
              control={<Switch checked={preview} onChange={() => setPreview(!preview)} />}
              label="Preview"
              // label={
              //   <Stack direction="row" alignItems="center" spacing={1}>
              //     <VisibilityIcon fontSize="small" />
              //     <Typography>Preview</Typography>
              //   </Stack>
              // }
              sx={{ mt: 2 }}
            />

            {/* Submit Button */}
            {/* <Button variant="contained" color="success" sx={{ mt: 2 }}>
              Submit
            </Button> */}
                                <MDButton variant="gradient" color="success" 
                                onClick={handleSubmit}
                                 sx={{ mt: 2 }}
                                // fullWidth
                                >
                                Submit
                    </MDButton>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Panel - Preview */}
      {preview && (
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ 
            // bgcolor: "#f5f5f5" 
            }}>
            <CardContent>
              <Typography variant="h6">Preview</Typography>
              {/* <Typography variant="body1" sx={{ mt: 2 }}>
                <b>iOS:</b> {title || "No title"} - {description || "No description"}
              </Typography> */}
               {/* iOS Preview */}
        {/* iOS Preview */}
        <MDBox sx={{ 
          // display: "flex",
          // alignItems: "center",
          textAlign: "center", mb: 2 }}>
          <Typography variant="subtitle1">iOS</Typography>
          <MDBox
            sx={{
              position: "relative",
              width: 234,
              height: 240,
              // backgroundImage: "url('/iphone2.png')", // Replace with actual iOS background image
              backgroundImage: `url(${process.env.REACT_APP_AWS_BASEURL}notificationImg/iphone2.png)`, 
              backgroundSize: "cover",
              backgroundPosition: "center",
              // borderRadius: 16,
              // boxShadow: 3,
              mx: "auto",
              // ml: "auto",
            }}
          >
            <MDBox
              sx={{
                position: "absolute",
                bottom: "10%",
                // bottom: 60,
                left: "4%",
                width: "92%",
                display: "flex", // Added flex to align items
      // alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              // Opacity: 0.8,
                borderRadius: 2,
                p: 1,
              }}
            >
                {/* Logo on the left */}
    <MDBox
      component="img"
      src="/mm.png" // Replace with actual logo path
      alt="Logo"
      sx={{
        width: 24, // Adjust size as needed
        height: 24,
        mr: 1, // Space between logo and text
      }}
    />

    {/* Notification Text */}
    <MDBox sx={{
      display: "flex", // Added flex to align items
      flexDirection: "column",
      // alignItems: "flex-start",
      textAlign: "left"
    }
    }>

              <MDTypography variant="h6" fontWeight="400" fontSize="0.8rem" lineHeight="18px"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1, // Limits to 2 lines
                overflow: "hidden",
                // width: "180px" // Adjust width as needed
              }}
              >{title? title:"No title"}</MDTypography>
              <MDTypography 
              variant="body" 
              fontSize="0.7rem" 
              lineHeight="14px"
               sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Limits to 2 lines
                overflow: "hidden",
                // textAlign: "justify"
                // width: "180px" // Adjust width as needed
              }}
              >{description? description:"No description"}</MDTypography>
    </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox sx={{ 
          // display: "flex",
          // alignItems: "center",
          textAlign: "center",
           mb: 2
            }}>
          <Typography variant="subtitle1">Android</Typography>
          <MDBox
            sx={{
              position: "relative",
              width: 234,
              height: 240,
              backgroundImage: `url(${process.env.REACT_APP_AWS_BASEURL}notificationImg/android1.png)`, // Replace with actual iOS background image
              // backgroundImage: "url('/android1.png')", // Replace with actual iOS background image
              backgroundSize: "cover",
              backgroundPosition: "center",
              // borderRadius: 16,
              // boxShadow: 3,
              // ml: "auto",
              mx: "auto",
            }}
          >
            <MDBox
              sx={{
                position: "absolute",
                bottom: "10%",
                // bottom: 60,
                left: "4%",
                width: "92%",
                display: "flex", // Added flex to align items
      // alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.75)",
              // Opacity: 0.8,
                borderRadius: 2,
                p: 1,
              }}
            >
                {/* Logo on the left */}
    <MDBox
      component="img"
      src="/mm.png" // Replace with actual logo path
      alt="Logo"
      sx={{
        width: 24, // Adjust size as needed
        height: 24,
        mr: 1, // Space between logo and text
      }}
    />

    {/* Notification Text */}
    <MDBox sx={{
      display: "flex", // Added flex to align items
      flexDirection: "column",
      // alignItems: "flex-start",
      textAlign: "left"
    }
    }>

              <MDTypography variant="h6" fontWeight="400" fontSize="0.8rem" lineHeight="18px"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1, // Limits to 2 lines
                overflow: "hidden",
                // width: "180px" // Adjust width as needed
              }}
              >{title? title:"No title"}</MDTypography>
              <MDTypography variant="body" fontSize="0.7rem" 
              lineHeight="14px"
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // Limits to 2 lines
                overflow: "hidden",
                // width: "180px" // Adjust width as needed
              }}
              >{description?description:"No description"}</MDTypography>
    </MDBox>
            </MDBox>
          </MDBox>
        </MDBox>
      {/* <DeviceEmulator
        type="mobile"
        isRotated={false}
        withoutChrome={false}
        url='https://cms.chrgup.in'
      >
        <MDBox style={{
          backgroundColor: "white"
        }}>
        <MDTypography variant="h3" fontWeight="medium" >
        {title}
      </MDTypography>
      <MDTypography variant="subtitle" color="text">
       {description}
      </MDTypography>
      </MDBox>
        </DeviceEmulator> */}
            </CardContent>
          </Card>
        </Grid>
      )}
    </Grid>
    <MDBox mt={6}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                Schedule Notification
                </MDTypography>
                {/* <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                  disabled={mapDisabled}
                >
                  Add Locations
                </MDButton> */}
              </Grid>
            </MDBox>
            {isLoading ? (
              <Loader />
            ) : (
              <CustomMaterialTable 
              columns={column1} 
              data={rows} 
              darkMode={darkMode} 
              toggleDensity={false}
            />
            // <MaterialReactTable
            //   id="tble"
            //   columns={column1}
            //   data={rows}
            //   // enableExpanding={true}
            //   // getSubRows={(originalRow) => originalRow.chargerInfoRep}
            //   // SubComponent={({ row }) => <SubRow row={row} />}
            //   initialState={{ showColumnFilters: true }}
            //   muiTableContainerProps={{
            //     id: 'tble', // Attach the ID here to the container of the table
            //   }}
            //   muiTableProps={{
            //     sx: darkMode ?
            //       {
            //         backgroundColor: "#202940", color: "#ffffff",
            //         '& td': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } :
            //       {
            //         '& td': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           backgroundColor: '#f5f5f5',
            //         },
            //       },
            //   }}
            //   muiTopToolbarProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& svg': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiTableHeadCellProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& svg': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiBottomToolbarProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& p,button,div': {
            //           fontFamily: "Montserrat",
            //           // fontSize : "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiTableBodyCellProps={{
            //     sx: {
            //       borderBottom: '2px solid #e0e0e0', //add a border between columns

            //     },
            //   }}
            // />
            )}
          </Card>
        </MDBox>
    <MDBox mt={6}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                History
                </MDTypography>
                {/* <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                  disabled={mapDisabled}
                >
                  Add Locations
                </MDButton> */}
              </Grid>
            </MDBox>
            {isLoading1 ? (
              <Loader />
            ) : (
              <CustomMaterialTable 
      columns={columns} 
      data={rows1} 
      darkMode={darkMode} 
      toggleDensity={false}
    />
            // <MaterialReactTable
            //   id="tble"
            //   columns={columns}
            //   data={rows1}
            //   // enableExpanding={true}
            //   // getSubRows={(originalRow) => originalRow.chargerInfoRep}
            //   // SubComponent={({ row }) => <SubRow row={row} />}
            //   initialState={{ 
            //     showColumnFilters: true,
            //     density: "compact" 
            //   }}
            //   muiTableContainerProps={{
            //     id: 'tble', // Attach the ID here to the container of the table
            //   }}
            //   muiTableProps={{
            //     sx: darkMode ?
            //       {
            //         backgroundColor: "#202940", color: "#ffffff",
            //         '& td': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } :
            //       {
            //         '& td': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           backgroundColor: '#f5f5f5',
            //         },
            //       },
            //   }}
            //   muiTopToolbarProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& svg': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiTableHeadCellProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& svg': {
            //           fontFamily: "Montserrat",
            //           fontSize: "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiBottomToolbarProps={{
            //     sx: darkMode ?
            //       {
            //         color: "#ffffff",
            //         '& p,button,div': {
            //           fontFamily: "Montserrat",
            //           // fontSize : "14px",
            //           fontWeight: "500",
            //           lineHeight: "17.07px",
            //           color: "#ffffff"
            //           // backgroundColor: '#f5f5f5',
            //         },
            //       } : {
            //         backgroundColor: '#f5f5f5',
            //       }
            //   }}
            //   muiTableBodyCellProps={{
            //     sx: {
            //       borderBottom: '2px solid #e0e0e0', //add a border between columns

            //     },
            //   }}
            // />
            )}
          </Card>
        </MDBox>
      </MDBox>
       
    </DashboardLayout>
  );
}

export default Notifications;
// import { useState } from "react";

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// // @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";

// // Material Dashboard 2 React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import MDAlert from "components/MDAlert";
// import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";

// // Material Dashboard 2 React example components
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// function Notifications() {
//   const [successSB, setSuccessSB] = useState(false);
//   const [infoSB, setInfoSB] = useState(false);
//   const [warningSB, setWarningSB] = useState(false);
//   const [errorSB, setErrorSB] = useState(false);

//   const openSuccessSB = () => setSuccessSB(true);
//   const closeSuccessSB = () => setSuccessSB(false);
//   const openInfoSB = () => setInfoSB(true);
//   const closeInfoSB = () => setInfoSB(false);
//   const openWarningSB = () => setWarningSB(true);
//   const closeWarningSB = () => setWarningSB(false);
//   const openErrorSB = () => setErrorSB(true);
//   const closeErrorSB = () => setErrorSB(false);

//   const alertContent = (name) => (
//     <MDTypography variant="body2" color="white">
//       A simple {name} alert with{" "}
//       <MDTypography component="a" href="#" variant="body2" fontWeight="medium" color="white">
//         an example link
//       </MDTypography>
//       . Give it a click if you like.
//     </MDTypography>
//   );

//   const renderSuccessSB = (
//     <MDSnackbar
//       color="success"
//       icon="check"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={successSB}
//       onClose={closeSuccessSB}
//       close={closeSuccessSB}
//       bgWhite
//     />
//   );

//   const renderInfoSB = (
//     <MDSnackbar
//       icon="notifications"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={infoSB}
//       onClose={closeInfoSB}
//       close={closeInfoSB}
//     />
//   );

//   const renderWarningSB = (
//     <MDSnackbar
//       color="warning"
//       icon="star"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={warningSB}
//       onClose={closeWarningSB}
//       close={closeWarningSB}
//       bgWhite
//     />
//   );

//   const renderErrorSB = (
//     <MDSnackbar
//       color="error"
//       icon="warning"
//       title="Material Dashboard"
//       content="Hello, world! This is a notification message"
//       dateTime="11 mins ago"
//       open={errorSB}
//       onClose={closeErrorSB}
//       close={closeErrorSB}
//       bgWhite
//     />
//   );

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox mt={6} mb={3}>
//         <Grid container spacing={3} justifyContent="center">
//           <Grid item xs={12} lg={8}>
//             <Card>
//               <MDBox p={2}>
//                 <MDTypography variant="h5">Alerts</MDTypography>
//               </MDBox>
//               <MDBox pt={2} px={2}>
//                 <MDAlert color="primary" dismissible>
//                   {alertContent("primary")}
//                 </MDAlert>
//                 <MDAlert color="secondary" dismissible>
//                   {alertContent("secondary")}
//                 </MDAlert>
//                 <MDAlert color="success" dismissible>
//                   {alertContent("success")}
//                 </MDAlert>
//                 <MDAlert color="error" dismissible>
//                   {alertContent("error")}
//                 </MDAlert>
//                 <MDAlert color="warning" dismissible>
//                   {alertContent("warning")}
//                 </MDAlert>
//                 <MDAlert color="info" dismissible>
//                   {alertContent("info")}
//                 </MDAlert>
//                 <MDAlert color="light" dismissible>
//                   {alertContent("light")}
//                 </MDAlert>
//                 <MDAlert color="dark" dismissible>
//                   {alertContent("dark")}
//                 </MDAlert>
//               </MDBox>
//             </Card>
//           </Grid>

//           <Grid item xs={12} lg={8}>
//             <Card>
//               <MDBox p={2} lineHeight={0}>
//                 <MDTypography variant="h5">Notifications</MDTypography>
//                 <MDTypography variant="button" color="text" fontWeight="regular">
//                   Notifications on this page use Toasts from Bootstrap. Read more details here.
//                 </MDTypography>
//               </MDBox>
//               <MDBox p={2}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
//                       success notification
//                     </MDButton>
//                     {renderSuccessSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="info" onClick={openInfoSB} fullWidth>
//                       info notification
//                     </MDButton>
//                     {renderInfoSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="warning" onClick={openWarningSB} fullWidth>
//                       warning notification
//                     </MDButton>
//                     {renderWarningSB}
//                   </Grid>
//                   <Grid item xs={12} sm={6} lg={3}>
//                     <MDButton variant="gradient" color="error" onClick={openErrorSB} fullWidth>
//                       error notification
//                     </MDButton>
//                     {renderErrorSB}
//                   </Grid>
//                 </Grid>
//               </MDBox>
//             </Card>
//           </Grid>
//         </Grid>
//       </MDBox>
       
//     </DashboardLayout>
//   );
// }

// export default Notifications;
