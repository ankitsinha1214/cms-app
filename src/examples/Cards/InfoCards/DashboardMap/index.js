// import React, { useState, useEffect } from "react";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import dayjs from "dayjs";
// import MDTypography from "components/MDTypography";
// import { DatePicker } from "antd";
// import {
//   IconButton,
//   Menu,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import DownloadsIcon from "../../../../assets/images/download.svg"
// // import { MapContainer, TileLayer } from "react-leaflet";
// // import "leaflet/dist/leaflet.css";
// // import { Globe } from "lucide-react";
// import MapComponent from "layouts/location_mgmt/components/MapComponent";
// import { useNavigate } from "react-router-dom";
// import { useMaterialUIController } from "context";

// const DashboardMap = (locations) => {
//   const [controller] = useMaterialUIController();
//   const navigate = useNavigate();
//   const { darkMode } = controller;
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(dayjs());
//   const [timeRange, setTimeRange] = useState("Daily");
//   const dateFormat = 'YYYY-MM-DD';
//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDownload = () => {
//     alert("Download function triggered!");
//     handleMenuClose();
//   };
//   // const [locations, setLocations] = useState([]);
//   useEffect(() => {
//     if (
//       localStorage.getItem("login_status") !== "true"
//     ) {
//       navigate("/sign-in");
//     }
//     // axios({
//     //   method: "get",
//     //   url: process.env.REACT_APP_BASEURL + "charger-locations",
//     //   headers: {
//     //     "Authorization": `Bearer ${localStorage.getItem("token")}`
//     //   },
//     // })
//     //   .then((response) => {
//     //     // console.log(response.data.data);

//     //     if (response.data.success === true) {
//     //       // console.log(response.data);
//     //       const element = [];
//     //       const dataWithChargerCount = response.data.data.map(location => {
//     //         const availCount = location.chargerInfo.filter(charger => charger.status === 'Available').length;
//     //         const inuseCount = location.chargerInfo.filter(charger => charger.status === 'Inuse').length;
//     //         const inactiveCount = location.chargerInfo.filter(charger => charger.status === 'Inactive').length;
//     //         const ele = {
//     //           name: location.locationName,
//     //           direction: location.direction,
//     //           availCount: availCount,
//     //           inuseCount: inuseCount,
//     //           inactiveCount: inactiveCount,
//     //           data: location
//     //         };
//     //         element.push(ele);
//     //         const acCount = location.chargerInfo.filter(charger => charger.type === 'AC').length;
//     //         const dcCount = location.chargerInfo.filter(charger => charger.type === 'DC').length;
//     //         const energyDisp = location.chargerInfo.reduce((total, charger) => {
//     //           // console.log(charger);
//     //           const energyValue = parseFloat(charger.energyConsumptions.replace(' kWh', ''));
//     //           return total + energyValue;
//     //         }, 0).toFixed(1) + ' kWh';
//     //         const chargerInfoRep = location.chargerInfo.map(charger => ({
//     //           locationType: charger.powerOutput,
//     //           chargers: charger.subtype,
//     //           locationName: charger.name,
//     //           energy_disp: charger.energyConsumptions,
//     //           status: charger.status === "Available" ? "Active" : charger.status === "Inuse" ? "Pending" : "Inactive",
//     //           c_type: charger.type,
//     //         }));
//     //         return { ...location, energy_disp: energyDisp, chargers: location.chargerInfo.length, c_type: `AC: ${acCount}, DC: ${dcCount}`, chargerInfoRep: chargerInfoRep };
//     //         // ...location,
//     //         // ac: location.chargerInfo
//     //       });
//     //       // console.log(element);
//     //       setLocations(element);
//     //       // console.log(dataWithChargerCount);
//     //       // setRows(dataWithChargerCount);
//     //       // setIsLoading(false);
//     //     } else {
//     //       enqueueSnackbar(response.data.message, { variant: 'error' });
//     //       // setIsLoading(false);
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.log(error);
//     //   });
//   }, []);
//   return (
//     <div className="p-4 bg-white rounded-lg shadow-lg">
//       {/* Header Controls */}
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex space-x-4">
//           <span className="px-3 py-1 bg-green-100 text-green-700 rounded">Total Charger (300)</span>
//           <span className="px-3 py-1 bg-green-200 text-green-900 rounded">Active Charger (300)</span>
//           <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Inactive Charger (300)</span>
//         </div>
//         <div className="flex space-x-4 items-center">
//         <div style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   // alignItems: window.innerWidth < 600 ? "start": "center",
//                   marginBottom: "1rem",
//                   paddingRight: "1rem",
//                   flexDirection: window.innerWidth < 600 ? "column" : "row", // Responsive flex-direction
//                   gap: "0.5rem",
//                 }}>
//                   <MDTypography variant="h5" fontWeight="medium"
//                     // mb={3} 
//                     // px={2}
//                     sx={{
//                       fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" }, // Responsive font size
//                       textAlign: { xs: "left", sm: "left" }, // Center text on mobile, left-align on larger screens
//                     }}
//                   >
//                     Energy Dispersed
//                   </MDTypography>
//                   <div style={{ display: "flex", alignItems: "center" }}>
//                     {/* <IconButton size="small">
//                       <CalendarTodayIcon fontSize="small" />
//                     </IconButton> */}
//                     {/* <DatePicker
//       open={false} // Prevents default opening
//       onClick={(e) => e.stopPropagation()} // Stops unwanted propagation
//       renderExtraFooter={() => null} // Removes any footer
//       popupStyle={{ minWidth: 300 }} // Ensures proper popup width
//       inputRender={() => (
//         <IconButton size="small">
//           <CalendarTodayIcon fontSize="small" />
//         </IconButton>
//       )}
//     /> */}
//                     <DatePicker
//                       defaultValue={dayjs(selectedDate, dateFormat)}
//                     />
//                     <Select
//                       value={timeRange}
//                       onChange={(e) => setTimeRange(e.target.value)}
//                       size="large"
//                       sx={{ mx: 1, height: "2rem" }}
//                     >
//                       <MenuItem value="Daily">Daily</MenuItem>
//                       <MenuItem value="Weekly">Weekly</MenuItem>
//                       <MenuItem value="Monthly">Monthly</MenuItem>
//                     </Select>
//                     <IconButton size="large" sx={{ padding: "0px" }} style={{
//                       color: darkMode ? "white" : "black"
//                     }}>
//                       <img src={DownloadsIcon} onClick={handleDownload}
//                       //  fontSize="small" 
//                       />
//                       {/* <DownloadIcon onClick={handleDownload}
//                       //  fontSize="small" 
//                       /> */}
//                     </IconButton>
//                     {/* <IconButton size="small" onClick={handleMenuOpen}>
//                       <MoreVertIcon />
//                     </IconButton> */}
//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                       <MenuItem onClick={handleDownload}>Download</MenuItem>
//                     </Menu>
//                   </div>
//                 </div>
//         </div>
//       </div>

//       {/* Map Section */}
//       <div className="relative">
//         {/* <MapContainer center={[20, 77]} zoom={3} className="h-96 w-full rounded-lg">
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//         </MapContainer> */}
//         <MapComponent locations={locations} givenHeight={"100vh"} zoomLevel={4} />
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-4 gap-4 mt-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 text-blue-500">
//               {/* <Globe size={20} /> */}
//                <span>User</span>
//             </div>
//             <p className="text-lg font-semibold">500</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 text-purple-500">
//               {/* <Globe size={20} />  */}
//               <span>Session</span>
//             </div>
//             <p className="text-lg font-semibold">500</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 text-green-500">
//               {/* <Globe size={20} />  */}
//               <span>Energy</span>
//             </div>
//             <p className="text-lg font-semibold">800 kWh</p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-2 text-orange-500">
//               {/* <Globe size={20} /> */}
//                <span>Revenue</span>
//             </div>
//             <p className="text-lg font-semibold">₹ 2000</p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default DashboardMap;

import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import MDTypography from "components/MDTypography";
import { DatePicker } from "antd";
import {
  IconButton,
  Menu,
  MenuItem,
  Select,
  useTheme,
} from "@mui/material";
import DownloadsIcon from "../../../../assets/images/download.svg";
import MapComponent from "layouts/location_mgmt/components/MapComponent";
import { useNavigate } from "react-router-dom";
import { useMaterialUIController } from "context";

const DashboardMap = ({ locations }) => {
  const [controller] = useMaterialUIController();
  const navigate = useNavigate();
  const theme = useTheme();
  const { darkMode } = controller;
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [timeRange, setTimeRange] = useState("Daily");
  const dateFormat = "YYYY-MM-DD";

  useEffect(() => {
    if (localStorage.getItem("login_status") !== "true") {
      navigate("/sign-in");
    }
  }, [navigate]);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleDownload = () => {
    alert("Download function triggered!");
    handleMenuClose();
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      {/* Header Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4">
        {/* Charger Stats */}
        <div className="flex flex-wrap space-x-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded">Total Charger (300)</span>
          <span className="px-3 py-1 bg-green-200 text-green-900 rounded">Active Charger (300)</span>
          <span className="px-3 py-1 bg-red-200 text-red-900 rounded">Inactive Charger (300)</span>
        </div>

        {/* Date & Time Range Picker */}
        <div className="flex flex-wrap space-x-4 items-center">
          {/* <MDTypography
            variant="h5"
            fontWeight="medium"
            sx={{
              fontSize: { xs: "1.05rem", sm: "1.15rem", md: "1.25rem" },
              textAlign: { xs: "left", sm: "left" },
            }}
          >
            Energy Dispersed
          </MDTypography> */}

          <div className="flex items-center">
            <DatePicker defaultValue={dayjs(selectedDate, dateFormat)} />
            <Select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              size="small"
              sx={{ mx: 1, height: "2rem" }}
            >
              <MenuItem value="Daily">Daily</MenuItem>
              <MenuItem value="Weekly">Weekly</MenuItem>
              <MenuItem value="Monthly">Monthly</MenuItem>
            </Select>

            <IconButton onClick={handleDownload} sx={{ padding: "0px", color: darkMode ? "white" : "black" }}>
              <img src={DownloadsIcon} alt="Download" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="relative">
        <MapComponent locations={locations} givenHeight="100vh" zoomLevel={4} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <Card>
          <CardContent className="p-4">
            <MDTypography variant="h6" fontWeight="medium">
              Total Chargers
            </MDTypography>
            <MDTypography variant="h4" color="primary">
              300
            </MDTypography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <MDTypography variant="h6" fontWeight="medium">
              Active Chargers
            </MDTypography>
            <MDTypography variant="h4" color="success">
              250
            </MDTypography>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <MDTypography variant="h6" fontWeight="medium">
              Inactive Chargers
            </MDTypography>
            <MDTypography variant="h4" color="error">
              50
            </MDTypography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMap;
