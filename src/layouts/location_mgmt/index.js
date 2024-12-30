import axios from "axios";
// @mui material components
import Grid from "@mui/material/Grid";
import PopAddBasic from "./PopAddBasic";
import Slider from 'react-slick';
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "components/custom/Loader";
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDButton from "components/MDButton";
// import { GoogleMap, Marker } from '@react-google-maps/api';
import { Card } from "@mui/material";
import MDTypography from "components/MDTypography";
import { MaterialReactTable } from 'material-react-table';
import theme from "assets/theme";
import { useMaterialUIController } from "context";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import '../SignIn/SignIn.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// images
import mapImage from "assets/images/map.png";
import MapComponent from "./components/MapComponent";

import { useSnackbar } from "notistack";
// Location Management Page components

import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import EditIcon from '@mui/icons-material/Edit';
// ola maps
// import { DeckGL } from "@deck.gl/react";
// import { Map } from "react-map-gl";
// import maplibregl from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Custom Next Arrow Component
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      position: 'absolute',
      top: '45%', // Center vertically
      right: '-15px', // Adjust for desired spacing from the right
      transform: 'translateY(-50%)', // Ensure it's centered vertically
      zIndex: 2,
    }}
  >
    <ArrowForwardIosIcon fontSize="large" />
  </div>
);

// Custom Prev Arrow Component
const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    style={{
      cursor: 'pointer',
      position: 'absolute',
      top: '45%', // Center vertically
      left: '10px', // Adjust for desired spacing from the left
      transform: 'translateY(-50%)', // Ensure it's centered vertically
      zIndex: 2,
    }}
  >
    <ArrowBackIosIcon fontSize="large" />
  </div>
);


function Location_mgmt() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [isLoading, setIsLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const  malls = `${process.env.REACT_APP_AWS_BASEURL}locationIcon/Mall.png`;
  const locationTypes = [
    "Petrol Pumps",
    "Malls",
    "Highways",
    "Resorts",
    "Airports",
    "Hotels",
    "Parking Garages",
    "Office Complexes",
    "Supermarkets",
    "Train Stations",
    "Restaurants",
    "Residential Areas",
    "Parks and Recreational Areas",
    "University Campuses",
    "Convention Centers",
    "Stadiums and Sports Arenas",
    "Movie Theaters",
    "Hospitals",
    "Government Buildings",
    "Libraries",
    "Community Centers",
    "Beach Parking Lots",
    "Tourist Attractions",
    "Car Dealerships",
    "Metro Stations"
  ];
  
  const initialLocations = locationTypes.map((type, index) => ({
    id: index + 1,
    count: 0,
    locationType: type,
    percentage: 0,
  }));
  const [locations, setLocations] = useState([]);
  const [items, setItems] = useState(initialLocations);
  const [showIncomplete, setShowIncomplete] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // slidesToScroll: 1, // Scroll one card at a time
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // const items = [
  //   {
  //     id: 1,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 2,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 3,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 4,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 5,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 6,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 7,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  //   {
  //     id: 8,
  //     color: "Total",
  //     // icon: "300",
  //     title: "Total",
  //     count: 270
  //   },
  // ];
  const handleLocationTypes = () => {
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "charger-locations/location-type-count",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      // headers: {
      //   "Content-Type": "application/json", 
      // },
    })
      .then((response) => {
        if (response.data.success === true) {
          const updatedData = response.data.data.map((item, index) => ({
            ...item,
            id: index + 1, // Add a unique 'id' for each item
          }));
            // setItems(updatedData);
            const mergedItems = items.map((item) => {
              const match = updatedData.find((update) => update.locationType === item.locationType);
              return match
                ? { ...item, count: match.count, percentage: match.percentage }
                : item;
            });
        
            // Update state with merged data
            setItems(mergedItems);


        } else {
          // console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar(error.data.message, { variant: 'error' });
      });
  };
  // const [viewState, setViewState] = useState({
  //   longitude: 0,
  //   latitude: 0,
  //   zoom: 1,
  // });
  // const mapboxApiKey = 'BkQdGUmSHFrZj1ph0zOioSjRYyWt64VSJlRZFrKb';
  const statusList = [
    'Incomplete',
    'Inactive',
    'Active',
    'Pending',
    'Waitlisted'
  ];
  const getValues = () => {
    return {
      locationName: "",
      locationType: "",
      address: "",
      state: "",
      city: "",
      status: "",
      freepaid: {
        "parking": true,
        "charging": true
      },
      direction: {},
      chargerInfo: [{}],
      facilities: [],
      workingDays: "Everyday",
      workingHours: "",
      salesManager: { name: '', phoneNumber: '', email: '' },
      dealer: { name: '', phoneNumber: '', email: '' },
      locationImage: []
    };
  };
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "charger-locations",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        // console.log(response.data.data);

        if (response.data.success === true) {
          // console.log(response.data);
          const element = [];
          const dataWithChargerCount = response.data.data.map(location => {
            const availCount = location.chargerInfo.filter(charger => charger.status === 'Available').length;
            const inuseCount = location.chargerInfo.filter(charger => charger.status === 'Inuse').length;
            const inactiveCount = location.chargerInfo.filter(charger => charger.status === 'Inactive').length;
            const ele = {
              name: location.locationName,
              direction: location.direction,
              availCount: availCount,
              inuseCount: inuseCount,
              inactiveCount: inactiveCount,
              data: location
            };
            element.push(ele);
            const acCount = location.chargerInfo.filter(charger => charger.type === 'AC').length;
            const dcCount = location.chargerInfo.filter(charger => charger.type === 'DC').length;
            const energyDisp = location.chargerInfo.reduce((total, charger) => {
              // console.log(charger);
              const energyValue = parseFloat(charger.energyConsumptions.replace(' kWh', ''));
              return total + energyValue;
            }, 0).toFixed(1) + ' kWh';
            const chargerInfoRep = location.chargerInfo.map(charger => ({
              locationType: charger.powerOutput,
              chargers: charger.subtype,
              locationName: charger.name,
              energy_disp: charger.energyConsumptions,
              status: charger.status === "Available" ? "Active" : charger.status === "Inuse" ? "Pending" : "Inactive",
              c_type: charger.type,
            }));
            return { ...location, energy_disp: energyDisp, chargers: location.chargerInfo.length, c_type: `AC: ${acCount}, DC: ${dcCount}`, chargerInfoRep: chargerInfoRep };
            // ...location,
            // ac: location.chargerInfo
          });
          // console.log(element);
          setLocations(element);
          // console.log(dataWithChargerCount);
          setRows(dataWithChargerCount);
          setIsLoading(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'error' });
          setIsLoading(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
      handleLocationTypes();
  }, []);
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const [values, setValues] = useState(getValues);
  console.log(values);
  // const center = {
  //   lat: 12.927923, // Latitude of the center point
  //   lng: 77.627106, // Longitude of the center point
  // };
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [mapDisabled, setMapDisabled] = useState(true);
  const [columns, setColumns] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [rows, setRows] = useState([]);
  // console.log(rows);

  const handleIncompleteClick = () => {
    const tableElement = document.getElementById('tble');
    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to table
    }
    setShowIncomplete(true); // Show "Incomplete" status when clicked
  };
  console.log(showIncomplete);

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
      filterFn: (row, id, columnFilterValue) => {
        if (!showIncomplete && row.original.status === 'Incomplete') {
          return false; // Hide "Incomplete" status
        }
        if (columnFilterValue === 'Incomplete') {
          return row.original.status !== 'Active';
        }
        return row.original.status === columnFilterValue;
      },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Inactive") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Waitlisted") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "Pending") ?
                <CircleIcon style={{ color: "#F1C21B" }} />
                :
                (row.row.original.status === "Active") ?
                  <CircleIcon style={{ color: "#198038" }} />
                  :
                  <CircleIcon style={{ color: "#198038" }} />
          }
        </div>
      ),
    },
    {
      header: "Name", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "locationName", align: "center"
    },
    {
      header: "L Type", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "locationType", align: "center"
    },
    {
      header: "City", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "city", align: "center"
    },
    {
      header: "State", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "state", align: "center"
    },
    {
      header: "Chargers", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "chargers", align: "center"
    },
    {
      header: "C type", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "c_type", align: "center"
    },
    {
      header: "Energy disp", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "energy_disp", align: "center"
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
            <MDButton
              onClick={(e) => handleView(row.row.original)}
              variant="gradient"
              color="info"
              iconOnly
            >
              <LaunchIcon />
            </MDButton>
            <MDButton
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
            </MDButton>
            <MDButton
              sx={{
                marginLeft: 2,
              }}
              onClick={(e) => handleDelete(row.row.original)}
              variant="gradient"
              color="info"
              // color="secondary"
              iconOnly
            >
              <DeleteIcon />
            </MDButton>
          </div>
        ) : null
      ),
    },
  ];
  useEffect(() => {
    setColumns(column);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
    // console.log('hello');
    // console.log(rows);
    // console.log(column);
  }, []);
  const handleView = (row_data) => {
    navigate("/location/view", { state: row_data });
  };
  // const handleEdit = (row_data) => {
  //   // navigate("/location/view", { state: row_data });
  //   setValues(row_data);
  //   setIsDisabled2(!isDisabled2)
  //   console.log(row_data);
  // };
  const handleEdit = (row_data) => {
    navigate("/location/edit", { state: row_data });
  };
  // console.log(values)
  const handleDelete = (row_data) => {
    const payload = { "status": "Inactive" };
    axios({
      method: "post",
      url: process.env.REACT_APP_BASEURL + "charger-locations/" + row_data._id,
      data: payload, // JSON payload
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      // headers: {
      //   "Content-Type": "application/json", 
      // },
    })
      .then((response) => {
        if (response.data.success === true) {
          // console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
          // alert(response.data.message);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          navigate("/location");
        } else {
          // console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar(error.data.message, { variant: 'error' });
      });
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#FFF1CD',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: '2px 4px 4px rgba(0, 0, 0, 0.15)'
  }));
  const handleStateChange = (newState) => {
    setIsDisabled2(newState);
  };
  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }));
  };

  const SubRow = ({ row }) => {
    // console.log(row); 

    return (
      <Card elevation={3} variant="outlined" sx={{ p: 2 }}>
        <MDTypography variant="subtitle1" fontWeight="bold" mb={1}>
          Charger Info:
        </MDTypography>
        <Grid container spacing={1}>
          {row.original.chargerInfo.map((charger, index) => (
            <Grid item xs={12} key={index}>
              <MDTypography variant="body2">
                ID: {charger.id}, Type: {charger.type}, Energy Consumption: {charger.energyCons}
              </MDTypography>
            </Grid>
          ))}
        </Grid>
      </Card>
    );
  };

  useEffect(() => {
    if (localStorage.getItem("maploaded") === "true") {
      setMapDisabled(false);
    }
  }, [localStorage.getItem("maploaded")]);

  const total = rows.length;
  const countActive = rows.filter(row => row.status === "Active").length;
  return (
    <DashboardLayout>
      <PopAddBasic
        isDialog={isDisabled2}
        onClose={setIsDisabled2}
        value={values}
        onStateChange={handleStateChange}
        onHandleChange={handleChange}
      />
      <DashboardNavbar />
      {/* <MDBox mt={8}> */}
      <Box sx={{ flexGrow: 1 }} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item style={{ fontFamily: "Montserrat", fontSize: "18px", fontWeight: "600", lineHeight: "21.94px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <AccessTimeIcon></AccessTimeIcon>
                <span style={{ paddingLeft: "0.5rem" }}>
                  Incomplete locations
                </span>
              </Box>
              <Box style={{ display: "flex", alignItems: "center" }}>
                <span >{total - countActive}</span>
                <IconButton aria-label="delete" onClick={handleIncompleteClick}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Item>
          </Grid>
          {/* <Grid item xs={2}>
          <Item>xs=4</Item>
        </Grid> */}
        </Grid>
      </Box>
      <MDBox
        py={3}
        mt={4}
      >
        <Grid container
          // spacing={2} 
          spacing={3}
        // style={{ width: "100%" }}
        >
          <Slider {...settings} className="custom-carousel" style={{
            //  marginBottom: "6rem", 
            marginBottom: "2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            //  width: "100%" 
          }}
          >
            {/* <ComplexStatisticsCard
                  color="dark"
                  icon="weekend"
                  title="Total"
                  count={1}
                  percentage={{
                    color: "",
                    amount: "",
                    label: "",
                  }}
                /> */}
            {/* <Grid item xs={12} md={6} lg={3}> */}
            {/* <img src={malls} alt="as" /> */}
            {items.map((item, index) => (
              <MDBox key={item.id} mb={1.5}
              // style={{width: "100%"}}
              >
                <ComplexStatisticsCard
                  color="dark"
                  // icon="weekend"
                  // labelicon={`${process.env.REACT_APP_AWS_BASEURL}locationIcon/Mall.png`}
                  imgicon={`${process.env.REACT_APP_AWS_BASEURL}locationIcon/${item.locationType}.png`}
                  // imgicon={malls}
                  title={item.locationType === 'Stadiums and Sports Arenas' ? 'Sports Arenas' 
                    :
                    item.locationType === 'Parks and Recreational Areas'? 'Parks & Recreational':
                    item.locationType}
                  count={item.count}
                  percentage={{
                    color: "success",
                    amount: `${item.percentage}%`,
                    label: "of total",
                  }}
                />
                {/* </Grid> */}
              </MDBox>
            ))}
          </Slider>
          {/* <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Total"
                count={287}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Malls"
                count="287"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Retail outlets"
                count="287"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Highways"
                count="287"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Apartments"
                count="287"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid> */}
        </Grid>
        <MDBox mt={4} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {/* <img src={mapImage} alt="Map Image" srcset="" /> */}
          {/* <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10} // Adjust the desired zoom level
            center={center}
          >
            <Marker position={{ lat: 51.5074, lng: -0.1278 }} />
          </GoogleMap> */}
          {/* want to use here maps */}
          {/* <Grid container spacing={6}>
            <Grid item xs={12} md={12} lg={12}>
              <DeckGL
                initialViewState={viewState}
                controller={true}
                onViewStateChange={({ viewState }) => setViewState(viewState)}
              >
                <Map
                  mapLib={mapboxgl}
                  mapStyle="mapbox://styles/mapbox/streets-v11"
                  mapboxAccessToken={mapboxApiKey}
                />
              </DeckGL>
            </Grid>
          </Grid> */}

          {/* <MDBox width="96%" minHeight="40vh"
            sx={{
              backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
                mapImage && ` url(${mapImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          /> */}
          <MapComponent locations={locations} />
        </MDBox>
        <MDBox mt={8}>
          <Card>
            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
              <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <MDTypography variant="h6" color="white">
                  All Locations
                </MDTypography>
                <MDButton
                  onClick={() => setIsDisabled2(!isDisabled2)}
                  variant="outlined"
                  color="white"
                  disabled={mapDisabled}
                >
                  Add Locations
                </MDButton>
              </Grid>
            </MDBox>
            {isLoading ? (
              <Loader />
            ) : (<MaterialReactTable
              id="tble"
              columns={columns}
              data={rows}
              enableExpanding={true}
              getSubRows={(originalRow) => originalRow.chargerInfoRep}
              SubComponent={({ row }) => <SubRow row={row} />}
              initialState={{ showColumnFilters: true }}
              muiTableContainerProps={{
                id: 'tble', // Attach the ID here to the container of the table
              }}
              muiTableProps={{
                sx: darkMode ?
                  {
                    backgroundColor: "#202940", color: "#ffffff",
                    '& td': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } :
                  {
                    '& td': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      backgroundColor: '#f5f5f5',
                    },
                  },
              }}
              muiTopToolbarProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& svg': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
                    backgroundColor: '#f5f5f5',
                  }
              }}
              muiTableHeadCellProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& svg': {
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
                    backgroundColor: '#f5f5f5',
                  }
              }}
              muiBottomToolbarProps={{
                sx: darkMode ?
                  {
                    color: "#ffffff",
                    '& p,button,div': {
                      fontFamily: "Montserrat",
                      // fontSize : "14px",
                      fontWeight: "500",
                      lineHeight: "17.07px",
                      color: "#ffffff"
                      // backgroundColor: '#f5f5f5',
                    },
                  } : {
                    backgroundColor: '#f5f5f5',
                  }
              }}
              muiTableBodyCellProps={{
                sx: {
                  borderBottom: '2px solid #e0e0e0', //add a border between columns

                },
              }}
            />)}
          </Card>
        </MDBox>
      </MDBox>
      {/* </MDBox> */}

    </DashboardLayout>
  );
}

export default Location_mgmt;
